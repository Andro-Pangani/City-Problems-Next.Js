const main = require("./main_route-controller").main;
const aqi = require("./aqi-controller").aqi;
const delete_case = require("./delete_case-controller").delete_case;
const alternative = require("./alternative-controller");
const authentication = require("./auth-controller").auth;
const content_uploading = require("./content_uploading-controller")
  .content_uploading;

const case_approove = require("./case_approover-controller").case_approove;

exports.main = main;
exports.delete_case = delete_case;
exports.aqi = aqi;

exports.alternativeSingleApproove = alternative.alternativeApproove;
exports.alternativeSingleDelete = alternative.singleDelete;
exports.alternativeUpload = alternative.alternativeUpload;
exports.authentication = authentication;
exports.content_uploading = content_uploading;
exports.case_approove = case_approove;
