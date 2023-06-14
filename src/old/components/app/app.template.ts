const componentTemplate = document.createElement("template");

componentTemplate.innerHTML = `
  <div class="container">
    <audio-header class="header"></audio-header>
    <audio-page id="page"></audio-page>
  </div>
`;

export default componentTemplate;
