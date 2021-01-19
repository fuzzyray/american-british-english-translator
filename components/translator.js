const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require('./american-to-british-titles.js');
const britishOnly = require('./british-only.js');

let americanToBritish = [];
let britishToAmerican = [];

const createDictionary = (dictObj) => {
  const multiWord = [];
  const singleWord = [];
  Object.keys(dictObj).forEach((key) => {
    const wordObj = {};
    wordObj[key] = dictObj[key];
    if (key.split(/\s/).length > 1) {
      multiWord.push(wordObj);
    } else {
      singleWord.push(wordObj);
    }
  });
  return [].concat(multiWord, singleWord);
};

class Translator {
  constructor(text = null, locale = null) {
    this.text = text;
    this.locale = locale;
    this.translation = null;
    americanToBritish = createDictionary(americanOnly)
    britishToAmerican = createDictionary(britishOnly)
  }

  setText(text) {
    if (!!text) {
      this.text = text;
    }
  }

  setLocale(locale) {
    if (!!locale) {
      this.locale = locale;
    }
  }

  translate() {
    let translatedText = this.text;
    let myDict;
    translatedText = this.text;
    if (this.locale === 'american-to-british') {
      myDict = americanToBritish;
    } else if (this.locale === 'british-to-american') {
      myDict = britishToAmerican;
    }
    myDict.forEach((obj) => {
      const key = Object.keys(obj).join('')
      const re = new RegExp(`(\\s+|^)${key}(\\s+|$)`, 'ig');
      translatedText = translatedText.replace(re, `$1${obj[key]}$2`);
    });
    this.translation = translatedText;
  }

  toString() {
    return JSON.stringify(this);
  }
}

module.exports = Translator;
