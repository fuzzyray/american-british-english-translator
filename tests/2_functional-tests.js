const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {

  test('Translation with text and locale fields: POST request to /api/translate', (done) => {
    const text = 'Mangoes are my favorite fruit.';
    const locale = 'american-to-british';
    const output = {
      text: 'Mangoes are my favorite fruit.',
      translation:
        'Mangoes are my <span class="highlight">favourite</span> fruit.',
    };
    chai
      .request(server)
      .post('/api/translate')
      .send({ text: text, locale: locale })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.deepEqual(res.body, output);
        done();
      });
  });

  test('Translation with text and invalid locale field: POST request to /api/translate', (done) => {
    const text = 'Mangoes are my favorite fruit.';
    const locale = 'russian-to-spanish';
    const output = { error: 'Invalid value for locale field' };
    chai
      .request(server)
      .post('/api/translate')
      .send({ text: text, locale: locale })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.deepEqual(res.body, output);
        done();
      });
  });

  test('Translation with missing text field: POST request to /api/translate', (done) => {
    const locale = 'american-to-british';
    const output = { error: 'Required field(s) missing' };
    chai
      .request(server)
      .post('/api/translate')
      .send({ locale: locale })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.deepEqual(res.body, output);
        done();
      });
  });

  test('Translation with missing locale field: POST request to /api/translate', (done) => {
    const text = 'Mangoes are my favorite fruit.';
    const output = { error: 'Required field(s) missing' };
    chai
      .request(server)
      .post('/api/translate')
      .send({ text: text })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.deepEqual(res.body, output);
        done();
      });
  });

  test('Translation with empty text: POST request to /api/translate', (done) => {
    const text = '';
    const locale = 'american-to-british';
    const output = { error: 'No text to translate' };
    chai
      .request(server)
      .post('/api/translate')
      .send({ text: text, locale: locale })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.deepEqual(res.body, output);
        done();
      });
  });

  test('Translation with text that needs no translation: POST request to /api/translate', (done) => {
    const text = 'Hello from England.';
    const locale = 'british-to-american';
    const output = {
      text: 'Hello from England.',
      translation: 'Everything looks good to me!',
    };
    chai
      .request(server)
      .post('/api/translate')
      .send({ text: text, locale: locale })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.deepEqual(res.body, output);
        done();
      });
  });
});
