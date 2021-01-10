const fs = require("fs");
const path = require("path");
const multer = require("multer");

const admin = require("firebase-admin");

const db = admin.firestore();

// Imports the Google Cloud client library Storage.
const { Storage } = require("@google-cloud/storage");

var mail = require("../keys/keys").mail;
var privateKey = require("../keys/keys").privateKey;

// PUBLIC SERVER KEY SETUP * * DONT DELETE
const gcstorage = new Storage({
  projectId: "deligation-40179",
  credentials: {
    client_email: mail,
    private_key: privateKey.replace(/\\n/g, "\n"),
  },
});

var bucketName = "gs://deligation-40179.appspot.com";
var bucket = gcstorage.bucket(bucketName);

// - google cloud storage bucket
function getPublicUrl(filename) {
  return `https://storage.googleapis.com/deligation-40179.appspot.com/${filename}`;
}

// - setting Current working directory path into _url variable
const filesTempFolder = path.join(process.cwd(), "/uploads/");

// - function returns path to current file
function tempDest(filename) {
  return path.join(filesTempFolder, filename);
}

// function UploadToGCS();

try {
  if (!fs.existsSync(filesTempFolder)) {
    fs.mkdirSync(filesTempFolder);
  }
  console.log("FOLDER EXIST");
} catch (err) {
  console.error(err);
}

function currentTime() {
  var monthArray = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ];

  var tbilisiOffset = 480 * 60000;
  const _globaldate = new Date();
  const date = new Date(_globaldate - tbilisiOffset);
  var minutes = date.getMinutes();
  var hour = date.getHours();
  var day = date.getDate();
  var month = date.getMonth();
  var year = date.getFullYear();

  if (minutes < 10) minutes = `0${minutes}`;
  var uploadDate = `${day} ${monthArray[month]} ${year} ${hour}:${minutes}`;
  return uploadDate;
}

const alternativeUpload = require("./alternative-actions/alternative-upload")
  .alternativeUpload;
const singleDelete = require("./alternative-actions/alternative-single_delete")
  .singleDelete;
const alternativeApproove = require("./alternative-actions/alternative-single_approove")
  .singleApproove;

module.exports = {
  alternativeApproove,
  singleDelete,
  alternativeUpload,
};
