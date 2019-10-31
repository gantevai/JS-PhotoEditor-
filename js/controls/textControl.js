import Control from './control.js';

class TextControl extends Control {
  constructor(layer, fontStyle, allLayers, layerContainer) {
    super(layer);
    this.layerContainer = layerContainer;
    this.allLayers = allLayers;
    this.index = this.allLayers.indexOf(layer);
    this.init(fontStyle);
  }

  init(fontStyle) {
    this.fontStyle = fontStyle;
    this.controlBox.id = 'image_control';
    this.selectFontFamily = null;
    this.createSpecificControls();
    this.putOldStyles();
  }

  putOldStyles() {
    if (this.fontStyle.bold == 'bold') {
      this.boldBtn.classList.add('active');
    }
    if (this.fontStyle.italic == 'italic') {
      this.italicBtn.classList.add('active');
    }
    this.textField.value = this.fontStyle.text;
    this.fontFamilyOption = document.getElementById(this.fontStyle.fontFamily);
    this.fontFamilyOption.selected = true;
    this.fontSizeOption = document.getElementById(this.fontStyle.fontSize);
    this.fontSizeOption.selected = true;
    this.colorBox.value = this.fontStyle.color;
  }

  createSpecificControls() {
    this.boldBtn = this.createButton('bold');
    this.boldBtn.onclick = () => {
      if (!this.fontStyle.bold) {
        this.fontStyle.bold = 'bold';
        this.boldBtn.classList.add('active');
      } else {
        this.fontStyle.bold = '';
        this.boldBtn.classList.remove('active');
      }
      this.updateStyle();
      this.setNewText();
    };

    this.italicBtn = this.createButton('italic');
    this.italicBtn.onclick = () => {
      if (!this.fontStyle.italic) {
        this.fontStyle.italic = 'italic';
        this.italicBtn.classList.add('active');
      } else {
        this.fontStyle.italic = '';
        this.italicBtn.classList.remove('active');
      }
      this.updateStyle();
      this.setNewText();
    };

    this.createFontControls();
  }

  createFontControls() {
    this.textField = document.createElement('input');
    this.textField.setAttribute('type', 'text');
    this.textField.setAttribute('title', 'Add Text');
    this.textField.classList.add('text-field');
    this.textField.setAttribute('placeholder', 'Add Text');
    this.controlBox.appendChild(this.textField);

    this.selectFontFamily = document.createElement('select');
    this.selectFontFamily.classList.add('font-family-selector');
    this.selectFontFamily.setAttribute('title', 'Font Family');
    this.controlBox.appendChild(this.selectFontFamily);
    this.createOptions(this.selectFontFamily, 'Arial');
    this.createOptions(this.selectFontFamily, 'Impact');
    this.createOptions(this.selectFontFamily, 'Roboto');
    this.createOptions(this.selectFontFamily, 'Times New Roman');

    this.selectFontSize = document.createElement('select');
    this.selectFontSize.setAttribute('title', 'Font Size');
    this.selectFontSize.classList.add('font-size-selector');
    this.controlBox.appendChild(this.selectFontSize);
    this.createOptions(this.selectFontSize, '10px');
    this.createOptions(this.selectFontSize, '12px');
    this.createOptions(this.selectFontSize, '14px');
    this.createOptions(this.selectFontSize, '16px');
    this.createOptions(this.selectFontSize, '18px');
    this.createOptions(this.selectFontSize, '20px');
    this.createOptions(this.selectFontSize, '22px');
    this.createOptions(this.selectFontSize, '24px');
    this.createOptions(this.selectFontSize, '26px');
    this.createOptions(this.selectFontSize, '28px');
    this.createOptions(this.selectFontSize, '30px');
    this.createOptions(this.selectFontSize, '32px');

    this.colorBox = document.createElement('input');
    this.colorBox.setAttribute('title', 'Font Color');
    this.colorBox.style.height = '18px';
    this.colorBox.setAttribute('type', 'color');
    this.colorBox.classList.add('color-box');
    this.controlBox.appendChild(this.colorBox);

    this.textField.oninput = () => {
      this.fontStyle.text = this.textField.value;
      this.updateStyle();
      this.setNewText();
    };

    this.selectFontFamily.oninput = () => {
      this.fontStyle.fontFamily = this.selectFontFamily.options[
        this.selectFontFamily.selectedIndex
      ].text;
      this.updateStyle();
      this.setNewText();
    };

    this.selectFontSize.oninput = () => {
      this.fontStyle.fontSize = this.selectFontSize.options[this.selectFontSize.selectedIndex].text;
      this.updateStyle();
      this.setNewText();
    };

    this.colorBox.oninput = () => {
      this.fontStyle.color = this.colorBox.value;
      this.updateStyle();
      this.setNewText();
    };
  }

  updateStyle() {
    this.layer.fontStyle = this.fontStyle;
  }

  setNewText() {
    //sets font style and colors
    this.layer.editFont();
    //clears the canvas to add new updated text
    this.layer.clearText();
    // puts the updated text in the canvas
    this.layer.putText();
    this.layerContainer.displayLayers(this.allLayers);
    this.layerContainer.setActive(this.index);
  }

  createOptions(selectContainer, text) {
    var option = document.createElement('option');
    option.innerText = text;
    option.id = text;
    selectContainer.appendChild(option);
    return option;
  }

  getFontStyle() {
    let text = this.selectFontSize.options[this.selectFontSize.selectedIndex].text;
    text = text + ' ' + this.selectFontFamily.options[this.selectFontFamily.selectedIndex].text;
    return text;
  }
}

export default TextControl;
