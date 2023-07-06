/**
 * Transform a pixel value to rem.
 * @param {number} px The pixel value
 * @returns {string} The rem value
 */
export const pxToRem = (px: number): string => {
  return `${String(px / 16)}rem`;
};
