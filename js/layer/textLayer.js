import Layer from './layer.js';
import CONSTANTS from '../Constants.js';

/**
 * @summary: Class that handles the text layers.
 * @class TextLayer
 * @extends {Layer}
 */
class TextLayer extends Layer {
  constructor(container) {
    super(container);
    this.init();
  }

  /**
   * @summary: Initialize the variables.
   *
   * @memberof TextLayer
   */
  init() {
    this.canvas.setCanvasSize(CONSTANTS.TEXT_LAYER.WIDTH, CONSTANTS.TEXT_LAYER.HEIGHT);
    this.fontStyle = {
      bold: '',
      italic: '',
      fontFamily: 'Arial',
      fontSize: '10px',
      text: 'Add Text',
      color: '#000000'
    };
  }

  /**
   * @summary: puts text on the canvas
   * @memberof TextLayer
   */
  putText() {
    let x = CONSTANTS.TEXT_LAYER.X;
    let y = CONSTANTS.TEXT_LAYER.Y;
    this.canvas.getContext().fillText(this.fontStyle.text, x, y);
  }

  /**
   * @summary: Clear the text on canvas by invoking a method from CanvasElement
   * @memberof TextLayer
   */
  clearText() {
    this.canvas.clearCanvas();
  }

  /**
   * @summary: Change the fontstyle of the canvas context
   * @memberof TextLayer
   */
  editFont() {
    let text =
      this.fontStyle.bold +
      ' ' +
      this.fontStyle.italic +
      ' ' +
      this.fontStyle.fontSize +
      ' ' +
      this.fontStyle.fontFamily;
    this.canvas.getContext().font = text;
    this.canvas.getContext().fillStyle = this.fontStyle.color;
  }
}

export default TextLayer;
