import CanvasElement from './CanvasElement.js';
import ImageLayer from './layer/imageLayer.js';
import TextLayer from './layer/textLayer.js';
import ImageControl from './controls/imageControl.js';
import TextControl from './controls/textControl.js';
import LayerContainer from './LayerContainer.js';

class Editor {
  layers;
  constructor(container) {
    this.init(container);
  }

  init(container) {
    this.layers = [];
    this.container = document.getElementById(container);
    this.canvas = new CanvasElement(this.container);
    this.layerContainer = new LayerContainer();
  }

  addImage(image) {
    const IMAGE_LAYER = new ImageLayer(this.container);
    IMAGE_LAYER.fillImage(image);
    IMAGE_LAYER.changeZindex(this.layers.length);
    this.layers.push(IMAGE_LAYER);
    this.layerContainer.displayLayers(this.layers);
    IMAGE_LAYER.bindClick(this.layerClicked.bind(this));
  }

  addText() {
    const TEXT_LAYER = new TextLayer(this.container);
    TEXT_LAYER.editFont();
    TEXT_LAYER.putText();
    this.layers.push(TEXT_LAYER);
    this.layerContainer.displayLayers(this.layers);
    TEXT_LAYER.bindClick(this.layerClicked.bind(this));
  }

  /**
   * @summary : this function gets called when a layer's canvas is clicked.
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

  isEmpty() {
    if (this.layers.length == 0) return true;
    else return false;
  }

  clearEditor() {
    this.layers = [];
    this.layerContainer.displayLayers(this.layers);
    this.control.remove();
  }
}

export default Editor;
