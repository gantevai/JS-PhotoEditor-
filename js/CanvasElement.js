import CONSTANTS from './Constants.js';

class CanvasElement {
  constructor(container, isCrop) {
    this.container = container;
    this.isCrop = isCrop;
    this.init();
    this.createElement(isCrop);
    this.makeDraggable();
    this.makeResizable();
    this.createImageCopy();
  }

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

  createElement(isCrop) {
    this.createResizableDiv();
    this.createResizers();
    this.createCanvas(isCrop);
  }

  changeZIndex(zIndex) {
    this.element.style.zIndex = zIndex;
  }

  createResizableDiv() {
    this.resizable = document.createElement('div');
    this.resizable.classList.add('resizable');
    this.container.appendChild(this.resizable);
  }

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

  setCanvasSize(width = this.container.offsetWidth, height = this.container.offsetHeight) {
    this.element.style.width = this.resizable.style.width = width + 'px';
    this.element.width = width;
    this.element.height = height;
    this.element.style.height = this.resizable.style.height = height + 'px';
  }

  getCanvasSize() {
    return {
      positionX: this.resizable.offsetLeft - this.container.offsetLeft,
      positionY: this.resizable.offsetTop - this.container.offsetTop,
      width: this.element.width,
      height: this.element.height
    };
  }

  getContext() {
    return this.context;
  }

  getCanvas() {
    return this.element;
  }

  getOldImage() {
    return this.oldImage;
  }

  clearCanvas() {
    this.context.clearRect(0, 0, this.resizable.offsetWidth, this.resizable.offsetHeight);
  }

  showresizable() {
    this.resizers.style.display = 'block';
    this.resizerTopLeft.style.display = 'block';
    this.resizerTopRight.style.display = 'block';
    this.resizerBottomLeft.style.display = 'block';
    this.resizerBottomRight.style.display = 'block';
  }

  hideresizable() {
    this.resizers.style.display = 'none';
    this.resizerTopLeft.style.display = 'none';
    this.resizerTopRight.style.display = 'none';
    this.resizerBottomLeft.style.display = 'none';
    this.resizerBottomRight.style.display = 'none';
  }

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

    function moveBox(e) {
      const mousePointDistFromBoxPositionX = imageState.original_mouse_x - imageState.original_x;
      const mousePointDistFromBoxPositionY = imageState.original_mouse_y - imageState.original_y;
      const newBoxPositionX = e.pageX - mousePointDistFromBoxPositionX;
      const newBoxPositionY = e.pageY - mousePointDistFromBoxPositionY;

      if (this.isCrop) {
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
          console.log(newBoxPositionY);
          this.resizable.style.top = newBoxPositionY - this.container.offsetTop + 'px';
          this.element.style.top = 0;
        }
      } else {
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

      if (
        newBoxPositionY >= this.container.offsetTop &&
        newBoxPositionY + this.element.offsetHeight <=
          this.container.offsetTop + this.container.offsetHeight
      ) {
        this.resizable.style.top = newBoxPositionY + 'px';
        this.element.style.top = 0;
      }
    }

    function stopMoveBox(e) {
      window.removeEventListener('mousemove', moveBoxBind);
    }
  }

  makeResizable() {
    var resizeBind, stopResizeBind;
    const imageState = this.imageState[0];

    for (var i = 0; i < this.resizerArray.length; i++) {
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

      function stopResize(e) {
        window.removeEventListener('mousemove', resizeBind);
        this.resizeImage();
        window.removeEventListener('mouseup', stopResizeBind);
      }
    }
  }

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

  createImageCopy(originalImage) {
    if (originalImage) {
      this.oldImage = originalImage;
      this.setCanvasSize(this.originalData.width, this.originalData.height);
    } else {
      this.oldImage = new Image();
      this.oldImage.src = this.element.toDataURL();
    }
  }

  // changeSourceImageCopied() {
  //   if (this.sourceImageCopied) this.sourceImageCopied = false;
  //   else this.sourceImageCopied = true;
  // }

  destroy() {
    this.resizable.remove();
  }
}

export default CanvasElement;
