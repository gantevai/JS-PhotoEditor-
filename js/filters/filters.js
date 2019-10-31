import CONSTANTS from '../Constants.js';

/**
 * @summary: Class that handles all the filter actions.
 * @class Filter
 */
class Filter {
  changes;
  constructor(imageData) {
    this.imageData = imageData;
    this.changes = {};
  }

  /**
   * @summary: Makes copy of the provided imageData by using different references.
   * @param {Uint8Array} imageData - array of pixels of image.
   * @returns {Uint8Array} - array of pixels of image
   * @memberof Filter
   */
  makeCopy(imageData) {
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    ctx.putImageData(imageData, 0, 0);
    return ctx.getImageData(0, 0, canvas.width, canvas.height);
  }

  /**
   * @summary: Get the filtered image
   * @param {String} filterType - name of the filter
   * @param {boolean} original - true if original image is requested
   * @returns {image} filtered image
   * @memberof Filter
   */
  getImage(filterType, original) {
    const imageData = this.getFilteredImageData(filterType, original);
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    ctx.putImageData(imageData, 0, 0);

    let image = new Image();
    image.src = canvas.toDataURL();
    return image;
  }

  /**
   * @summary: Applies filter to the editedImage using given filter type.
   * @param {String} filterType - name of the filter
   * @param {boolean} original - true if original image is requested
   * @returns (Uint8Array) - filtered imageData
   * @memberof Filter
   */
  getFilteredImageData(filterType, original) {
    let editedImage;
    if (original) {
      editedImage = this.makeCopy(this.imageData);
    } else {
      editedImage = this.getChangedImage('filter');
      this.recordChanges('filter', filterType);
    }
    if (filterType == CONSTANTS.FILTER_TYPE.ORIGINAL) return editedImage;
    return this.applyFilter(editedImage, filterType);
  }

  /**
   * @summary: Applies filter to the image data by using filterType provided.
   * @param {Uint8Array} image - imageData to be filtered
   * @param {String} filterType - name of the filter to be applied
   * @returns {Uint8Array} - filteredImageData
   * @memberof Filter
   */
  applyFilter(image, filterType) {
    let data = image.data;

    switch (filterType) {
      case CONSTANTS.FILTER_TYPE.SEPIA:
        // Pixel Manipulation for Sepia filter effect.
        for (var i = 0; i < data.length; i += 4) {
          var inputRed = data[i];
          var inputGreen = data[i + 1];
          var inputBlue = data[i + 2];
          data[i] = Math.min(255, 0.393 * inputRed + 0.769 * inputGreen + 0.189 * inputBlue);
          data[i + 1] = Math.min(255, 0.349 * inputRed + 0.686 * inputGreen + 0.168 * inputBlue);
          data[i + 2] = Math.min(255, 0.272 * inputRed + 0.534 * inputGreen + 0.131 * inputBlue);
        }

        break;
      case CONSTANTS.FILTER_TYPE.GRAYSCALE:
        // Pixel Manipulation for Grayscale filter effect.
        for (var i = 0; i < data.length; i += 4) {
          var inputRed = data[i];
          var inputGreen = data[i + 1];
          var inputBlue = data[i + 2];
          data[i] = Math.min(255, 0.2126 * inputRed + 0.7152 * inputGreen + 0.0722 * inputBlue);
          data[i + 1] = Math.min(255, 0.2126 * inputRed + 0.7152 * inputGreen + 0.0722 * inputBlue);
          data[i + 2] = Math.min(255, 0.2126 * inputRed + 0.7152 * inputGreen + 0.0722 * inputBlue);
        }
        break;

      case CONSTANTS.FILTER_TYPE.MOON:
        image = this.getMoonFilter(image);
        break;
      case CONSTANTS.FILTER_TYPE.CLAREDON:
        image = this.getClaredonFilter(image);
        break;
      case CONSTANTS.FILTER_TYPE.LARK:
        image = this.getLarkFilter(image);
        break;

      default:
        break;
    }
    return image;
  }

  /**
   * @summary: get image data after pixel manipulation using the manipulator sliders.
   * @param {number} sliderValue - value of the manipulator slider
   * @param {String} sliderName - name of the manipulator slider
   * @returns (Uint8Array)-manipulated image data
   * @memberof Filter
   */
  getManipulatedImageData(sliderValue, sliderName) {
    const editedImage = this.getChangedImage(sliderValue);
    this.recordChanges(sliderName, sliderValue);
    return this.manipulate(editedImage, sliderValue, sliderName);
  }

  /**
   * @summary:
   * Applies pixel manipulation on given image data as per the manipulator name, slider value.
   * @param {Uint8Array} image - Image data to be manipulated
   * @param {number} sliderValue - value of the slider input.
   * @param {String} sliderName - name of the manipulator slider
   * @returns (Uint8Array)-manipulated image data
   * @memberof Filter
   */
  manipulate(image, sliderValue, sliderName) {
    switch (sliderName) {
      case CONSTANTS.BRIGHTNESS.SLIDER_NAME:
        image = this.getBrightness(sliderValue, image);
        break;
      case CONSTANTS.CONTRAST.SLIDER_NAME:
        image = this.getContrast(sliderValue, image);
        break;
      case CONSTANTS.SATURATION.SLIDER_NAME:
        image = this.getSaturation(sliderValue, image);
        break;
      case CONSTANTS.GAMMA.SLIDER_NAME:
        image = this.getGamma(sliderValue, image);
        break;
      case CONSTANTS.TEMPERATURE.SLIDER_NAME:
        image = this.getTemperature(sliderValue, image);
        break;
      case CONSTANTS.VIBRANCE.SLIDER_NAME:
        image = this.getVibrance(sliderValue, image);
        break;
      default:
        break;
    }

    return image;
  }

  /**
   * @summary: Record the changes applied on the image
   * @param {String} name - change applied (slider name)
   * @param {number} value - value of the change applied (slider value)
   * @memberof Filter
   */
  recordChanges(name, value) {
    this.changes[name] = value;
  }

  /**
   * @summary: Get the changed image with all applied changes.
   * @param {String} ignoreEffect - Effect to be ignored.
   * @returns (Uint8Array) - imageData with all applied changes
   * @memberof Filter
   */
  getChangedImage(ignoreEffect) {
    let copy = this.makeCopy(this.imageData);
    if (this.changes === {}) {
      return copy;
    }
    for (var key in this.changes) {
      if (Object.prototype.hasOwnProperty.call(this.changes, key)) {
        if (key === 'filter' && ignoreEffect !== 'filter') {
          copy =
            this.changes[key] == CONSTANTS.FILTER_TYPE.ORIGINAL
              ? copy
              : this.applyFilter(copy, this.changes[key]);
        } else if (key !== ignoreEffect) {
          copy = this.manipulate(copy, this.changes[key], key);
        }
      }
    }
    return copy;
  }

  // convolute(imageData, width, height, weights, opaque) {
  //   let weightsLength = Math.round(Math.sqrt(weights.length));
  //   let halfSide = Math.floor(weightsLength / 2);
  //   let sw = width;
  //   let sh = height;
  //   //pad output by the convolution matrix
  //   let w = width;
  //   let h = height;
  //   //go through the destination image pixels
  //   let alphaFactor = opaque ? 1 : 0;
  //   for (let y = 0; y < h; y++) {
  //     for (let x = 0; x < w; x++) {
  //       let sy = y;
  //       let sx = x;
  //       let dstOff = (y * w + x) * 4;
  //       //calculate weighted sum of the source image pixels
  //       //that fall under the convolution matrix
  //       let r = 0,
  //         g = 0,
  //         b = 0,
  //         a = 0;
  //       for (let cy = 0; cy < weightsLength; cy++) {
  //         for (let cx = 0; cx < weightsLength; cx++) {
  //           let scy = sy + cy - halfSide;
  //           let scx = sx + cx - halfSide;
  //           if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
  //             let srcOff = (scy * sw + scx) * 4;
  //             let wt = weights[cy * weightsLength + cx];
  //             r += imageData[srcOff] * wt;
  //             g += imageData[srcOff + 1] * wt;
  //             b += imageData[srcOff + 2] * wt;
  //             a += imageData[srcOff + 3] * wt;
  //           }
  //         }
  //       }
  //       imageData[dstOff] = r;
  //       imageData[dstOff + 1] = g;
  //       imageData[dstOff + 2] = b;
  //       imageData[dstOff + 3] = a + alphaFactor * (255 - a);
  //     }
  //   }
  //   return imageData;
  // }

  /**
   * @summary: Apply brightness manipulation on the pixels of the given image data.
   * @param {number} sliderValue - value of brightness slider input
   * @param {Uint8Array} image - imagedata to be manipulated.
   * @returns (Uint8Array) - imagedata with brightness manipulation applied.
   * @memberof Filter
   */
  getBrightness(sliderValue, image) {
    let data = image.data;
    let factor = CONSTANTS.BRIGHTNESS.FACTOR * sliderValue;
    for (let i = 0; i < data.length; i += 4) {
      let inputRed = data[i];
      let inputGreen = data[i + 1];
      let inputBlue = data[i + 2];

      data[i] = Math.min(255, factor + inputRed);
      data[i + 1] = Math.min(255, factor + inputGreen);
      data[i + 2] = Math.min(255, factor + inputBlue);
    }
    return image;
  }

  /**
   * @summary: Apply contrast manipulation on the pixels of the given image data.
   * @param {number} sliderValue - value of contrast slider input
   * @param {Uint8Array} image - imagedata to be manipulated.
   * @returns (Uint8Array) - imagedata with contrast manipulation applied.
   * @memberof Filter
   */
  getContrast(sliderValue, image) {
    let data = image.data;
    let contrast = sliderValue * CONSTANTS.CONTRAST.FACTOR * 2.55;
    let factor = (contrast + 255) / (255.01 - contrast);
    let midValue = 128;
    for (let i = 0; i < data.length; i += 4) {
      data[i] = factor * (data[i] - midValue) + midValue;
      data[i + 1] = factor * (data[i + 1] - midValue) + midValue;
      data[i + 2] = factor * (data[i + 2] - midValue) + midValue;
    }
    return image;
  }

  /**
   * @summary: Apply Saturation manipulation on the pixels of the given image data.
   * @param {number} sliderValue - value of saturation slider input
   * @param {Uint8Array} image - imagedata to be manipulated.
   * @returns (Uint8Array) - imagedata with saturation manipulation applied.
   * @memberof Filter
   */
  getSaturation(sliderValue, image) {
    let data = image.data;
    let RW = 0.299;
    let RG = 0.587;
    let RB = 0.114;
    let sBar = parseFloat(1 - sliderValue);
    let a = sBar * RW + sliderValue;
    let b = sBar * RW;
    let c = sBar * RW;
    let d = sBar * RG;
    let e = sBar * RG + sliderValue;
    let f = sBar * RG;
    let g = sBar * RB;
    let h = sBar * RB;
    let itemp = sBar * RB + sliderValue;
    for (let i = 0; i < data.length; i += 4) {
      let inputRed = data[i];
      let inputGreen = data[i + 1];
      let inputBlue = data[i + 2];
      data[i] = a * inputRed + d * inputGreen + g * inputBlue;
      data[i + 1] = b * inputRed + e * inputGreen + h * inputBlue;
      data[i + 2] = c * inputRed + f * inputGreen + itemp * inputBlue;
    }
    return image;
  }

  /**
   * @summary: Apply gamma manipulation on the pixels of the given image data.
   * @param {number} sliderValue - value of gamma slider input
   * @param {Uint8Array} image - imagedata to be manipulated.
   * @returns (Uint8Array) - imagedata with gamma manipulation applied.
   * @memberof Filter
   */
  getGamma(sliderValue, image) {
    let correctionFactor = Math.round((100 / sliderValue) * 10) / 10;
    let data = image.data;
    for (let i = 0; i < data.length; i += 4) {
      data[i] = 255 * Math.pow(data[i] / 255, correctionFactor);
      data[i + 1] = 255 * Math.pow(data[i + 1] / 255, correctionFactor);
      data[i + 2] = 255 * Math.pow(data[i + 2] / 255, correctionFactor);
    }
    return image;
  }

  /**
   * @summary: Apply temperature manipulation on the pixels of the given image data.
   * @param {number} sliderValue - value of temperature slider input
   * @param {Uint8Array} image - imagedata to be manipulated.
   * @returns (Uint8Array) - imagedata with temperature manipulation applied.
   * @memberof Filter
   */
  getTemperature(sliderValue, image) {
    let factor = CONSTANTS.TEMPERATURE.FACTOR * sliderValue;
    let data = image.data;
    for (let i = 0; i < data.length; i += 4) {
      data[i] = data[i] + factor;
      data[i + 2] = data[i + 2] - factor;

      if (data[i] > 255) data[i] = 255;
      if (data[i + 2] > 255) data[i + 2] = 255;
      if (data[i] < 0) data[i] = 0;
      if (data[i + 2] < 0) data[i + 2] = 0;
    }
    return image;
  }

  /**
   * @summary: Apply vibrance manipulation on the pixels of the given image data.
   * @param {number} sliderValue - value of vibrance slider input
   * @param {Uint8Array} image - imagedata to be manipulated.
   * @returns (Uint8Array) - imagedata with vibrance manipulation applied.
   * @memberof Filter
   */
  getVibrance(sliderValue, image) {
    let data = image.data;
    let factor = CONSTANTS.VIBRANCE.FACTOR * sliderValue;
    for (let i = 0; i < data.length; i += 4) {
      let inputRed = data[i];
      let inputGreen = data[i + 1];
      let inputBlue = data[i + 2];
      let max = Math.max(inputRed, inputGreen, inputBlue);
      let avg = (inputRed + inputGreen + inputBlue) / 3;
      let amt = (((Math.abs(max - avg) * 2) / 255) * factor) / 100;
      if (inputRed < max) data[i] = inputRed + (max - data[i]) * amt;
      if (inputGreen < max) data[i + 1] = inputGreen + (max - data[i + 1]) * amt;
      if (inputBlue < max) data[i + 2] = inputBlue + (max - data[i + 2]) * amt;
    }
    return image;
  }

  /**
   * @summary: Obtain Moon filter by applying brightness and saturation manipulation.
   * @param {Uint8Array} image - image data to be filtered
   * @returns (Uint8Array) - flitered image data
   * @memberof Filter
   */
  getMoonFilter(image) {
    return this.getSaturation(0, this.getBrightness(33.5, image));
  }

  /**
   * @summary: Obtain Claredon filter by applying brightness,contrast and saturation manipulation.
   * @param {Uint8Array} image - image data to be filtered
   * @returns (Uint8Array) - flitered image data
   * @memberof Filter
   */
  getClaredonFilter(image) {
    return this.getSaturation(1.25, this.getContrast(14, this.getBrightness(18.5, image)));
  }

  /**
   * @summary: Obtain Lark filter by applying brightness, contrast, saturation and gamma manipulation.
   * @param {Uint8Array} image - image data to be filtered
   * @returns (Uint8Array) - flitered image data
   * @memberof Filter
   */
  getLarkFilter(image) {
    return this.getGamma(
      0.57,
      this.getSaturation(1.34, this.getContrast(17, this.getBrightness(45, image)))
    );
  }
}

export default Filter;
