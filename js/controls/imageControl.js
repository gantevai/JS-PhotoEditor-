import Control from './control.js';
import CONSTANTS from '../Constants.js';
import Filter from '../filters/filters.js';

/**
 * @summary: Class that handles control buttons for image layer
 * @class ImageControl
 * @extends {Control}
 */
class ImageControl extends Control {
  constructor(layer) {
    super(layer);
    this.init();
  }

  /**
   * Initialize
   * @memberof ImageControl
   */
  init() {
    this.slidersArray = [];
    this.filter = new Filter(this.layer.getImageData());
    this.controlBox.id = 'image_control';
    this.createSpecificControls();
    this.createFilterControls();
    this.createSliderBars();
  }

  /**
   * @summary: Creates the control buttons specific to the image layer (flip and crop).
   * Sets onclick for the created buttons.
   * @memberof ImageControl
   */
  createSpecificControls() {
    this.createButton('flip').onclick = () => {
      this.layer.flip();
    };
    this.createButton('crop').onclick = () => {
      this.layer.crop();
    };
  }

  /**
   * @summary: Create Filter Control Div in the DOM
   * Create Filter Thumbnails as control buttons inside the Filter Div.
   * Set Onclicks for the filter thumbnails.
   * @memberof ImageControl
   */
  createFilterControls() {
    //for heading of filter section
    this.filterDiv = document.createElement('div');
    this.filterDiv.style.cssFloat = 'left';
    this.controlBox.appendChild(this.filterDiv);
    const FILTER_HEADING = document.createElement('div');
    FILTER_HEADING.innerText = 'Filters';
    FILTER_HEADING.classList.add('heading-span');
    this.filterDiv.appendChild(FILTER_HEADING);

    let imageData;
    this.createFilteredThumbnail(CONSTANTS.FILTER_TYPE.ORIGINAL).onclick = () => {
      this.layer.resetChanges();
      this.resetSliders();
      // imageData = this.layer.original;
      // imageData = this.layer.getOriginalImageData();
      // this.layer.filter(imageData);
    };
    this.createFilteredThumbnail(CONSTANTS.FILTER_TYPE.GRAYSCALE).onclick = () => {
      imageData = this.filter.getFilteredImageData(CONSTANTS.FILTER_TYPE.GRAYSCALE);
      this.layer.putImage(imageData);
      this.layer.copyLayerImage();
    };
    this.createFilteredThumbnail(CONSTANTS.FILTER_TYPE.SEPIA).onclick = () => {
      imageData = this.filter.getFilteredImageData(CONSTANTS.FILTER_TYPE.SEPIA);
      this.layer.putImage(imageData);
      this.layer.copyLayerImage();
    };
    this.createFilteredThumbnail(CONSTANTS.FILTER_TYPE.CLAREDON).onclick = () => {
      imageData = this.filter.getFilteredImageData(CONSTANTS.FILTER_TYPE.CLAREDON);
      this.layer.putImage(imageData);
      this.layer.copyLayerImage();
    };
    this.createFilteredThumbnail(CONSTANTS.FILTER_TYPE.LARK).onclick = () => {
      imageData = this.filter.getFilteredImageData(CONSTANTS.FILTER_TYPE.LARK);
      this.layer.putImage(imageData);
      this.layer.copyLayerImage();
    };
    this.createFilteredThumbnail(CONSTANTS.FILTER_TYPE.MOON).onclick = () => {
      imageData = this.filter.getFilteredImageData(CONSTANTS.FILTER_TYPE.MOON);
      this.layer.putImage(imageData);
      this.layer.copyLayerImage();
    };
  }

  /**
   * @summary: Create Manipulator slider bars in the control box.
   * Create slider Div in the DOM and style it.
   * Set oninput event listener in the created slider input bars.
   * @memberof ImageControl
   */
  createSliderBars() {
    // 'for heading of sliderbar section'
    this.sliderFullBody = document.createElement('div');
    this.sliderFullBody.style.cssFloat = 'left';
    this.controlBox.appendChild(this.sliderFullBody);
    const SLIDER_HEADING = document.createElement('div');
    SLIDER_HEADING.innerText = 'Manipulators';
    SLIDER_HEADING.classList.add('heading-span');
    SLIDER_HEADING.classList.add('manipulators');
    this.sliderFullBody.appendChild(SLIDER_HEADING);

    this.sliderBody = document.createElement('div');
    this.sliderBody.style.cssFloat = 'left';
    this.sliderBody.style.overflow = 'auto';
    this.sliderBody.style.height = '115px';
    this.sliderFullBody.appendChild(this.sliderBody);

    let imageData;

    this.brightnessSlider = this.createSlider(
      CONSTANTS.BRIGHTNESS.SLIDER_NAME,
      CONSTANTS.BRIGHTNESS.MIN_VALUE,
      CONSTANTS.BRIGHTNESS.MAX_VALUE,
      CONSTANTS.BRIGHTNESS.INITIAL_VALUE
    );
    this.brightnessSlider.oninput = () => {
      imageData = this.filter.getManipulatedImageData(
        this.brightnessSlider.value,
        CONSTANTS.BRIGHTNESS.SLIDER_NAME
      );
      this.layer.putImage(imageData);
    };
    this.slidersArray.push({
      slider: this.brightnessSlider,
      initial: CONSTANTS.BRIGHTNESS.INITIAL_VALUE
    });

    this.contrastSlider = this.createSlider(
      CONSTANTS.CONTRAST.SLIDER_NAME,
      CONSTANTS.CONTRAST.MIN_VALUE,
      CONSTANTS.CONTRAST.MAX_VALUE,
      CONSTANTS.CONTRAST.INITIAL_VALUE
    );
    this.contrastSlider.oninput = () => {
      imageData = this.filter.getManipulatedImageData(
        this.contrastSlider.value,
        CONSTANTS.CONTRAST.SLIDER_NAME
      );
      this.layer.putImage(imageData);
    };
    this.slidersArray.push({
      slider: this.contrastSlider,
      initial: CONSTANTS.CONTRAST.INITIAL_VALUE
    });

    this.gammaSlider = this.createSlider(
      CONSTANTS.GAMMA.SLIDER_NAME,
      CONSTANTS.GAMMA.MIN_VALUE,
      CONSTANTS.GAMMA.MAX_VALUE,
      CONSTANTS.GAMMA.INITIAL_VALUE
    );
    this.gammaSlider.oninput = () => {
      imageData = this.filter.getManipulatedImageData(
        this.gammaSlider.value,
        CONSTANTS.GAMMA.SLIDER_NAME
      );
      this.layer.putImage(imageData);
    };
    this.slidersArray.push({
      slider: this.gammaSlider,
      initial: CONSTANTS.GAMMA.INITIAL_VALUE
    });

    this.temperatureSlider = this.createSlider(
      CONSTANTS.TEMPERATURE.SLIDER_NAME,
      CONSTANTS.TEMPERATURE.MIN_VALUE,
      CONSTANTS.TEMPERATURE.MAX_VALUE,
      CONSTANTS.TEMPERATURE.INITIAL_VALUE
    );
    this.temperatureSlider.oninput = () => {
      imageData = this.filter.getManipulatedImageData(
        this.temperatureSlider.value,
        CONSTANTS.TEMPERATURE.SLIDER_NAME
      );
      this.layer.putImage(imageData);
    };
    this.slidersArray.push({
      slider: this.temperatureSlider,
      initial: CONSTANTS.TEMPERATURE.INITIAL_VALUE
    });

    this.vibranceSlider = this.createSlider(
      CONSTANTS.VIBRANCE.SLIDER_NAME,
      CONSTANTS.VIBRANCE.MIN_VALUE,
      CONSTANTS.VIBRANCE.MAX_VALUE,
      CONSTANTS.VIBRANCE.INITIAL_VALUE
    );
    this.vibranceSlider.oninput = () => {
      imageData = this.filter.getManipulatedImageData(
        this.vibranceSlider.value,
        CONSTANTS.VIBRANCE.SLIDER_NAME
      );
      this.layer.putImage(imageData);
    };
    this.slidersArray.push({
      slider: this.vibranceSlider,
      initial: CONSTANTS.VIBRANCE.INITIAL_VALUE
    });

    // this.saturationSlider = this.createSlider(
    //   CONSTANTS.SATURATION.SLIDER_NAME,
    //   CONSTANTS.SATURATION.MIN_VALUE,
    //   CONSTANTS.SATURATION.MAX_VALUE,
    //   CONSTANTS.SATURATION.INITIAL_VALUE
    // );
    // this.saturationSlider.setAttribute('step', '0.01');
    // this.saturationSlider.oninput = () => {
    //   imageData = this.filter.getManipulatedImageData(
    //     this.saturationSlider.value,
    //     CONSTANTS.SATURATION.SLIDER_NAME
    //   );
    //   this.layer.filter(imageData);
    // };
    // this.slidersArray.push({
    //   slider: this.saturationSlider,
    //   initial: CONSTANTS.SATURATION.INITIAL_VALUE
    // });
  }

  /**
   * @summary: Function to create Slider input element,style it and append them.
   * @param {String} heading - Heading or name for the slider
   * @param {number} min - minimum value of slider bar
   * @param {number} max - maximum value of slider bar
   * @param {number} initialValue - initial value of slider bar
   * @returns (reference) - Reference of the created slider element.
   * @memberof ImageControl
   */
  createSlider(heading, min, max, initialValue) {
    const SLIDER_DIV = document.createElement('div');
    SLIDER_DIV.style.textAlign = 'center';
    SLIDER_DIV.style.cssFloat = 'left';
    const SLIDER_NAME = document.createElement('h4');
    SLIDER_NAME.innerText = heading;
    SLIDER_NAME.classList.add('slider-name');
    SLIDER_DIV.appendChild(SLIDER_NAME);
    const SLIDER = document.createElement('input');
    SLIDER.setAttribute('type', 'range');
    SLIDER.setAttribute('min', min);
    SLIDER.setAttribute('max', max);
    SLIDER.setAttribute('value', initialValue);
    SLIDER.classList.add('sliders');
    SLIDER_DIV.appendChild(SLIDER);
    this.sliderBody.appendChild(SLIDER_DIV);
    return SLIDER;
  }

  /**
   * @summary: reset all the sliders to intial value.
   * @memberof ImageControl
   */
  resetSliders() {
    for (let i = 0; i < this.slidersArray.length; i++) {
      this.slidersArray[i].slider.setAttribute('value', this.slidersArray[i].initial);
    }
  }

  /**
   * @summary: Create filtered thumbnail for the image filter control and appends it to the DOM.
   * @param {String} filterType - type of the filter
   * @returns (Reference)- Reference of the created element that contains the created thumbnail.
   * @memberof ImageControl
   */
  createFilteredThumbnail(filterType) {
    const IMAGE =
      filterType == CONSTANTS.FILTER_TYPE.ORIGINAL
        ? this.layer.original
        : this.filter.getImage(filterType, true);
    const ANCHOR = document.createElement('a');
    const SPAN = document.createElement('span');
    SPAN.style.fontWeight = 'bold';
    SPAN.style.fontSize = '11px';
    SPAN.innerText = filterType;
    ANCHOR.appendChild(IMAGE);
    ANCHOR.appendChild(SPAN);
    this.filterDiv.appendChild(ANCHOR);
    return ANCHOR;
  }
}
export default ImageControl;
