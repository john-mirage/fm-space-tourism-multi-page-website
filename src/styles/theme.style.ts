import { pxToRem } from "@utils/style";

const themeStyles = new CSSStyleSheet();

themeStyles.replaceSync(`
  :host {
    --color-dark-blue: #0B0D17;
    --color-light-blue: #D0D6F9;
    --color-white: #FFFFFF;

    --font-stack-belfair: "Bellefair", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    --font-stack-barlow: "Barlow Condensed", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";

    --font-heading-1-family: var(--font-stack-belfair);
    --font-heading-1-size: ${pxToRem(150)};
    --font-heading-1-weight: 400;
    --font-heading-1-height: ${pxToRem(172)};
    --font-heading-1-transform: uppercase;
    --font-heading-1-spacing: 0;

    --font-heading-2-family: var(--font-stack-belfair);
    --font-heading-2-size: ${pxToRem(100)};
    --font-heading-2-weight: 400;
    --font-heading-2-height: ${pxToRem(115)};
    --font-heading-2-transform: uppercase;
    --font-heading-2-spacing: 0;

    --font-heading-3-family: var(--font-stack-belfair);
    --font-heading-3-size: ${pxToRem(56)};
    --font-heading-3-weight: 400;
    --font-heading-3-height: ${pxToRem(64)};
    --font-heading-3-transform: uppercase;
    --font-heading-3-spacing: 0;

    --font-heading-4-family: var(--font-stack-belfair);
    --font-heading-4-size: ${pxToRem(32)};
    --font-heading-4-weight: 400;
    --font-heading-4-height: ${pxToRem(37)};
    --font-heading-4-transform: uppercase;
    --font-heading-4-spacing: 0;

    --font-heading-5-family: var(--font-stack-barlow);
    --font-heading-5-size: ${pxToRem(28)};
    --font-heading-5-weight: 400;
    --font-heading-5-height: ${pxToRem(34)};
    --font-heading-5-transform: uppercase;
    --font-heading-5-spacing: ${pxToRem(4.725)};

    --font-subheading-1-family: var(--font-stack-belfair);
    --font-subheading-1-size: ${pxToRem(28)};
    --font-subheading-1-weight: 400;
    --font-subheading-1-height: ${pxToRem(32)};
    --font-subheading-1-transform: uppercase;
    --font-subheading-1-spacing: 0;

    --font-subheading-2-family: var(--font-stack-barlow);
    --font-subheading-2-size: ${pxToRem(14)};
    --font-subheading-2-weight: 400;
    --font-subheading-2-height: ${pxToRem(17)};
    --font-subheading-2-transform: uppercase;
    --font-subheading-2-spacing: ${pxToRem(2.362)};

    --font-nav-family: var(--font-stack-barlow);
    --font-nav-size: ${pxToRem(16)};
    --font-nav-weight: 400;
    --font-nav-height: ${pxToRem(19)};
    --font-nav-transform: uppercase;
    --font-nav-spacing: ${pxToRem(2.7)};

    --font-body-family: var(--font-stack-barlow);
    --font-body-size: ${pxToRem(18)};
    --font-body-weight: 400;
    --font-body-height: ${pxToRem(32)};
    --font-body-transform: none;
    --font-body-spacing: 0;
  }
`);

export default themeStyles;