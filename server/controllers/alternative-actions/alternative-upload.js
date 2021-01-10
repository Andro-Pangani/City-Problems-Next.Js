const admin = require("firebase-admin");
const db = admin.firestore();
const path = require("path");
const fs = require("fs");
// Imports the Google Cloud client library Storage.
const { Storage } = require("@google-cloud/storage");

var mail = require("../../keys/keys").mail;
var privateKey = require("../../keys/keys").privateKey;

// PUBLIC SERVER KEY SETUP * * DONT DELETE
const gcstorage = new Storage({
  projectId: "deligation-40179",
  credentials: {
    client_email: mail,
    private_key: privateKey.replace(/\\n/g, "\n"),
  },
});

// const gcstorage = new Storage()
var bucketName = "gs://deligation-40179.appspot.com";
var bucket = gcstorage.bucket(bucketName);

function getPublicUrl(filename) {
  return `https://storage.googleapis.com/deligation-40179.appspot.com/${filename}`;
}

function tempDest(filename) {
  return path.join(filesTempFolder, filename);
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

const filesTempFolder = path.join(process.cwd(), "/uploads/");

// C O N T R O L L E R --------------------

exports.alternativeUpload = async (req, res) => {
  // in case AlternativeData already exists
  let prevAlternativeFiles = undefined;

  if (req.body.hasAlternative === "true") {
    const problemsRef = db.collection("problems").doc(req.body.id);
    const doc = await problemsRef.get();

    if (!doc.exists) {
      console.log(doc, "No matching documents");
      return;
    }

    // pushing new files into previous collection if it exists
    prevAlternativeFiles = doc.data().alternative.data.files;
  }

  var files = req.files;
  var url = prevAlternativeFiles ? prevAlternativeFiles : [];

  // ==========*========= SET UP EACH FILE =========*==========
  let link = 0;
  files
    ? files.forEach((file) => {
        // - getting each file path
        const tempLink = tempDest(file.originalname);
        // - writing with stream to bucket
        var gcsfile = bucket.file(file.originalname);

        fs.createReadStream(tempLink).pipe(
          gcsfile
            .createWriteStream({
              metadata: {
                contentType: file.mimetype,
              },
            })
            .on("finish", () => {
              // - deleting after file was uploaded
              fs.unlinkSync(tempLink);
            })
            .on("error", () => {
              fs.unlinkSync(tempLink);
            })
        );
        // ========*======== GET FILE URL WITH FUNCTION =========*==========
        file.storageUrl = getPublicUrl(file.originalname);
        var urlObj = {};
        let fileId = new Date().getTime();
        console.log(fileId, " ************************ >>>> file Id");
        // - if file is image (jpeg, png or jpeg) type = image ;)
        if (
          file.mimetype === "image/jpeg" ||
          file.mimetype === "image/png" ||
          file.mimetype === "image/jpg"
        ) {
          urlObj.type = "image";
          urlObj.link = file.storageUrl;
          urlObj.filename = file.originalname;
          urlObj.fileId = fileId;
          urlObj.approoved = false;
          link++;
          url.push(urlObj);
          req.body.url = url;
        } else if (
          file.mimetype === "video/mp4" ||
          file.mimetype === "video/MP2T" ||
          file.mimetype === "video/x-ms-wmv" ||
          file.mimetype === "video/x-msvideo" ||
          file.mimetype === "video/3gpp" ||
          file.mimetype === "video/mp4"
        ) {
          urlObj.type = "video";
          urlObj.link = file.storageUrl;
          urlObj.filename = file.originalname;
          urlObj.fileId = fileId;
          urlObj.approoved = false;
          link++;
          url.push(urlObj);
          req.body.url = url;
        }
      })
    : null;
  console.log(req.body.url, " Urrrls");

  // FILE OBJECT (type,name,storage-url) foreach finish
  var uploadDate = currentTime();
  db.collection("problems")
    .doc(req.body.id)
    .set(
      {
        upload_date: uploadDate,
        alternative: {
          approoved: false,
          data: {
            files: req.body.url,
            description: req.body.description,
          },
        },
      },
      { merge: true }
    )
    .then(() => {
      res.send({ uploaded: true });
    })
    .catch((err) => {
      console.log("Error from alternative uploading ", err);
      res.send({
        uploaded: false,
        alternativeUploaded: err,
      });
    });
};
