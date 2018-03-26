import functions from './functions';


functions.ready(() => {

  const lang = window.GDPR.lang.toUpperCase();
  const baseURL = window.GDPR.baseURL;

  let content = document.querySelector('#gdpr-toc .content');
  window.frames['eurlex'].location = 'https://eur-lex.europa.eu/legal-content/' + lang + '/TXT/?uri=celex:32016R0679';

  // TOC link clicks
  content.addEventListener('click', (event) => {
    if(event.target.tagName === 'A') {
      let id = event.target.href.split('#')[1];
      window.frames['eurlex'].location = event.target.href;
    }
    
    event.preventDefault();
    return false;
  });

  // Language selector
  let languageSelect = document.getElementById('languages');

  languageSelect.addEventListener('input', (event) => {
    console.log(event.target.value, );
    window.location.replace(baseURL + event.target.value);
  });
});

