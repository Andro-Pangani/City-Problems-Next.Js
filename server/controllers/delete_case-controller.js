const admin = require("firebase-admin");
const db = admin.firestore();

const mail = require("../keys/keys").mail;
const privateKey = require("../keys/keys").privateKey.replace(/\\n/g, "\n");

//storage -> Google Cloud Storeage
const { Storage } = require("@google-cloud/storage");

const gcstorage = new Storage({
  projectId: "deligation-40179",
  credentials: {
    client_email: mail,
    private_key: privateKey,
  },
});

// const gcstorage = new Storage()
const bucketName = "gs://deligation-40179.appspot.com";
const bucket = gcstorage.bucket(bucketName);

exports.delete_case = async (req, res, next) => {
  // RECIVES
  //  {
  //    docId: :string,
  //    links: [...]
  // }
  var props = req.body;
  var docId = "nothing";
  var links = [];

  // SETS FIREBASE DOC ID*
  // IF EXISTS
  for (var item in props) {
    if (item === "docId") {
      docId = props[item];
    } else {
      // SETS FIRESTORE FILE LINKS
      // TO ARRAY
      links.push(props[item]);
    }
  }

  console.log("******** LINKS => ", links);

  // DELETES FILES
  // FROM FIRESTORE
  links.forEach((item) => {
    var file = bucket.file(item);
    if (file) {
      file
        .delete()
        .then(() => {
          // console.log(item, " deleted");
        })
        .catch((err) => {
          console.log(
            " -**********  Error HANDLER ******* - ",
            "######### From Files Deletion"
          );
        });
    } else {
      console.log("- FILE DOESNT EXIST - FROM DELETE CONTROLLER");
      res.json({
        message: "No such file bro",
      });
    }
  });

  // DELETES FROM FIREBASE
  db.collection("problems")
    .doc(docId)
    .delete()
    .then((val) => {
      console.log("success db deleting");
      res.send({ deleted: true });
    })
    .catch((err) => {
      console.log(err, " Error Deletion From Database ");
      res.send({ deleted: false });
    });
};
