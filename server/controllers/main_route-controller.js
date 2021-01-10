const admin = require("firebase-admin");

const db = admin.firestore();

exports.main = async function (req, res) {
  var array1 = [];
  var data = "";

  var queryLastSnapshot =
    req.query.lastSnapshot == "null" ? null : parseInt(req.query.lastSnapshot);

  var mainData = undefined;

  if (!queryLastSnapshot) {
    mainData = db.collection("problems").orderBy("time", "desc").limit(3);
  } else {
    mainData = db
      .collection("problems")
      .orderBy("time", "desc")
      .startAfter(queryLastSnapshot)
      .limit(3);
  }

  var lastSnapshot = undefined;

  mainData
    .get()
    .then((snapshot) => {
      lastSnapshot = snapshot.docs.length - 1;

      let mark = snapshot.docs[lastSnapshot];
      if (mark) {
        mark = mark.data().time;
        console.log(
          "<<<<< <<<<<<<< <<<<< Same Snapshot <<< <<< <<<<<< query >",
          queryLastSnapshot,
          " <-> mark > ",
          mark
        );
      } else if (snapshot.docs.length === 0) {
        console.log("Mark length <<< <<< <<< ", snapshot.docs.length);
        res.json({ content: [], lastSnapshot: queryLastSnapshot });
        return;
      }

      snapshot.forEach((doc) => {
        data = doc.data();
        data.id = doc.id;
        array1.push(data);
      });
      res.json({ content: array1, lastSnapshot: mark });
    })
    .catch((err) => {});

  // res.render('main', { airdata })
};
