const fs = require('fs');
const path = require('path');
const GDPR = require('./modules/gdpr');

let languages = ['EN','HU'];

languages.forEach((language) => {
  let gdpr = new GDPR(language);
  gdpr.findLanguageFile(language).then((filename) => {
    gdpr.scrapeFile(filename).then((scrape) => {
      let toc = gdpr.formatContent(gdpr.structureContent(scrape));
      fs.writeFile(path.join(__dirname, '..', 'web', 'dist', 'inc', 'parts', `toc_${language.toLowerCase()}.html`), toc);
    });
  }).catch((error) => {
    console.log(error);
  });
});

