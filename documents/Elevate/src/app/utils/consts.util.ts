// Rem unit
export const REM: number = 16;

// Break points
export const SM_BREAK_POINT: number = 375;
export const MD_BREAK_POINT: number = 576;
export const MOBILE_MAX_BREAK_POINT: number = 768;
export const LG_BREAK_POINT: number = 1194;
export const XLG_BREAK_POINT: number = 1600;

export const MOBILE_HEADER_HEIGHT: number = 81;

// SVG
export const XMLNS: string = 'http://www.w3.org/2000/svg';

// Easing
export const EASING: string = 'cubicBezier(0.9, 0, 0.1, 1)';

// Animation timing
export const FULL_VIEWPORT_ANIMATION_TIMING: string = '800ms ease-out';

// Dummy commy
// TODO: remove this
export const LOREM: string = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel elit scelerisque mauris pellentesque. Cras ornare arcu dui vivamus arcu felis bibendum. Velit egestas dui id ornare arcu odio ut sem nulla. Arcu cursus vitae congue mauris rhoncus aenean vel elit. Nulla aliquet enim tortor at auctor. Mattis rhoncus urna neque viverra justo nec ultrices dui. Amet venenatis urna cursus eget nunc scelerisque viverra mauris. Tortor condimentum lacinia quis vel eros donec ac odio. Amet nulla facilisi morbi tempus iaculis urna id. Habitant morbi tristique senectus et. Facilisis leo vel fringilla est ullamcorper eget nulla facilisi. Vulputate sapien nec sagittis aliquam malesuada bibendum. Diam quam nulla porttitor massa id neque aliquam vestibulum morbi. Id cursus metus aliquam eleifend mi in nulla. Est ante in nibh mauris cursus mattis molestie a.`;
export const LOREM_SENTENCES: Array<string> = LOREM.split('. ');

// Color Codes
export const ELEVATE_BLUE: string = '#33CCFF';
export const BLACK: string = '#000000';
export const MID_BLUE_DARK: string = '#0073BF';
export const BLUE_DARK: string = '#003366';
export const GREEN_DARK: string = '#39742D';

// REGEX
export const URL_REGEX: RegExp = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
export const MOBILE_DEVICE_REGEX: RegExp = /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/;
export const TABLET_DEVICE_REGEX: RegExp = /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i;
