const { query } = require("express");
const admin = require("firebase-admin");

const db = admin.firestore();

exports.main = async function (req, res) {
  var array1 = [];
  var data = "";

  console.log(
    "********** REQ QUERIES FROM MAIN CONTROLLER ",
    req.query,
    " ************* "
  );

  let length = parseInt(req.query.length);
  let empty = req.query.empty;
  var queryLastSnapshot =
    req.query.lastSnapshot == "null" ? null : parseInt(req.query.lastSnapshot);

  // var docId = parseInt(req.query.docId);

  var mainData = undefined;

  // SINGLE CASE REQUEST FROM FACEBOOK
  if (empty === "true") {
    mainData = db.collection("problems").orderBy("time", "desc").limit(length);
  } else if (!queryLastSnapshot) {
    // FIRST DATA REQUEST
    mainData = db.collection("problems").orderBy("time", "desc").limit(3);
  } else {
    // REQUEST FROM SCROLL EVENT
    mainData = db
      .collection("problems")
      .orderBy("time", "desc")
      .startAfter(queryLastSnapshot)
      .limit(3);
  }

  var prevSnapshot = queryLastSnapshot;
  var lastSnapshot = undefined;

  mainData
    .get()
    .then((snapshot) => {
      lastSnapshot = snapshot.docs.length - 1;

      // SINGLE REQUEST FROM FACEBOOK
      if (empty === "true") {
        length = snapshot.docs.length;
      }
      //FIRST MAIN REQUEST
      else if (!queryLastSnapshot) {
        length = snapshot.docs.length;
      } else {
        // REQUEST FROM SCROLL EVENT
        length = length + snapshot.docs.length;
      }

      let mark = snapshot.docs[lastSnapshot];

      if (mark) {
        mark = mark.data().time;
      } else if (snapshot.docs.length === 0) {
        console.log("######## DOCS LENGTH ####  ####  ", snapshot.docs.length);
        res.json({
          content: [],
          lastSnapshot: queryLastSnapshot,
          prevSnapshot: prevSnapshot,
          length: length,
        });
        return;
      }

      snapshot.forEach((doc) => {
        data = doc.data();
        data.id = doc.id;
        array1.push(data);
      });

      console.log(
        "||||||||||||||||| FINAL LENGTH ||||||||",
        length,
        mark,
        prevSnapshot
      );
      res.json({
        content: array1,
        lastSnapshot: mark,
        prevSnapshot: prevSnapshot,
        length: length,
      });
    })
    .catch((err) => {});

  // res.render('main', { airdata })
};
