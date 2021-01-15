'use strict';

const Translator = require('../components/translator.js');

module.exports = function(app) {

  const translator = new Translator();
  const valid_locales = ['american-to-british', 'british-to-american'];

  app.route('/api/translate')
    .post((req, res) => {
      if (req.body.hasOwnProperty('text') &&
        req.body.hasOwnProperty('locale')) {
        if (req.body.text === '') {
          res.json({error: 'No text to translate'});
        } else if (!valid_locales.includes(req.body.locale)) {
          res.json({error: 'Invalid value for locale field'});
        } else {
          translator.setText(req.body.text);
          translator.setLocale(req.body.locale);
          translator.translate();
          console.log(translator.toString());
          res.json({
            'text': translator.text,
            'translation': translator.translation,
          });
        }
      } else {
        res.json({'error': 'Required field(s) missing'});
      }
    });
};
