const CONSTANTS = {
  RESIZE_CONSTRAINTS: { MIN_SIZE: 20 },
  FILTER_TYPE: {
    ORIGINAL: 'original',
    SEPIA: 'sepia',
    GRAYSCALE: 'grayscale',
    MOON: 'moon',
    CLAREDON: 'claredon',
    LARK: 'lark'
  },
  BRIGHTNESS: {
    SLIDER_NAME: 'Brightness',
    MIN_VALUE: -20,
    MAX_VALUE: 20,
    INITIAL_VALUE: 0,
    FACTOR: 2
  },
  CONTRAST: {
    SLIDER_NAME: 'Contrast',
    MIN_VALUE: -10,
    MAX_VALUE: 10,
    INITIAL_VALUE: 0,
    FACTOR: 2
  },
  SATURATION: {
    SLIDER_NAME: 'Saturation',
    MIN_VALUE: 0,
    MAX_VALUE: 2,
    INITIAL_VALUE: 1,
    FACTOR: 2
  },
  TEMPERATURE: {
    SLIDER_NAME: 'Temperature',
    MIN_VALUE: -25,
    MAX_VALUE: 25,
    INITIAL_VALUE: 0,
    FACTOR: 2
  },
  VIBRANCE: {
    SLIDER_NAME: 'Vibrance',
    MIN_VALUE: -50,
    MAX_VALUE: 50,
    INITIAL_VALUE: 0,
    FACTOR: 2
  },
  GAMMA: {
    SLIDER_NAME: 'Gamma',
    MIN_VALUE: 0,
    MAX_VALUE: 200,
    INITIAL_VALUE: 100,
    FACTOR: 2
  }
};
export default CONSTANTS;
