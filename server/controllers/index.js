const main = require("./main_route-controller").main;
const unverified = require("./unverified_content-controller")
  .unverified_case_controller;
const aqi = require("./aqi-controller").aqi;
const delete_case = require("./delete_case-controller").delete_case;
const alternative = require("./alternative-controller");

// admin =>
const login = require("./login/login-controller").login;
const logout = require("./login/logout_user-controller").logout_user;
const login_get = require("./login/login_get-controller").login_get;
const get_all_admins = require("./login/login_getAllAdmins-controller")
  .getAllAdmins;
const change_credentials = require("./login/login_change_credentials-controller");

const adminCreator = require("./login/login_create_delete-controller");

// <==

const content_uploading = require("./content_uploading-controller")
  .content_uploading;

const case_approove = require("./case_approover-controller").case_approove;

const getSingleCase = require("./getSingleCase-controller").getSingleCase;

exports.main = main;
exports.unverified = unverified;
exports.getSingleCase = getSingleCase;
exports.delete_case = delete_case;
exports.aqi = aqi;

exports.alternativeSingleApproove = alternative.alternativeApproove;
exports.alternativeSingleDelete = alternative.singleDelete;
exports.alternativeUpload = alternative.alternativeUpload;
exports.content_uploading = content_uploading;
exports.case_approove = case_approove;

exports.logout = logout;
exports.login = login;
exports.login_get = login_get;
exports.get_all_admins = get_all_admins;
exports.adminCreator = adminCreator;

exports.admin_change_name = change_credentials.change_name;
exports.admin_change_password = change_credentials.change_password;
