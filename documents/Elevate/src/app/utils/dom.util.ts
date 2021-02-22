import { MD_BREAK_POINT, XLG_BREAK_POINT, LG_BREAK_POINT, MOBILE_DEVICE_REGEX, TABLET_DEVICE_REGEX } from './consts.util';

/*
 * isClient
 * Returns condition whether server-side or client-side
 */
export const isClient: boolean = typeof window === 'object';

/*
 * isTouchDevice
 * Returns condition if device has touch event
 */
export const isTouchDevice: boolean = isClient && 'ontouchstart' in window;

/*
 * isMobileLayout
 * Returns condition if window width is mobile size
 */
export const isMobileLayout = (): boolean =>
  isClient ? window.innerWidth <= MD_BREAK_POINT : false;

/*
 * isMobileLayout
 * Returns condition if window width is mobile size
 */
export const isMobileAndTabletLayout = (): boolean =>
  isClient ? window.innerWidth <= LG_BREAK_POINT : false;

/*
 * isDesktopWideLayout
 * Returns condition if window width is mobile size
 */
export const isDesktopWideLayout = (): boolean =>
  isClient ? window.innerWidth > XLG_BREAK_POINT : false;

/*
 * getDevicePixelRatio
 * Returns the ratio of the resolution in physical pixels to the resolution in CSS pixels for the current display device.
 */
export const getDevicePixelRatio = (): number =>
  isClient ? window.devicePixelRatio : 1;

/**
 * getScrollElement
 * Return window scroll element
 */
export const getScrollElement = (): Element =>
  window.document.scrollingElement ||
  window.document.body ||
  window.document.documentElement;

export const getDeviceType = (): string => {
  const userAgent = navigator.userAgent;
  if (TABLET_DEVICE_REGEX.test(userAgent)) {
    return 'tablet';
  }
  if (MOBILE_DEVICE_REGEX.test(userAgent)) {
    return 'mobile';
  }
  return 'desktop';
};
