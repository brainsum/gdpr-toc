import Language from './languages';
import functions from './functions';
import SlimSelect from 'slim-select';


const lang = window.GDPR.lang.toUpperCase();
const baseURL = window.GDPR.baseURL;


functions.ready(() => {

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
    placeholder: 'Select a language',
    onChange: (data) => {
      if(data.value !== lang.toLowerCase()) {
        window.location.replace(baseURL + data.value);
      }
    }
  });

  select.set(lang.toLowerCase());
});

// Cookie notice
functions.ready(() => {

  let cookieBar =`<div id="cooki-bar">
    <div class="content">
      <div class="left">${Language.get('cookieNotice', lang)}</div>
      <div class="right">
        <button>${Language.get('accept', lang)}</button>
      </div>
    </div>
  <div>`;

  document.body.insertAdjacentHTML('beforeend', cookieBar)


  let templates = document.querySelectorAll('template.cookie-accept');

  Array.prototype.forEach.call(templates, (elem) => {
    elem.insertAdjacentHTML('beforebegin', elem.innerHTML);
    elem.parentNode.removeChild(elem);    
  })
});

