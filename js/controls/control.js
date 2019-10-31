/**
 * @summary: Class that acts as parent class for ImageControl and TextControl class.
 * Handles the control buttons for image and text.
 * @class Control
 */
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

  /**
   * @summary:
   * Creates the control box div element in the DOM
   * @memberof Control
   */
  createElement() {
    this.controlBox = document.createElement('div');
    this.controlBox.classList.add('control-box');
    document.getElementsByTagName('body')[0].appendChild(this.controlBox);
  }

  /**
   * @summary:
   * Creates common controls like rotate-left and rotate-right buttons
   * Appends the buttons to the control box div and sets onclick listeners for buttons.
   * @memberof Control
   */
  createCommonControls() {
    this.createButton('rotate-left').onclick = () => {
      this.layer.rotateLeft();
    };
    this.createButton('rotate-right').onclick = () => {
      this.layer.rotateRight();
    };
  }

  /**
   * @summary: Create button element,style it and append it to the control box.
   * @param {String} name - name of the button
   * @returns (Reference)- reference of the created button
   * @memberof Control
   */
  createButton(name) {
    const BUTTON = document.createElement('button');
    BUTTON.setAttribute('title', name);
    const ICON = new Image();
    ICON.src = `images/${name}.png`;
    BUTTON.append(ICON);
    this.controlBox.appendChild(BUTTON);
    return BUTTON;
  }

  /**
   * @summary: Removes the control box from DOM.
   * @memberof Control
   */
  remove() {
    const oldControlBox = document.getElementsByClassName('control-box')[0];
    if (oldControlBox) {
      oldControlBox.remove();
    }
  }
}
export default Control;
