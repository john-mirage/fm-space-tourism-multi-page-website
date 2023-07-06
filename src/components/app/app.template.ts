const componentTemplate = document.createElement("template");

componentTemplate.innerHTML = `
  <st-header class="header"></st-header>
  <st-page class="page" data-js="page"></st-page>
`;

export default componentTemplate;
