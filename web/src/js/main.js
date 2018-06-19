import functions from './functions';
import SlimSelect from 'slim-select'


functions.ready(() => {

  const lang = window.GDPR.lang.toUpperCase();
  const baseURL = window.GDPR.baseURL;

  window.frames['eurlex'].location = 'https://eur-lex.europa.eu/legal-content/' + lang + '/TXT/?uri=CELEX:32016R0679';

  // TOC link clicks
  (function () {
    let content = document.querySelector('#gdpr-toc .content');

    content.addEventListener('click', (event) => {
      if(event.target.tagName === 'A') {

        // Adding classes to links for color
        removeClassFromAll('active');
        event.target.classList.add('active');

        // If not mobile view open in IFRAME else open in new TAB
        if(window.innerWidth > 1100) {
          let id = event.target.href.split('#')[1];
          window.frames['eurlex'].location = event.target.href;
          event.preventDefault(); 
          return false;
        }
      }
    });

    function removeClassFromAll(className) {
      let links = content.querySelectorAll('a').forEach((link) => {
        if(link.classList.contains('active')) {
          link.classList.add('visited');
        }
        link.classList.remove(className);
      });
    }
  })();

  // Slim select
  var select = new SlimSelect({
    select: '#languages',
    showSearch: false,
    onChange: (data) => {
      if(data.value !== lang.toLowerCase()) {
        window.location.replace(baseURL + data.value);
      }
    }
  });

  select.set(lang.toLowerCase());

  // Language selector
  let languageSelect = document.getElementById('languages');

  languageSelect.addEventListener('input', (event) => {
    console.log(event.target.value, );
    window.location.replace(baseURL + event.target.value);
  });
});

