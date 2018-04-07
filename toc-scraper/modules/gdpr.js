const fs = require("fs");
const path = require('path');
const scrapeIt = require("scrape-it");


class GDPR {

  constructor(language) {
    this.languages = ['HU','EN'];
    this.language = (this.languages.indexOf(language) >= 0) ? language : 'HU';
    this.names = {
      EN: {
        chapter:'chapter',
        section:'section',
        article:'article'
      },
      HU: {
        chapter:'fejezet',
        section:'szakasz',
        article:'cikk'
      }
    }
    this.url = 'https://eur-lex.europa.eu/legal-content/' + this.language + '/TXT/?uri=celex:32016R0679';
  }

  findLanguageFile(lang) {

    return new Promise((resolve, reject) => {
      fs.readdir(path.join(__basedir, 'html'), (err, files) => {

        if(err) {
          reject('File not found');
          return;
        }

        files.forEach((file) => {
          if(file.indexOf(lang) >= 0) {
            resolve(file);
            return;
          }
        });
      });
    });
  }

  scrapeFile(filename) {

    return new Promise((resolve, reject) => {
      
      fs.readFile(path.join(__basedir, 'html', filename), 'utf-8', (err, data) => {

        // Scraping data
        let scrape = scrapeIt.scrapeHTML(data, {
            sections: {
              listItem: ".ti-section-1, .ti-art",
              data: {
                id: {
                  attr: "id"
                },
                type: {
                  how: "text"
                }
              }
            },
            titles: {
              listItem: ".ti-section-2, .sti-art",
              data: {
                title: {
                  how: "text"
                }
              }
            }
        });

        resolve(scrape);
      });
    });
  }

  structureContent(scrape) {

    // Combining the two lists as [{id,type,title}]
    let tocObject = [];

    for (let i = 0; i < scrape['sections'].length; i++) {
      let object = scrape['sections'][i];
      object.title = scrape['titles'][i].title;

      tocObject.push(object);
    }

    // Separating list based on sections
    let chapterId = '';
    let sectionId = null;
    let structuredContent = {};
    structuredContent.chapters = {};

    for (let i = 0; i < tocObject.length; i++) {
      let type = tocObject[i].type;
      if(type.toLowerCase().indexOf(this.names[this.language].chapter) >= 0) {
        structuredContent.chapters[i] = {
          name : `${type} - ${tocObject[i].title}`,
          id: tocObject[i].id
        }
        chapterId = i;
        sectionId = null;
      } else if(type.toLowerCase().indexOf(this.names[this.language].section) >= 0) {
        sectionId = i;
        structuredContent.chapters[chapterId]['sections'] = structuredContent.chapters[chapterId]['sections'] || {};
        structuredContent.chapters[chapterId]['sections'][sectionId] = {
          name : `${type} - ${tocObject[i].title}`,
          id: tocObject[i].id
        };
      } else {
        if(sectionId) {
          structuredContent.chapters[chapterId].sections[sectionId]['articles'] = structuredContent.chapters[chapterId]['sections'][sectionId]['articles'] || {};
          structuredContent.chapters[chapterId].sections[sectionId]['articles'][tocObject[i].id] = tocObject[i];
        } else {
          structuredContent.chapters[chapterId]['articles'] = structuredContent.chapters[chapterId]['articles'] || {};
          structuredContent.chapters[chapterId]['articles'][tocObject[i].id] = tocObject[i];
        }
      }
    }

    return structuredContent;
  }

  formatContent(structuredContent) {
    // Converting the list to HTML
    let toclist = '<ul>\n';

    for (let chapterId in structuredContent.chapters) {
      let chapter = structuredContent.chapters[chapterId];
      toclist += `<li><a href="${this.url}#${chapter.id}" target="_blank">${chapter.name}</a>\n`;
        if(chapter.articles) {
          toclist += '<ul>\n';
          for (let articleId in chapter.articles) {
            let article = chapter.articles[articleId];
            toclist += `<li><a href="${this.url}#${article.id}" target="_blank">${article.title} - (${article.type})</a></li>\n`;
          }
          toclist += '</ul>\n';
        }
        if(chapter.sections) {
          toclist += '<ul>\n';
          for (let sectionId in chapter.sections) {
            let section = chapter.sections[sectionId];
            toclist += `<li><a href="${this.url}#${section.id}" target="_blank">${section.name}</a>\n`;
            if(section.articles) {
              toclist += '<ul>\n';
              for (let articleId in section.articles) {
                let article = section.articles[articleId];
                toclist += `<li><a href="${this.url}#${article.id}" target="_blank">${article.title} - (${article.type})</a></li>\n`;
              }
              toclist += '</ul>\n';
            }
            toclist += '</li>\n';
          }
          toclist += '</ul>\n';
        }
      toclist += '</li>\n';
    }

    toclist += '</ul>\n';

    return toclist;
  }

  optionsFromArray() {
    let options = '';
    this.languages.forEach((language) => {
      options += `<option value="${language}">${language}</option>`
    });
    return options;
  }
}

module.exports = GDPR;