const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateRoomInput(data) {
  let errors = {};

  data.name = validText(data.name) ? data.name : '';
  
  if (!Validator.isLength(data.name, { min: 5, max: 100 })) {
    errors.name = 'Room must be between 5 and 100 characters';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Room name field is required';
  }
  // possibly add a validation where the number of members is capped at 4
  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};