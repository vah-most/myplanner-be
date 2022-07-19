/*
 * Created on Tue Jul 19 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

module.exports = {
  SUCCESS: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
};

module.exports.errorMessageInvalid = function (name) {
  return `Invalid ${name}`;
};

module.exports.errorMessageNotFound = function (name) {
  return `${name} Not Found.`;
};
