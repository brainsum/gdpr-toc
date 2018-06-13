const fs = require("fs");
const path = require('path');
const scrapeIt = require("scrape-it");


class GDPR {

  constructor(url, languages) {
    this.url = url;
    this.languages = languages;
    this.structuredEnData = {};
    this.names = {
      EN: {
        chapter:'chapter',
        section:'section',
        article:'article'
      },
      DE: {
        chapter:'kapitel',
        section:'abschnitt',
        article:'artikel'
      },
      HU: {
        chapter:'fejezet',
        section:'szakasz',
        article:'cikk'
      },
      BG: {
        chapter:'глава',
        section:'раздел',
        article:'член'
      },
      ES: {
        chapter:'capítulo',
        section:'sección',
        article:'artículo'
      },
      CS: {
        chapter:'kapitola',
        section:'oddíl',
        article:'článek'
      },
      DA: {
        chapter:'kapitel',
        section:'afdeling',
        article:'artikel'
      },
      ET: {
        chapter:'peatükk',
        section:'jagu',
        article:'artikkel'
      },
      EL: {
        chapter:'κεφαλαιο',
        section:'τμήμα',
        article:'άρθρο'
      },
      FR: {
        chapter:'chapitre',
        section:'section',
        article:'article'
      },
      GA: {
        chapter:'caibidil',
        section:'roinn',
        article:'airteagal'
      },
      HR: {
        chapter:'poglavlje',
        section:'odjeljak',
        article:'članak'
      },
      IT: {
        chapter:'capo',
        section:'sezione',
        article:'articolo'
      },
      LV: {
        chapter:'nodaļa',
        section:'iedaļa',
        article:'pants'
      },
      LT: {
        chapter:'skyrius',
        section:'skirsnis',
        article:'straipsnis'
      },
      MT: {
        chapter:'kapitolu',
        section:'taqsima',
        article:'artikolu'
      },
      NL: {
        chapter:'hoofdstuk',
        section:'afdeling',
        article:'artikel'
      },
      PL: {
        chapter:'rozdział',
        section:'sekcja',
        article:'artykuł'
      },
      PT: {
        chapter:'capítulo',
        section:'secção',
        article:'artigo'
      },
      RO: {
        chapter:'capitolul',
        section:'secțiunea',
        article:'articolul'
      },
      SK: {
        chapter:'kapitola',
        section:'oddiel',
        article:'článok'
      },
      SL: {
        chapter:'poglavje',
        section:'oddelek',
        article:'člen'
      },
      FI: {
        chapter:'luku',
        section:'jakso',
        article:'artikla'
      },
      SV: {
        chapter:'kapitel',
        section:'avsnitt',
        article:'artikel'
      }
    }
  }

  scrapeURL(url, language) {

    return new Promise((resolve, reject) => {
      
      // Scraping data
      scrapeIt('http://' + url, {
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
      }).then(({ data, response }) => {
        return (response.statusCode != 200) ? reject(response.statusCode) : resolve({data:data, language:language});
      })
    });
  }

  scrapeURLS() {

    return new Promise((resolve, reject) => {

      let scrapePromises = [];

      this.languages.forEach((language) => {
        let url = this.url.replace('{{lang}}', language);
        scrapePromises.push(this.scrapeURL(url, language));
      });

      Promise.all(scrapePromises).then((srapedDatas) => {
        return resolve(srapedDatas);
      }).catch((error) => {
        return reject(error);
      });
    });
  }

  structureScrapedData(scrapedData) {

    return new Promise((resolve, reject) => {
      
      // Combining the two lists as [{id,type,title}]
      let tocObject = [];
  
      for (let i = 0; i < scrapedData.data['sections'].length; i++) {
        let object = scrapedData.data['sections'][i];
        object.title = scrapedData.data['titles'][i].title;
  
        tocObject.push(object);
      }
  
      // Separating list based on sections (Chapter, Section, Article)
      let chapterId = '';
      let sectionId = null;
      let structuredContent = {};
      structuredContent.language = scrapedData.language;
      structuredContent.chapters = {};
  
      for (let i = 0; i < tocObject.length; i++) {
        let type = tocObject[i].type;
        if(type.toLowerCase().indexOf(this.names[scrapedData.language].chapter) >= 0) {
          structuredContent.chapters[i] = {
            name : `${type} - ${tocObject[i].title}`,
            id: tocObject[i].id
          }
          chapterId = i;
          sectionId = null;
        } else if(type.toLowerCase().indexOf(this.names[scrapedData.language].section) >= 0) {
          sectionId = i;
          structuredContent.chapters[chapterId]['sections'] = structuredContent.chapters[chapterId]['sections'] || {};
          structuredContent.chapters[chapterId]['sections'][sectionId] = {
            name : `${type} - ${tocObject[i].title}`,
            id: tocObject[i].id
          };
        } else {
          if(sectionId) {
            structuredContent.chapters[chapterId].sections[sectionId]['articles'] = structuredContent.chapters[chapterId]['sections'][sectionId]['articles'] || {};
            structuredContent.chapters[chapterId].sections[sectionId]['articles'][i] = tocObject[i];
          } else {
            structuredContent.chapters[chapterId]['articles'] = structuredContent.chapters[chapterId]['articles'] || {};
            structuredContent.chapters[chapterId]['articles'][i] = tocObject[i];
          }
        }
      }

      if(structuredContent.language === 'EN') {
        this.structuredEnData.chapters = structuredContent.chapters;
      }

      resolve(structuredContent);
    });
  }

  structureScrapedDatas(scrapedDatas) {

    return new Promise((resolve, reject) => {

      let structurePromises = [];

      scrapedDatas.forEach((scrapedData) => {
        structurePromises.push(this.structureScrapedData(scrapedData));
      });

      Promise.all(structurePromises).then((structuredDatas) => {
        this.addEnglishTitles(structuredDatas);
        return resolve(structuredDatas);
      }).catch((error) => {
        return reject(error);
      });
    });
  }

  addEnglishTitles(structuredDatas) {
    let structuredDataEN = structuredDatas.filter(structuredData => structuredData.language === 'EN');

    structuredDatas.forEach((structuredData) => {
      
    });
  }

  createTOC(structuredData) {
    console.log(structuredData.language);
    return new Promise((resolve, reject) => {

      let href = `https://${this.url.replace('{{lang}}', structuredData.language).replace('TXT/HTML', 'TXT')}`;

      // Converting the list to HTML
      let toclist = '<ul>\n';
  
      for (let chapterId in structuredData.chapters) {
        
        let chapter   = structuredData.chapters[chapterId];
        let chapterEN = this.structuredEnData.chapters[chapterId];
        toclist += `<li><a href="${href}#${chapter.id}" target="_blank" data-title-en="${chapterEN.name}">${chapter.name}</a>\n`;
          if(chapter.articles) {
            toclist += '<ul>\n';
            for (let articleId in chapter.articles) {
              let article   = chapter.articles[articleId];
              let articleEN = chapterEN.articles[articleId];

              toclist += `<li><a href="${href}#${article.id}" target="_blank" data-title-en="${articleEN.title} - (${articleEN.type})">${article.title} - (${article.type})</a></li>\n`;
            }
            toclist += '</ul>\n';
          }
          if(chapter.sections) {
            toclist += '<ul>\n';
            for (let sectionId in chapter.sections) {
              let section   = chapter.sections[sectionId];
              let sectionEN = chapterEN.sections[sectionId];
              toclist += `<li><a href="${href}#${section.id}" target="_blank" data-title-en="${sectionEN.name}">${section.name}</a>\n`;
              if(section.articles) {
                toclist += '<ul>\n';
                for (let articleId in section.articles) {
                  let article = section.articles[articleId];
                  let articleEN = sectionEN.articles[articleId];
                  
                  toclist += `<li><a href="${href}#${article.id}" target="_blank" data-title-en="${articleEN.title} - (${articleEN.type})">${article.title} - (${article.type})</a></li>\n`;
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
  
      resolve({language:structuredData.language, toclist:toclist});
    });
  }

  createTOCS(structuredDatas) {

    return new Promise((resolve, reject) => {

      let tocPromises = [];

      structuredDatas.forEach((structuredData,i) => {
        console.log(i)
        tocPromises.push(this.createTOC(structuredData));
      });

      Promise.all(tocPromises).then((tocContents) => {
        return resolve(tocContents);
      }).catch((error) => {
        return reject(error);
      });
    });
  }
  
}

module.exports = GDPR;