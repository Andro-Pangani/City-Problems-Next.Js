const fs = require("fs");
const path = require("path");

// - DATABASE -

const admin = require("firebase-admin");

//<=== - -.- - -.- - -.- - -.- -_   minimize   _- -.- - -.- - -.- - -.- - ===>=
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

// const gcstorage = new Storage()
var bucketName = "gs://deligation-40179.appspot.com";
var bucket = gcstorage.bucket(bucketName);

// - setting Current working directory path into _url variable
const _url = path.join(process.cwd(), "/uploads/");
// - google cloud storage bucket
function getPublicUrl(filename) {
  return `https://storage.googleapis.com/deligation-40179.appspot.com/${filename}`;
}

// function UploadToGCS();

// - functione return current date with offset
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

// - function returns path to current file
function tempDest(file_mimetype, filename) {
  console.log("############## mimetype", file_mimetype);
  switch (file_mimetype) {
    case "image/jpeg":
    case "image/png":
    case "image/jpg":
      return path.join(`${_url}images/`, filename);
    case "video/mp4":
      return path.join(`${_url}videos/`, filename);
    default:
      break;
  }
}

try {
  if (!fs.existsSync(_url)) {
    fs.mkdirSync(_url);
  }
  console.log("FOLDER EXIST");
} catch (err) {
  console.error(err, "#### error from checking if folders exist");
}

exports.content_uploading = async (req, res, next) => {
  console.log("user from upload --> -> ->", req.files, " <- <- <-");
  // console.log(
  //   req.files,
  //   " ---####### req.files FROM CONTENT UPLOADING #############"
  // );
  var files = req.files;

  var link = 0;
  var url = [];

  if (!req.files || req.files.length == 0) {
    res.json({
      message: "No files bro from FILE UPLOADING CONTROLLER",
    });
    return;
  }

  // ==========*========= SET UP EACH FILE =========*==========
  files
    ? files.forEach((file) => {
        // - getting each file path
        const tempLink = tempDest(file.mimetype, file.originalname);
        // - writing with stream to bucket
        var gcsfile = bucket.file(file.originalname);

        console.log("############ TEMP LINK FROM", tempLink, "-> file", file);
        let stream = fs.createReadStream(tempLink).pipe(
          gcsfile
            .createWriteStream({
              resumable: false,
              metadata: {
                contentType: file.mimetype,
              },
            })
            .on("finish", () => {
              // - deleting after file was uploaded
              console.log("############### GCS UPLOADING FINISHED ");
              fs.unlinkSync(tempLink);
            })
            .on("error", (error) => {
              console.log("############# ERROR FROM G_C_STORAGE ", error);
            })
        );
        stream.on("error", (err) => {
          console.log(
            "###??????????????????????????? Error from stream ",
            err,
            "temp Link => ",
            tempLink
          );
        });
        // ========*======== GET FILE URL WITH FUNCTION =========*==========
        file.storageUrl = getPublicUrl(file.originalname);
        var urlObj = {};

        // - if file is image (jpeg, png or jpeg) type = image ;)
        if (
          file.mimetype === "image/jpeg" ||
          file.mimetype === "image/png" ||
          file.mimetype === "image/jpg"
        ) {
          urlObj.type = "image";
          urlObj.link = file.storageUrl;
          urlObj.filename = file.originalname;
          link++;
          url.push(urlObj);
          switch (link) {
            case 1:
              req.body.url = url;
              break;
            case 2:
              req.body.url = url;
              break;
            case 3:
              req.body.url = url;
              break;
            default:
              break;
          }
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
          link++;
          url.push(urlObj);
          switch (link) {
            case 1:
              req.body.url = url;
              break;
            case 2:
              req.body.url = url;
              break;
            case 3:
              req.body.url = url;
              break;
            default:
              break;
          }
        }
        console.log("first-then");
        console.log(file.storageUrl, " - urls");
      })
    : null;
  // FILE OBJECT (type,name,storage-url) foreach finish

  var urls = req.body.url;

  var videoIndex = 0;

  var photoIndex = 0;

  var formatType;
  var _fVideo;
  var _fImage;

  // - here we set type of object for displayng to frontend
  urls
    ? urls.forEach((item) => {
        if (item.type === "image") {
          item.photo_link_index = 0;
          _fImage = true;
        }

        if (item.type === "video") {
          item.video_link_index = 0;
          _fVideo = true;
        }
      })
    : null;

  if (_fVideo === true && _fImage === true) {
    formatType = "mix";
  }
  if (!_fVideo) {
    formatType = "image";
  }
  if (!_fImage) {
    formatType = "video";
  }

  req.body.format_type = formatType;

  urls
    ? urls.forEach((item) => {
        if (item.type === "image") {
          photoIndex += 1;
          item.photo_link_index = photoIndex;
        }

        if (item.type === "video") {
          videoIndex += 1;
          item.video_link_index = videoIndex;
        }
      })
    : null;

  var uploadDate = currentTime();
  urls
    ? db
        .collection("problems")
        .add({
          upload_date: uploadDate,
          type: req.body.type,
          address: req.body.address,
          description: req.body.description,
          Url: urls,
          coords: {
            lat: req.body.latitude ? parseFloat(req.body.latitude) : "",
            lng: req.body.longitude ? parseFloat(req.body.longitude) : "",
          },
          format_type: req.body.format_type,
          time: new Date().getTime(),
          approoved: false,
          alternative: {
            approoved: false,
            data: {
              files: null,
              description: null,
            },
          },
        })
        .then((result) => {
          console.log(" id > ", result.id, " Result After Uploading ");

          let lastSnapshot = undefined;
          db.collection("problems")
            .orderBy("time", "desc")
            .limit(2)
            .get()
            .then((snapshot) => {
              let array1 = [];
              let data;

              lastSnapshot = snapshot.docs.length - 1;
              let mark = snapshot.docs[lastSnapshot];
              if (mark) {
                mark = mark.data().time;
              }

              snapshot.forEach((doc) => {
                data = doc.data();
                data.id = doc.id;
                array1.push(data);
              });

              res.json({ content: array1, lastSnapshot: mark, uploaded: true });
            })
            .catch((err) => {
              console.log(err, "*** err from Get after uploading ;)");
            });
        })
        .catch((err) => {
          console.log("Error from File uploading", err);
        })
    : res.send("sorry file could not be uploaded");
};
