import CONSTANTS from './Constants.js';

/**
 * @summary:
 * Class that is used to create canvas element in the DOM
 * And also handle its functions.
 * @class CanvasElement
 */
class CanvasElement {
  constructor(container, isCrop) {
    this.container = container;
    this.isCrop = isCrop;
    this.init();
    this.createElement(isCrop);
    this.makeDraggable();
    this.makeResizable();
    this.createImageCopy();

    this.element.addEventListener('click', e => {
      if (e.ctrlKey) {
        this.saveSingleImage();
      }
    });
  }

  /**
   * @summary: Initializes the variables.
   * @memberof CanvasElement
   */
  init() {
    this.imageState = [
      {
        original_width: 0,
        original_height: 0,
        original_x: 0,
        original_y: 0,
        original_mouse_x: 0,
        original_mouse_y: 0
      }
    ];
    this.oldImage = null;
    this.sourceImageCopied = false;
    this.resizerArray = [];
    this.element = null; // variable for canvas element
    this.context = null; // variable for canvas context
  }

  /**
   * @summary: Creates the canvas element in the DOM along with resizers.
   * @param {boolean} isCrop - true if canvas element is used for crop.
   * @memberof CanvasElement
   */
  createElement(isCrop) {
    this.createResizableDiv();
    this.createResizers();
    this.createCanvas(isCrop);
  }

  /**
   * @summary: Change z-index of the canvas element.
   * @param {number} zIndex - value to be put as z index.
   * @memberof CanvasElement
   */
  changeZIndex(zIndex) {
    this.element.style.zIndex = zIndex;
  }

  /**
   * @summary: Create the resizable div in the DOM which helps in canvas resizing.
   * @memberof CanvasElement
   */
  createResizableDiv() {
    this.resizable = document.createElement('div');
    this.resizable.classList.add('resizable');
    this.container.appendChild(this.resizable);
  }

  /**
   * @summary: Create the resizers in the DOM which helps in canvas resizing.
   * @memberof CanvasElement
   */
  createResizers() {
    this.resizers = document.createElement('div');
    this.resizers.classList.add('resizers');
    this.resizable.appendChild(this.resizers);
    this.resizerTopLeft = document.createElement('div');
    this.resizerTopLeft.classList.add('resizer');
    this.resizerTopLeft.classList.add('top-left-resizer');
    this.resizerTopRight = document.createElement('div');
    this.resizerTopRight.classList.add('resizer');
    this.resizerTopRight.classList.add('top-right-resizer');
    this.resizerBottomLeft = document.createElement('div');
    this.resizerBottomLeft.classList.add('resizer');
    this.resizerBottomLeft.classList.add('bottom-left-resizer');
    this.resizerBottomRight = document.createElement('div');
    this.resizerBottomRight.classList.add('resizer');
    this.resizerBottomRight.classList.add('bottom-right-resizer');
    this.resizers.appendChild(this.resizerTopLeft);
    this.resizers.appendChild(this.resizerTopRight);
    this.resizers.appendChild(this.resizerBottomLeft);
    this.resizers.appendChild(this.resizerBottomRight);

    this.resizerArray.push(this.resizerTopLeft);
    this.resizerArray.push(this.resizerTopRight);
    this.resizerArray.push(this.resizerBottomLeft);
    this.resizerArray.push(this.resizerBottomRight);
  }

  /**
   * @summary: Create the canvas in the DOM and style it.
   * @param {*} isCrop
   * @memberof CanvasElement
   */
  createCanvas(isCrop) {
    this.element = document.createElement('canvas');
    this.element.style.position = 'absolute';
    if (!isCrop) {
      this.setCanvasSize();
    } else {
      this.setCanvasSize(this.container.offsetWidth / 3, this.container.offsetHeight / 3);
    }
    this.resizable.appendChild(this.element);
    this.context = this.element.getContext('2d');
  }

  /**
   * @summary: Set the size of the canvas element.
   * @param {number} [width=this.container.offsetWidth] - uses containers width as default width.
   * @param {number} [height=this.container.offsetHeight] - uses containers height as default height.
   * @memberof CanvasElement
   */
  setCanvasSize(width = this.container.offsetWidth, height = this.container.offsetHeight) {
    this.element.style.width = this.resizable.style.width = width + 'px';
    this.element.width = width;
    this.element.height = height;
    this.element.style.height = this.resizable.style.height = height + 'px';
  }

  /**
   * @summary : Used as getter function to get canvas size and position.
   * @returns (object)- { positionX, positionY, width, height}
   * @memberof CanvasElement
   */
  getCanvasSize() {
    return {
      positionX: this.resizable.offsetLeft - this.container.offsetLeft,
      positionY: this.resizable.offsetTop - this.container.offsetTop,
      width: this.element.width,
      height: this.element.height
    };
  }

  /**
   * @summary: Used to obtain context of the canvas.
   * @returns (context)- context of canvas.
   * @memberof CanvasElement
   */
  getContext() {
    return this.context;
  }

  /**
   * @summary: Used to obtain canvas element reference.
   * @returns (reference)- canvas element.
   * @memberof CanvasElement
   */
  getCanvas() {
    return this.element;
  }

  /**
   * @summary: Used to obtain old image reference.
   * @returns (reference)- old image of canvas.
   * @memberof CanvasElement
   */
  getOldImage() {
    return this.oldImage;
  }

  /**
   * @summary: Clears the canvas.
   * @memberof CanvasElement
   */
  clearCanvas() {
    this.context.clearRect(0, 0, this.resizable.offsetWidth, this.resizable.offsetHeight);
  }

  /**
   * @summary: Displays the resizers of a canvas.
   * @memberof CanvasElement
   */
  showresizable() {
    this.resizers.style.display = 'block';
    this.resizerTopLeft.style.display = 'block';
    this.resizerTopRight.style.display = 'block';
    this.resizerBottomLeft.style.display = 'block';
    this.resizerBottomRight.style.display = 'block';
  }

  /**
   * @summary:Hides the resizers of a canvas.
   * @memberof CanvasElement
   */
  hideresizable() {
    this.resizers.style.display = 'none';
    this.resizerTopLeft.style.display = 'none';
    this.resizerTopRight.style.display = 'none';
    this.resizerBottomLeft.style.display = 'none';
    this.resizerBottomRight.style.display = 'none';
  }

  /**
   * @summary:
   * Adjusts the size of canvas according to the image aspect ratio and the height of editing container.
   * @param {img} image - image uploaded by user.
   * @memberof CanvasElement
   */
  handleCanvasSize(image) {
    var imgWidth = image.width;
    var imgHeight = image.height;
    var imgAspectRatio = imgWidth / imgHeight;
    this.element.height = this.element.offsetHeight;
    this.element.width = this.element.offsetHeight * imgAspectRatio;
    this.originalData = {
      height: this.element.height,
      width: this.element.width
    };
    this.setCanvasSize(this.element.width, this.element.height);
    this.context.drawImage(image, 0, 0, this.element.width, this.element.height);
  }

  /**
   * @summary: Make the canvas draggable around the editor window.
   * @memberof CanvasElement
   */
  makeDraggable() {
    var moveBoxBind;
    const imageState = this.imageState[0];

    this.element.addEventListener('mousedown', e => {
      e.preventDefault();
      imageState.original_x = this.element.getBoundingClientRect().left;
      imageState.original_y = this.element.getBoundingClientRect().top;
      imageState.original_mouse_x = e.pageX;
      imageState.original_mouse_y = e.pageY;

      moveBoxBind = moveBox.bind(this);

      window.addEventListener('mousemove', moveBoxBind);
      window.addEventListener('mouseup', stopMoveBox.bind(this));
    });

    /**
     * @summary:
     * Function that runs when mouse down event occurs on canvas.
     * Takes the initial position of canvas and the initial mouse click position.
     * And updates the position of canvas when the mouse position is moved.
     * @param {event} e
     */
    function moveBox(e) {
      if (this.isCrop) {
        const mousePointDistFromBoxPositionX = imageState.original_mouse_x - imageState.original_x;
        const mousePointDistFromBoxPositionY = imageState.original_mouse_y - imageState.original_y;
        const newBoxPositionX = e.pageX - mousePointDistFromBoxPositionX;
        const newBoxPositionY = e.pageY;
        if (
          newBoxPositionX >= this.container.offsetLeft &&
          newBoxPositionX + this.element.offsetWidth <=
            this.container.offsetLeft + this.container.offsetWidth
        ) {
          this.resizable.style.left = newBoxPositionX - this.container.offsetLeft + 'px';
          this.element.style.left = 0;
        }

        if (
          newBoxPositionY >= this.container.offsetTop &&
          newBoxPositionY + this.element.offsetHeight <=
            this.container.offsetTop + this.container.offsetHeight
        ) {
          this.resizable.style.top = newBoxPositionY - this.container.offsetTop + 'px';
          this.element.style.top = 0;
        }
      } else {
        const mousePointDistFromBoxPositionX = imageState.original_mouse_x - imageState.original_x;
        const mousePointDistFromBoxPositionY = imageState.original_mouse_y - imageState.original_y;
        const newBoxPositionX = e.pageX - mousePointDistFromBoxPositionX;
        const newBoxPositionY = e.pageY - mousePointDistFromBoxPositionY;
        if (
          newBoxPositionX >= this.container.offsetLeft &&
          newBoxPositionX + this.element.offsetWidth <=
            this.container.offsetLeft + this.container.offsetWidth
        ) {
          this.resizable.style.left = newBoxPositionX + 'px';
          this.element.style.left = 0;
        }
        if (
          newBoxPositionY >= this.container.offsetTop &&
          newBoxPositionY + this.element.offsetHeight <=
            this.container.offsetTop + this.container.offsetHeight
        ) {
          this.resizable.style.top = newBoxPositionY + 'px';
          this.element.style.top = 0;
        }
      }
    }

    /**
     * @summary: Function that runs when mouse up event is triggered.
     * Removes the mousemove eventlistener.
     * @param {event} e
     */
    function stopMoveBox(e) {
      window.removeEventListener('mousemove', moveBoxBind);
    }
  }

  /**
   * @summary: makes the canvas resizable.
   * @memberof CanvasElement
   */
  makeResizable() {
    let resizeBind, stopResizeBind;
    const imageState = this.imageState[0];

    for (let i = 0; i < this.resizerArray.length; i++) {
      const currentResizer = this.resizerArray[i];
      currentResizer.addEventListener('mousedown', e => {
        if (!this.sourceImageCopied) {
          this.sourceImageCopied = true;
          this.createImageCopy();
        }
        e.preventDefault();
        imageState.original_width = parseFloat(
          getComputedStyle(this.element, null)
            .getPropertyValue('width')
            .replace('px', '')
        );
        imageState.original_height = parseFloat(
          getComputedStyle(this.element, null)
            .getPropertyValue('height')
            .replace('px', '')
        );
        imageState.original_x = this.element.getBoundingClientRect().left;
        imageState.original_y = this.element.getBoundingClientRect().top;
        imageState.original_mouse_x = e.pageX;
        imageState.original_mouse_y = e.pageY;

        resizeBind = resize.bind(this);
        stopResizeBind = stopResize.bind(this);

        window.addEventListener('mousemove', resizeBind);
        window.addEventListener('mouseup', stopResizeBind);
      });

      /**
       * @summary: Resizes the canvas when the resizer is dragged.
       * @param {event} e
       */
      function resize(e) {
        if (currentResizer.classList.contains('bottom-right-resizer')) {
          const width = imageState.original_width + (e.pageX - imageState.original_mouse_x);
          const height = imageState.original_height + (e.pageY - imageState.original_mouse_y);

          if (
            width > CONSTANTS.RESIZE_CONSTRAINTS.MIN_SIZE &&
            e.pageX < this.container.offsetLeft + this.container.offsetWidth
          ) {
            this.resizable.style.width = this.element.style.width = width + 'px';
          }

          if (
            height > CONSTANTS.RESIZE_CONSTRAINTS.MIN_SIZE &&
            e.pageY < this.container.offsetTop + this.container.offsetHeight
          ) {
            this.resizable.style.height = this.element.style.height = height + 'px';
          }
        } else if (currentResizer.classList.contains('bottom-left-resizer')) {
          const width = imageState.original_width - (e.pageX - imageState.original_mouse_x);
          const height = imageState.original_height + (e.pageY - imageState.original_mouse_y);

          if (
            width > CONSTANTS.RESIZE_CONSTRAINTS.MIN_SIZE &&
            e.pageX > this.container.offsetLeft
          ) {
            this.resizable.style.width = this.element.style.width = width + 'px';
            this.resizable.style.left =
              imageState.original_x + (e.pageX - imageState.original_mouse_x) + 'px';
            this.element.style.left = 0 + 'px';
          }

          if (
            height > CONSTANTS.RESIZE_CONSTRAINTS.MIN_SIZE &&
            e.pageY < this.container.offsetTop + this.container.offsetHeight
          ) {
            this.resizable.style.height = this.element.style.height = height + 'px';
          }
        } else if (currentResizer.classList.contains('top-right-resizer')) {
          const width = imageState.original_width + (e.pageX - imageState.original_mouse_x);
          const height = imageState.original_height - (e.pageY - imageState.original_mouse_y);
          if (
            width > CONSTANTS.RESIZE_CONSTRAINTS.MIN_SIZE &&
            e.pageX < this.container.offsetLeft + this.container.offsetWidth
          ) {
            this.resizable.style.width = this.element.style.width = width + 'px';
          }
          if (
            height > CONSTANTS.RESIZE_CONSTRAINTS.MIN_SIZE &&
            e.pageY > this.container.offsetTop
          ) {
            this.resizable.style.height = this.element.style.height = height + 'px';
            this.resizable.style.top =
              imageState.original_y + (e.pageY - imageState.original_mouse_y) + 'px';
            this.element.style.top = 0;
          }
        } else {
          const width = imageState.original_width - (e.pageX - imageState.original_mouse_x);
          const height = imageState.original_height - (e.pageY - imageState.original_mouse_y);
          if (
            width > CONSTANTS.RESIZE_CONSTRAINTS.MIN_SIZE &&
            e.pageX > this.container.offsetLeft
          ) {
            this.resizable.style.width = this.element.style.width = width + 'px';
            this.resizable.style.left =
              imageState.original_x + (e.pageX - imageState.original_mouse_x) + 'px';
            this.element.style.left = 0;
          }
          if (
            height > CONSTANTS.RESIZE_CONSTRAINTS.MIN_SIZE &&
            e.pageY > this.container.offsetTop
          ) {
            this.resizable.style.height = this.element.style.height = height + 'px';
            this.resizable.style.top =
              imageState.original_y + (e.pageY - imageState.original_mouse_y) + 'px';
            this.element.style.top = 0;
          }
        }
      }

      /**
       * @summary: Stops resizing on mouse up and removes the mousemove event listener.
       * @param {event} e
       */
      function stopResize(e) {
        window.removeEventListener('mousemove', resizeBind);
        this.resizeImage();
        window.removeEventListener('mouseup', stopResizeBind);
      }
    }
  }

  /**
   * @summary: Adjusts the old image into the newly resized canvas.
   * @memberof CanvasElement
   */
  resizeImage() {
    this.setCanvasSize(this.resizable.offsetWidth, this.resizable.offsetHeight);
    this.context.drawImage(
      this.oldImage,
      0,
      0,
      this.oldImage.width,
      this.oldImage.height,
      0,
      0,
      this.element.width,
      this.element.height
    );
  }

  /**
   * @summary:
   * Creates a copy of the original image as old image if original image is provided.
   * Creates copy of the image in the canvas as old image if original image is not provided.
   * @param {image} originalImage - original image uploaded by user.
   * @memberof CanvasElement
   */
  createImageCopy(originalImage) {
    if (originalImage) {
      this.oldImage = originalImage;
      this.setCanvasSize(this.originalData.width, this.originalData.height);
    } else {
      this.oldImage = new Image();
      this.oldImage.src = this.element.toDataURL();
    }
  }

  /**
   * @summary: Destroys the canvas from DOM.
   * @memberof CanvasElement
   */
  destroy() {
    this.resizable.remove();
  }

  /**
   * @summary: Save a single canvas layer as .png on ctrl + mouseclick
   * @memberof CanvasElement
   */
  saveSingleImage() {
    let image = this.element.toDataURL();
    let a = document.createElement('a');
    a.href = image;
    a.download = 'image.png';
    a.click();
  }
}

export default CanvasElement;
