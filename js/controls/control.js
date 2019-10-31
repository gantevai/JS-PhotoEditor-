class Control {
  container;
  controlBox;
  buttonArray = []; // all the buttons within the control box
  constructor(layer) {
    this.layer = layer;
    this.remove();
    this.createElement();
    this.createCommonControls();
  }

  createElement() {
    this.controlBox = document.createElement('div');
    this.controlBox.classList.add('control-box');
    document.getElementsByTagName('body')[0].appendChild(this.controlBox);
  }

  createCommonControls() {
    this.createButton('rotate-left').onclick = () => {
      this.layer.rotateLeft();
    };
    this.createButton('rotate-right').onclick = () => {
      this.layer.rotateRight();
    };
  }

  createButton(name) {
    const button = document.createElement('button');
    button.setAttribute('title', name);
    const icon = new Image();
    icon.src = `images/${name}.png`;
    button.append(icon);
    this.controlBox.appendChild(button);
    return button;
  }

  remove() {
    const oldControlBox = document.getElementsByClassName('control-box')[0];
    if (oldControlBox) {
      oldControlBox.remove();
    }
  }
}
export default Control;
