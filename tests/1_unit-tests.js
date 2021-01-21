const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
const testCases = require('../components/unitTestDefinitions.js');

suite('Unit Tests', () => {
  const translator = new Translator();

  testCases.forEach((unitTest) => {
    test(unitTest.text, () => {
      translator.setText(unitTest.text);
      translator.setLocale(unitTest.locale);
      translator.translate();
      console.log(translator.toString());
      assert.equal(translator.translation, unitTest.translation);
    });
  });

});
