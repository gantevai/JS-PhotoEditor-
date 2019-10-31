import Control from './control.js';
import CONSTANTS from '../Constants.js';
import Filter from '../filters/filters.js';
class ImageControl extends Control {
  constructor(layer) {
    super(layer);
    this.init();
  }

  init() {
    this.slidersArray = [];
    this.filter = new Filter(this.layer.getImageData());
    this.controlBox.id = 'image_control';
    this.createSpecificControls();
    this.createFilterControls();
    this.createSliderBars();
  }

  createSpecificControls() {
    this.createButton('flip').onclick = () => {
      this.layer.flip();
    };
    this.createButton('crop').onclick = () => {
      this.layer.crop();
    };
  }

  createFilterControls() {
    //for heading of filter section
    this.filterDiv = document.createElement('div');
    this.filterDiv.style.cssFloat = 'left';
    this.controlBox.appendChild(this.filterDiv);
    const filterHeading = document.createElement('div');
    filterHeading.innerText = 'Filters';
    filterHeading.classList.add('heading-span');
    this.filterDiv.appendChild(filterHeading);

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
      this.layer.filter(imageData);
      this.layer.copyLayerImage();
    };
    this.createFilteredThumbnail(CONSTANTS.FILTER_TYPE.SEPIA).onclick = () => {
      imageData = this.filter.getFilteredImageData(CONSTANTS.FILTER_TYPE.SEPIA);
      this.layer.filter(imageData);
      this.layer.copyLayerImage();
    };
    this.createFilteredThumbnail(CONSTANTS.FILTER_TYPE.CLAREDON).onclick = () => {
      imageData = this.filter.getFilteredImageData(CONSTANTS.FILTER_TYPE.CLAREDON);
      this.layer.filter(imageData);
      this.layer.copyLayerImage();
    };
    this.createFilteredThumbnail(CONSTANTS.FILTER_TYPE.LARK).onclick = () => {
      imageData = this.filter.getFilteredImageData(CONSTANTS.FILTER_TYPE.LARK);
      this.layer.filter(imageData);
      this.layer.copyLayerImage();
    };
    this.createFilteredThumbnail(CONSTANTS.FILTER_TYPE.MOON).onclick = () => {
      imageData = this.filter.getFilteredImageData(CONSTANTS.FILTER_TYPE.MOON);
      this.layer.filter(imageData);
      this.layer.copyLayerImage();
    };
  }

  createSliderBars() {
    // 'for heading of sliderbar section'
    this.sliderFullBody = document.createElement('div');
    this.sliderFullBody.style.cssFloat = 'left';
    this.controlBox.appendChild(this.sliderFullBody);
    const sliderHeading = document.createElement('div');
    sliderHeading.innerText = 'Manipulators';
    sliderHeading.classList.add('heading-span');
    sliderHeading.classList.add('manipulators');
    this.sliderFullBody.appendChild(sliderHeading);

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
      this.layer.filter(imageData);
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
      this.layer.filter(imageData);
    };
    this.slidersArray.push({
      slider: this.contrastSlider,
      initial: CONSTANTS.CONTRAST.INITIAL_VALUE
    });

    this.saturationSlider = this.createSlider(
      CONSTANTS.SATURATION.SLIDER_NAME,
      CONSTANTS.SATURATION.MIN_VALUE,
      CONSTANTS.SATURATION.MAX_VALUE,
      CONSTANTS.SATURATION.INITIAL_VALUE
    );
    this.saturationSlider.setAttribute('step', '0.01');
    this.saturationSlider.oninput = () => {
      imageData = this.filter.getManipulatedImageData(
        this.saturationSlider.value,
        CONSTANTS.SATURATION.SLIDER_NAME
      );
      this.layer.filter(imageData);
    };
    this.slidersArray.push({
      slider: this.saturationSlider,
      initial: CONSTANTS.SATURATION.INITIAL_VALUE
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
      this.layer.filter(imageData);
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
      this.layer.filter(imageData);
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
      this.layer.filter(imageData);
    };
    this.slidersArray.push({
      slider: this.vibranceSlider,
      initial: CONSTANTS.VIBRANCE.INITIAL_VALUE
    });
  }

  createSlider(heading, min, max, initialValue) {
    const sliderDiv = document.createElement('div');
    sliderDiv.style.textAlign = 'center';
    sliderDiv.style.cssFloat = 'left';
    const sliderName = document.createElement('h4');
    sliderName.innerText = heading;
    sliderName.classList.add('slider-name');
    sliderDiv.appendChild(sliderName);
    const slider = document.createElement('input');
    slider.setAttribute('type', 'range');
    slider.setAttribute('min', min);
    slider.setAttribute('max', max);
    slider.setAttribute('value', initialValue);
    slider.classList.add('sliders');
    sliderDiv.appendChild(slider);
    this.sliderBody.appendChild(sliderDiv);
    return slider;
  }

  resetSliders() {
    for (let i = 0; i < this.slidersArray.length; i++) {
      this.slidersArray[i].slider.setAttribute('value', this.slidersArray[i].initial);
    }
  }

  createFilteredThumbnail(filterType) {
    const image =
      filterType == CONSTANTS.FILTER_TYPE.ORIGINAL
        ? this.layer.original
        : this.filter.getImage(filterType, true);
    const anchor = document.createElement('a');
    const span = document.createElement('span');
    span.style.fontWeight = 'bold';
    span.style.fontSize = '11px';
    span.innerText = filterType;
    anchor.appendChild(image);
    anchor.appendChild(span);
    this.filterDiv.appendChild(anchor);
    return anchor;
  }
}
export default ImageControl;
