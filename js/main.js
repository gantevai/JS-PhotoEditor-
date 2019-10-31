import Editor from './editor.js';

/**
 * @summary: Main js file that starts the main App.
 * @class Main
 */
class Main {
  constructor() {
    this.init();
    this.setOnclicks();
  }

  /**
   * @summary: Initialize the buttons in main screen
   * @memberof Main
   */
  init() {
    this.editor = new Editor('editing-container');
    this.uploadBtn = document.getElementById('uploadBtn');
    this.fileInputBtn = document.getElementById('fileInputBtn');
    this.saveBtn = document.getElementById('saveBtn');
    this.addTextBtn = document.getElementById('addTextBtn');
    this.newEditorBtn = document.getElementById('newEditor');
  }

  /**
   * @summary: Set the onclick event listener for the buttons.
   * @memberof Main
   */
  setOnclicks() {
    this.newEditorBtn.onclick = () => {
      this.editor.clearEditor();
      document.getElementById('editing-container').innerHTML = '';
      this.editor = new Editor('editing-container');
      location.reload();
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

  /**
   * @summary:
   * Handles the image uploaded by the user.
   * Invokes the addImage(image) function of the editor class.
   * @param {image} input - image chosen by user after uploadBtn click
   * @memberof Main
   */
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

  /**
   * @summary: Invokes the addText() function of the editor class.
   * @memberof Main
   */
  addText() {
    this.editor.addText();
  }

  /**
   *@summary:
   * Saves the images of all layers on the editor window as a single png.
   * Invokes drawAllLayers() function of editor class.
   * @memberof Main
   */
  save() {
    this.editor.drawAllLayers();
    let image = this.editor.canvas.element
      .toDataURL('image/png', 1.0)
      .replace('image/png', 'image/octet-stream');
    let link = document.createElement('a');
    link.download = 'my-image.png';
    link.href = image;
    link.click();
  }
}

new Main();
