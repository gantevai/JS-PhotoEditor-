import CanvasElement from '../CanvasElement.js';

/**
 * @summary: Layer class that acts as parent class for ImageLayer and TextLayer class.
 * @class Layer
 */
class Layer {
  element;
  original;
  constructor(container) {
    this.container = container;
    this.canvas = new CanvasElement(container);
    this.element = this.canvas.element;
    this.init();
  }

  /**
   * @summary: Initializes the variables.
   * @memberof Layer
   */
  init() {
    this.rotationAngle = 0;
    this.isTransforming = false;
    this.degreeToRadian = Math.PI / 180;
  }

  /**
   *Change Z-index of the layer by invoking a method from CanvasElement class.
   *
   * @param {number} zIndex - value to be used as z-index
   * @memberof Layer
   */
  changeZindex(zIndex) {
    this.canvas.changeZIndex(zIndex);
  }

  /**
   * @summary:
   * Function that sets onclick listener on element to show resizables and execute the callback function
   * @param {function} clicked - callback funciton received a argument from Editor Class.
   * @memberof Layer
   */
  bindClick(clicked) {
    this.element.onclick = () => {
      this.canvas.showresizable();
      clicked(this);
    };
  }

  /**
   * @summary: Hides the resizables by invoking a method from Canvas Element
   * @memberof Layer
   */
  hideResizeable() {
    this.canvas.hideresizable();
  }

  /**
   * @summary: Function to perform left rotation of the layer.
   * @memberof Layer
   */
  rotateLeft() {
    if (!this.isTransforming) {
      this.rotationAngle = -90;
      this.transformImage(true);
    }
  }

  /**
   * @summary: Function to perform right rotation of the layer.
   * @memberof Layer
   */
  rotateRight() {
    if (!this.isTransforming) {
      this.rotationAngle = 90;
      this.transformImage(true);
    }
  }

  /**
   *
   * @summary: Function to perform horizontal flip action on the layer.
   * @memberof Layer
   */
  flip() {
    if (!this.isTransforming) {
      this.transformImage();
    }
    this.canvas.resizeImage();
  }

  /**
   * @summary: main transformation function used for rotation and flip
   * For rotation: the image is translated to its center, rotation is done and
   * then it is translated back to original place
   * For flip: the image is translated horizontally by its width value, then
   * scaling is done to flip the pixels and new fliped image is drawn to canvas again.
   * @param {boolean} rotate - pass true for rotate and false(or nothing) for flip action
   */
  transformImage(rotate) {
    this.isTransforming = true;
    this.canvas.createImageCopy();
    const IMAGE = this.canvas.getOldImage();
    IMAGE.src = this.canvas.getOldImage().src;

    IMAGE.onload = function(e) {
      if (rotate) {
        var tempWidth = IMAGE.width;
        var tempHeight = IMAGE.height;
        this.canvas.setCanvasSize(tempHeight, tempWidth);
        this.canvas.context.translate(
          this.canvas.getCanvasSize().width / 2,
          this.canvas.getCanvasSize().height / 2
        );

        this.canvas.context.rotate(this.rotationAngle * this.degreeToRadian);
        this.canvas.context.drawImage(IMAGE, -IMAGE.width / 2, -IMAGE.height / 2);
        this.canvas.context.translate(-IMAGE.width / 2, -IMAGE.height / 2);
      } else {
        this.canvas.getContext().translate(this.canvas.getCanvasSize().width, 0);
        this.canvas.getContext().scale(-1, 1);
        this.canvas.getContext().drawImage(IMAGE, 0, 0);
      }

      this.canvas.sourceImageCopied = false;
      this.canvas.createImageCopy();
      this.isTransforming = false;
    }.bind(this);
  }

  /**
   * @summary: Function that removes the layer from the DOM
   * @memberof Layer
   */
  removeLayer() {
    this.element.parentElement.remove();
  }
}

export default Layer;
