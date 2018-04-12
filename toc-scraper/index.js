const fs = require('fs');
const path = require('path');
const GDPR = require('./modules/gdpr');

const languages = ['EN','HU'];
const eusite = 'http://eur-lex.europa.eu/legal-content/{{lang}}/TXT/HTML/?uri=CELEX:32016R0679';
global.__basedir = __dirname;

languages.forEach((language) => {
  let gdpr = new GDPR(language);
    gdpr.scrapeURL(eusite.replace('{{lang}}', language)).then((scrape) => {
      let toc = gdpr.formatContent(gdpr.structureContent(scrape));
      let tocFile = path.join(__dirname, '..', 'web', 'dist', 'inc', 'parts', `toc_${language.toLowerCase()}.html`);
      fs.writeFile(tocFile, toc, (err) => {
        if(err) throw err;
        console.log(`TOC (${language}) file has been written to "${tocFile}".`);
      });
    }).catch((error) => {
    console.log(error);
  });
});

