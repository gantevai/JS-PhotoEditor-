import CanvasElement from './CanvasElement.js';

/**
 * class that handles the crop action.
 * @class Crop
 * @extends {CanvasElement}
 */
class Crop extends CanvasElement {
  constructor(container, isCrop) {
    super(container, isCrop);

    this.fillColor();
    this.showresizable();
  }

  /**
   * @summary: Fills black color and sets low opacity of the crop section.
   * @memberof Crop
   */
  fillColor() {
    this.context.fillStyle = 'Black';
    this.element.style.opacity = 0.4;
    this.context.fillRect(0, 0, this.resizable.offsetWidth, this.resizable.offsetHeight);
    this.element.classList.add('crop-section');
  }

  /**
   * @summary: Used to get the required information about the dimension of crop section.
   * @returns (object) dimension - {startX,startY,width,height}
   * startX,startY gives the starting co-ordinate of the canvas.
   * width and height gives the width and height of the canvas.
   * @memberof Crop
   */
  getCropDimensions() {
    var dimension;
    return (dimension = {
      startX: this.resizable.offsetLeft,
      startY: this.resizable.offsetTop,
      width: this.resizable.offsetWidth,
      height: this.resizable.offsetHeight
    });
  }
}

export default Crop;
