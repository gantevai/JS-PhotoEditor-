import Layer from './layer.js';

class TextLayer extends Layer {
  constructor(container) {
    super(container);
    this.init();
  }

  init() {
    this.canvas.setCanvasSize(100, 60);
    this.fontStyle = {
      bold: '',
      italic: '',
      fontFamily: 'Arial',
      fontSize: '10px',
      text: 'Add Text',
      color: '#000000'
    };
  }

  putText() {
    this.canvas.getContext().fillText(this.fontStyle.text, 10, 30);
  }

  clearText() {
    this.canvas.clearCanvas();
  }

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
