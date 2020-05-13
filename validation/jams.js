const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateJamInput(data) {
  let errors = {};

  data.name = validText(data.name) ? data.name : '';

  if (!Validator.isLength(data.name, { min: 5, max: 100 })) {
    errors.name = 'Name must be between 5 and 100 characters';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Jam Name field is required';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};