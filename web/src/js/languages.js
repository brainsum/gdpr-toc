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
    cookieNotice: "Az oldal sütiket használ a jobb böngészési élmény és szolgáltatások érdekében. Amennyiben folytatja a böngészést, abban az esetben beleegyezik, hogy használjuk ezeket." 
  },
  sk: {
    accept: 'Akceptujem',
    iUnderstand: 'Súhlasím',
    cookieNotice: "Nasa stránka používa cookies, ktoré nám pomáhajú zabezpečiť lepšie služby. Ak budete pokračovať v prehliadaní tejto stránky, súhlasíte s použitím cookies." 
  }
};

export default Language;