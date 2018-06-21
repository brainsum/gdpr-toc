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
    iUnderstand: 'I Understand',
    cookieNotice: "We use cookies to provide a better browsing experience and service. If you continue browsing, You agree to our use of cookies." 
  },
  hu: {
    accept: 'Elfogadom',
    iUnderstand: 'Megértettem',
    cookieNotice: "Az oldal sütiket használ a jobb böngészési élmény és szolgáltatások érdekében. Ha folytatja a böngészést, az esetben beleegyezik, hogy használjuk ezeket a sütiket." 
  }
};

export default Language;