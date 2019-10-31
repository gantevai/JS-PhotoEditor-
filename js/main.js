import Editor from './editor.js';
import CanvasElement from './CanvasElement.js';
class Main {
  editor;
  uploadBtn = document.getElementById('uploadBtn');
  fileInputBtn = document.getElementById('fileInputBtn');
  saveBtn = document.getElementById('saveBtn');
  addTextBtn = document.getElementById('addTextBtn');
  newEditorBtn = document.getElementById('newEditor');
  constructor() {
    this.init();
  }

  init() {
    this.editor = new Editor('editing-container');
    this.newEditorBtn.onclick = () => {
      this.editor.clearEditor();
      document.getElementById('editing-container').innerHTML = '';
      this.editor = new Editor('editing-container');
    };
    this.uploadBtn.onclick = () => {
      this.fileInputBtn.click();
    };
    this.fileInputBtn.onchange = e => {
      this.upload(e);
    };
    this.saveBtn.onclick = e => {
      e.preventDefault();
      if (this.editor.isEmpty()) {
        alert('Editor is empty');
      } else {
        this.save();
        this.editor.canvas.clearCanvas();
      }
    };

    this.addTextBtn.onclick = () => {
      this.addText();
    };
  }

  upload(input) {
    var that = this;
    if (input.target.files[0]) {
      var reader = new FileReader();

      reader.onload = function(e) {
        var image = new Image();
        image.onload = function(event) {
          that.editor.addImage(image);
        };
        image.src = e.target.result;
      };
      reader.readAsDataURL(input.target.files[0]);
    }
  }

  addText() {
    this.editor.addText();
  }

  save() {
    this.editor.drawAllLayers();
    var image = this.editor.canvas.element
      .toDataURL('image/png', 1.0)
      .replace('image/png', 'image/octet-stream');
    var link = document.createElement('a');
    link.download = 'my-image.png';
    link.href = image;
    link.click();
  }
}

new Main();
