const admin = require("firebase-admin");
// database -> firestore
const db = admin.firestore();
//storage -> Google Cloud Storeage
const { Storage } = require("@google-cloud/storage");
// keys for firebase
var mail = require("../../keys/keys").mail;
var privateKey = require("../../keys/keys").privateKey;
var FIREBASE_CLIENT_EMAIL = mail;
var FIREBASE_PRIVATE_KEY = privateKey;

const gcstorage = new Storage({
  projectId: "deligation-40179",
  credentials: {
    client_email: FIREBASE_CLIENT_EMAIL,
    private_key: FIREBASE_PRIVATE_KEY,
  },
});

// const gcstorage = new Storage()
var bucketName = "gs://deligation-40179.appspot.com";
var bucket = gcstorage.bucket(bucketName);

exports.singleDelete = async (req, res) => {
  console.log(req.body, " alt single deletion body");
  var docId = req.body.docId;

  var file = bucket.file(req.body.filename);
  if (file) {
    file
      .delete()
      .then(() => {
        console.log(" deleted Alternative single delete");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  console.log("after Files deletion", docId, " => ");

  let prevFilesCollection = undefined;
  let currentFilesCollection = null;
  const docRef = db.collection("problems").doc(docId);

  await docRef
    .get()
    .then((doc) => {
      prevFilesCollection = doc.data().alternative.data.files;
      currentFilesCollection = prevFilesCollection.filter((item) => {
        if (req.body.fileId !== item.fileId) {
          return item;
        }
        return null;
      });

      // at Front End {alternative: data: files = [null] or [full array not empty]}
      currentFilesCollection =
        currentFilesCollection.length === 0 ? null : currentFilesCollection;
      console.log(
        currentFilesCollection,
        " currentFilesCollection <<<<<<<<<<<<<<<<<<<<<<<",
        req.body.fileId
      );
      console.log("success db deleting from Alternative Single deletion");
    })
    .catch((err) => {
      console.log(err, "error from ALTERNATIVE SINGLE DELETION ");
    });

  await docRef
    .set(
      {
        alternative: {
          data: {
            files: currentFilesCollection,
          },
        },
      },
      { merge: true }
    )
    .then((response) => {
      console.log(response, " Response from Set");
      res.send({ deleted: true });
    });
};
