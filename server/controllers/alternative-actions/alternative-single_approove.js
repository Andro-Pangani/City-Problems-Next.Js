const admin = require("firebase-admin");
const db = admin.firestore();

exports.singleApproove = async (req, res, next) => {
  console.log(req.body, " body from alt single actions >>>> ");

  if (!req.body.id) {
    console.log("Sorry bro no document id from single approove");
    res.json({
      massage: "no document id ",
    });
  } else {
    const docRef = await db.collection("problems").doc(req.body.id);
    try {
      const doc = await docRef.get();
      let files = undefined;
      if (!doc.exists) {
        console.log(" No Such Document");
      } else {
        files = doc.data().alternative.data.files;
        files.map((file) => {
          if (file.fileId === req.body.fileId) {
            file.approoved = true;
          }
        });
        console.log(files, " checked");
      }

      await docRef.set(
        {
          alternative: {
            data: {
              files: files,
            },
          },
        },
        { merge: true }
      );
      console.log(" after set");
    } catch (err) {
      console.log(err);
      res.json({
        message: "Not valid data was send bro",
      });
    }
    console.log(" after set");

    res.send({ hey: "from singleApproove" });
  }
  console.log("Even now it comes down");
};
