import CanvasElement from './CanvasElement.js';
import ImageLayer from './layer/imageLayer.js';
import TextLayer from './layer/textLayer.js';
import ImageControl from './controls/imageControl.js';
import TextControl from './controls/textControl.js';
import LayerContainer from './LayerContainer.js';

/**
 * @summary: Editor Class that handles all the actions inside the editor window.
 * @class Editor
 */
class Editor {
  layers;
  constructor(container) {
    this.init(container);
  }

  /**
   * @summary:
   * Initializes layers array, container, canvasElement and layerContainer.
   * @param {Element ID} container - ID of the editor window(div element).
   * @memberof Editor
   */
  init(container) {
    this.layers = [];
    this.container = document.getElementById(container);
    this.canvas = new CanvasElement(this.container);
    this.layerContainer = new LayerContainer();
  }

  /**
   * @summary:
   *  * Adds image layer on the editing window.
   * Pushes the new image layer in the layers array.
   * Changes the Z-index of the image layer as per the length of the layers array.
   * Sends a call back function as argument in bindClick() function of layer class.
   * @param {img} image - image uploaded by the user on uploadBtn click
   * @memberof Editor
   */
  addImage(image) {
    const IMAGE_LAYER = new ImageLayer(this.container);
    IMAGE_LAYER.fillImage(image);
    IMAGE_LAYER.changeZindex(this.layers.length);
    this.layers.push(IMAGE_LAYER);
    this.layerContainer.displayLayers(this.layers);
    IMAGE_LAYER.bindClick(this.layerClicked.bind(this));
  }

  /**
   * @summary:
   * Adds a text layer on the editing window.
   * Pushes the new text layer in the layers array.
   * Changes the Z-index of the text layer as per the length of the layers array.
   * Sends a call back function as argument in bindClick() function of layer class.
   * @memberof Editor
   */
  addText() {
    const TEXT_LAYER = new TextLayer(this.container);
    TEXT_LAYER.editFont();
    TEXT_LAYER.putText();
    this.layers.push(TEXT_LAYER);
    this.layerContainer.displayLayers(this.layers);
    TEXT_LAYER.bindClick(this.layerClicked.bind(this));
  }

  /**
   * @summary :
   * This function is sent as parameter in the bindClick() function of the layer class
   * and gets called when a layer's canvas is clicked.
   * Used to show Resizables of the clicked layer
   * and hide resizables of the other layers when a certain layer is clicked.
   * @param {*} layerContext : the context of the clicked layer (i.e. image layer or text layer)
   * @memberof Editor
   */
  layerClicked(layerContext) {
    const index = this.layers.indexOf(layerContext);
    layerContext.changeZindex(this.layers.length);
    this.layers.forEach((layer, i) => {
      if (i != index) {
        layer.hideResizeable();
        layer.changeZindex(i);
      }
    });
    if (layerContext instanceof ImageLayer) {
      this.control = new ImageControl(layerContext);
    } else {
      this.control = new TextControl(
        layerContext,
        layerContext.fontStyle,
        this.layers,
        this.layerContainer
      );
    }
    this.layerContainer.setActive(index);
  }

  /**
   * @summary: Draws all the layers in the layers array on the main editor canvas.
   * @memberof Editor
   */
  drawAllLayers() {
    for (let i = 0; i < this.layers.length; i++) {
      let dimensions = this.layers[i].canvas.getCanvasSize();
      let x = dimensions.positionX;
      let y = dimensions.positionY;
      let width = dimensions.width;
      let height = dimensions.height;
      let image = new Image();
      image.src = this.layers[i].element.toDataURL();
      this.canvas.context.drawImage(image, x, y);
    }
  }

  /**
   * @summary:
   * Checks if the layers array is empty or not.
   * Used to check if the editing window is empty
   * @returns boolean value true if layers array is empty and false if not.
   * @memberof Editor
   */
  isEmpty() {
    if (this.layers.length == 0) return true;
    else return false;
  }

  /**
   * @summary:
   * Clears the editor window.
   * Empties the layers array and removes the existing control box.
   * @memberof Editor
   */
  clearEditor() {
    this.layers = [];
    this.layerContainer.displayLayers(this.layers);
    if (this.control) {
      this.control.remove();
    }
  }
}

export default Editor;
