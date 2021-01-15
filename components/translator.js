const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require('./american-to-british-titles.js');
const britishOnly = require('./british-only.js');

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
    this.translation = 'not implemented'
  }

  toString() {
    return JSON.stringify(this)
  }
}


module.exports = Translator;