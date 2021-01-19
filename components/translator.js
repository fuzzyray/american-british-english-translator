const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require('./american-to-british-titles.js');
const britishOnly = require('./british-only.js');

// Reverse the key and value for an object and return the resulting object
const reverseDictionary = (dictObj) => {
  const reverseDict = {};
  Object.keys(dictObj).forEach((key) => {
    reverseDict[dictObj[key]] = key;
  });
  return reverseDict;
};

// Create an array of dictionary objects with keys containing multiple words first
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

const americanToBritishWords = createDictionary(americanOnly);
const britishToAmericanWords = createDictionary(britishOnly);
const britishToAmericanSpelling = reverseDictionary(americanToBritishSpelling);
const britishToAmericanTitles = reverseDictionary(americanToBritishTitles);

class Translator {
  constructor(text = null, locale = null) {
    this.text = text;
    this.locale = locale;
    this.translation = null;
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
    let myDict = [];
    let mySpelling = {};
    let myTitles = {};
    let myTimeRegEx;
    let newTimeDelimeter;

    translatedText = this.text;

    if (this.locale === 'american-to-british') {
      myDict = americanToBritishWords;
      mySpelling = americanToBritishSpelling;
      myTitles = americanToBritishTitles;
      myTimeRegEx = /(\d+):(\d+)/;
      newTimeDelimeter = '.';
    } else if (this.locale === 'british-to-american') {
      myDict = britishToAmericanWords;
      mySpelling = britishToAmericanSpelling;
      myTitles = britishToAmericanTitles;
      myTimeRegEx = /(\d+)\.(\d+)/;
      newTimeDelimeter = ':';
    }

    // Translate words
    myDict.forEach((obj) => {
      const key = Object.keys(obj).join('');
      const re = new RegExp(`(\\W+|^)${key}(\\W+|$)`, 'ig');
      translatedText = translatedText.replace(re, `$1${obj[key]}$2`);
    });

    // Change spelling and titles
    [mySpelling, myTitles].forEach((obj) => {
      Object.keys(obj).forEach((key) => {
        const re = new RegExp(`(\\W+|^)${key}(\\W+|$)`, 'ig');
        translatedText = translatedText.replace(re, `$1${obj[key]}$2`);
      });
    });

    // Change clock format
    translatedText = translatedText.replace(myTimeRegEx, `$1${newTimeDelimeter}$2`);

    this.translation = translatedText;
  }

  toString() {
    return JSON.stringify(this);
  }
}

module.exports = Translator;
