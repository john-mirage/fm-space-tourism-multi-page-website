const componentStyles = new CSSStyleSheet();

componentStyles.replaceSync(`
  :host {
    --_app-background-color: var(--color-background);
    --_app-transition-duration: 150ms;
    
    display: block;
    height: 100%;
    overflow: hidden;
    background-color: var(--_app-background-color);
  }

  .container {
    overflow: scroll;
  }

  .header {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
  }
`);

export default componentStyles;
