const fs = require('fs');
const path = require('path');
const GDPR = require('./modules/gdpr');

const languages = ['EN','DE','HU','BG','ES','CS','DA','ET','EL','FR','GA','HR','IT','LV','LT','MT','NL','PL','PT','RO','SK','SL','FI','SV'];
const url = 'eur-lex.europa.eu/legal-content/{{lang}}/TXT/HTML/?uri=CELEX:32016R0679';
global.__basedir = __dirname;


let gdpr = new GDPR(url, languages);

gdpr.scrapeURLS().then((srapedDatas) => {
  gdpr.structureScrapedDatas(srapedDatas).then((structuredDatas) => {
    gdpr.createTOCS(structuredDatas).then((tocContents) => {
      tocContents.forEach((tocContent) => {
        let tocFile = path.join(__dirname, '..', 'web', 'dist', 'inc', 'parts', `toc_${tocContent.language.toLowerCase()}.html`);
        fs.writeFile(tocFile, tocContent.toclist, (err) => {
          if(err) throw err;
          console.log(`TOC (${tocContent.language}) file has been written to "${tocFile}".`);
        });
      });
    });
  })
}).catch((error) => {
  console.log(error);
});
