const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateRoomInput(data) {
  let errors = {};

  data.text = validText(data.text) ? data.text : '';

  if (!Validator.isLength(data.text, { min: 5, max: 100 })) {
    errors.text = 'Room must be between 5 and 100 characters';
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = 'Text field is required';
  }
  // possibly add a validation where the number of members is capped at 4
  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};