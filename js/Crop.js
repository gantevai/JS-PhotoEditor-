import CanvasElement from './CanvasElement.js';

class Crop extends CanvasElement {
  constructor(container, isCrop) {
    super(container, isCrop);

    this.element.style.zIndex = this.element.zIndex + 1;
    this.fillColor();
    this.showresizable();
  }

  fillColor() {
    this.context.fillStyle = 'Black';
    this.element.style.opacity = 0.4;
    this.context.fillRect(0, 0, this.resizable.offsetWidth, this.resizable.offsetHeight);
    this.element.classList.add('crop-section');
  }

  getCropDimensions(canvas) {
    var dimension;
    return (dimension = {
      // positionX: this.resizable.offsetLeft,
      // positionY: this.resizable.offsetTop,
      startX: this.resizable.offsetLeft,
      startY: this.resizable.offsetTop,
      width: this.resizable.offsetWidth,
      height: this.resizable.offsetHeight
    });
  }
}

export default Crop;
