const admin = require("firebase-admin");

const db = admin.firestore();

exports.getSingleCase = async function (req, res) {
  const docId = req.query.docId;

  const docRef = db.collection("problems").doc(docId);

  const doc = docRef
    .get()
    .then((snapshot) => {
      console.log(
        "#### SERVER ##### snapshot ",
        snapshot.data(),
        " ***** SERVER **** end "
      );
      res.json({
        data: snapshot.data(),
      });
    })
    .catch((err) => {
      res.json({
        data: null,
        message: "no data from single case controller",
      });
    });
};
