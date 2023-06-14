import { pxToRem } from "../../utils/style";

const componentStyles = new CSSStyleSheet();

componentStyles.replaceSync(`
  :host {
    --page-padding-top: ${pxToRem(64)};
    --page-view-margin-bottom: ${pxToRem(96)};

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 100vh;
    padding-top: var(--page-padding-top);
  }

  .view {
    flex: 1;
    margin-bottom: var(--page-view-margin-bottom);
  }

  .footer {
    flex: 0;
  }
`);

export default componentStyles;
