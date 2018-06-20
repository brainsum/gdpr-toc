var Language = {};

Language.get = function(phrase, lang) {
  lang = lang.toLowerCase();
  if(typeof languages[lang] !== 'undefined') {
    if(typeof languages[lang][phrase] !== 'undefined') {
      return languages[lang][phrase];
    }
  } else if(typeof languages['en'] !== 'undefined') {
    if(typeof languages['en'][phrase] !== 'undefined') {
      return languages['en'][phrase];
    }
  }

  return undefined
} 

const languages = {
  en: {
    accept: 'Accept',
    cookieNotice: "We use cookies to provide a better browsing experience and a more personalized service. We do not store any personal information. If you continue browsing, we consider accepting its use." 
  },
  hu: {
    accept: 'Elfogadom',
    cookieNotice: "Az oldal sütiket használ a jobb böngészési élmény és a személyre szabottabb szolgáltatások érdekében. Személyes adatokat nem tárolunk. Ha folytatja a böngészést, az esetben fontolóra vesszük ezek használatát." 
  }
};

export default Language;