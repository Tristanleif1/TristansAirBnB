<<<<<<< HEAD
const { validationResult } = require("express-validator");
=======
// backend/utils/validation.js
const { validationResult } = require('express-validator');
>>>>>>> d649e5dac628e4ccb4eb8481adcb57a47de16ee5

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = {};
    validationErrors
      .array()
<<<<<<< HEAD
      .forEach((error) => (errors[error.param] = error.msg));
=======
      .forEach(error => errors[error.param] = error.msg);
>>>>>>> d649e5dac628e4ccb4eb8481adcb57a47de16ee5

    const err = Error("Bad request.");
    err.errors = errors;
    err.status = 400;
    err.title = "Bad request.";
    next(err);
  }
  next();
};

module.exports = {
<<<<<<< HEAD
  handleValidationErrors,
=======
  handleValidationErrors
>>>>>>> d649e5dac628e4ccb4eb8481adcb57a47de16ee5
};
