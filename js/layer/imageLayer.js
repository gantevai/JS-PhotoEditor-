import Layer from './layer.js';
import Crop from '../Crop.js';

/**
 * @summary: Class that handles the image layers.
 * @class ImageLayer
 * @extends {Layer}
 */
class ImageLayer extends Layer {
  constructor(container) {
    super(container);
    this.cropSection;
  }

  /**
   * @summary: Fills the canvas with image by invoking a method from CanvasElement class.
   * Keeps a copy of original image for future use.
   * @param {image} image- image uploaded by the user.
   * @memberof ImageLayer
   */
  fillImage(image) {
    this.canvas.handleCanvasSize(image);
    this.original = image;
  }

  /**
   * @summary:
   * Function used to keep copy of image in the layer by invoking a method from CanvasElement class.
   * @memberof ImageLayer
   */
  copyLayerImage() {
    this.canvas.createImageCopy();
  }

  /**
   * @summary: Resets the changes done to image, and displays the original image in the canvas.
   * @memberof ImageLayer
   */
  resetChanges() {
    this.canvas.createImageCopy(this.original);
    this.canvas.handleCanvasSize(this.original);
    this.canvas.createImageCopy();
  }

  /**
   * @summary: Destroy the existing crop area and creates a new crop area on the canvas.
   * Sets onDoubleClick listener on the crop area.
   * @memberof ImageLayer
   */
  crop() {
    if (this.cropSection) {
      this.cropSection.destroy();
    }
    this.cropSection = new Crop(this.canvas.resizable, true);
    this.cropSection.resizable.ondblclick = () => {
      this.cropImage();
    };
  }

  /**
   * @summary: Handles the crop action
   * gets the crop area dimensions and applies crop action on the canvas on that area.
   * @memberof ImageLayer
   */
  cropImage() {
    const CROP_DIMENSION = this.cropSection.getCropDimensions();
    this.cropSection.destroy();
    this.cropSection = null;

    const IMAGE = new Image();
    IMAGE.onload = () => {
      this.canvas.setCanvasSize(CROP_DIMENSION.width, CROP_DIMENSION.height);
      this.canvas
        .getContext()
        .drawImage(
          IMAGE,
          CROP_DIMENSION.startX,
          CROP_DIMENSION.startY,
          CROP_DIMENSION.width,
          CROP_DIMENSION.height,
          0,
          0,
          CROP_DIMENSION.width,
          CROP_DIMENSION.height
        );
      this.canvas.createImageCopy();
    };
    IMAGE.src = this.canvas.getCanvas().toDataURL();
  }

  /**
   * @summary: Puts the given image data on the canvas by clearing the existing data.
   * @param {Uint8array} imageData - array of all the pixels of an image.
   * @memberof ImageLayer
   */
  putImage(imageData) {
    this.canvas.context.clearRect(
      0,
      0,
      this.canvas.getCanvasSize().width,
      this.canvas.getCanvasSize().height
    );

    this.canvas.context.putImageData(imageData, 0, 0);
  }

  /**
   * @summary: Get the image data on the canvas in the form of Unit8array.
   * @returns {Uint8array}
   * @memberof ImageLayer
   */
  getImageData() {
    const imgWidth = this.canvas.getCanvasSize().width;
    const imgHeight = this.canvas.getCanvasSize().height;
    return this.canvas.context.getImageData(0, 0, imgWidth, imgHeight);
  }
}
export default ImageLayer;
