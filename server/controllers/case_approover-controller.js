const admin = require("firebase-admin");

// database -> firestore
const db = admin.firestore();

exports.case_approove = async (req, res) => {
  console.log(req.body, " => req body from approove =>>>>> ->>>>");
  const docId = req.body.docId;

  if (!docId) {
    res.json({
      message: "NO DOC ID FROM CASE_APPROOVE CONTROLLER ",
      approoved: false,
    });
    return;
  }

  const caseRef = await db.collection("problems").doc(docId);
  const _res = caseRef.set({ approoved: true }, { merge: true });

  _res
    .then((value) => {
      res.send({ approoved: "ok" });
    })
    .catch((err) => {
      console.log(" Error from approove ");
      res.send({ approoved: false });
    });
};
