const admin = require("firebase-admin");

const db = admin.firestore();

exports.unverified_case_controller = async function (req, res, next) {
  console.log(" From uverified data controller", req.body, req.cookies.user);

  var logged = false;
  if (req.cookies.user) {
    logged = req.cookies.user ? req.cookies.user.logged : false;
  }

  if (logged) {
    let mainData = undefined;
    let array1 = [];
    mainData = db
      .collection("problems")
      .where("approoved", "==", false)
      .orderBy("time", "desc");

    mainData
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          data = doc.data();
          data.id = doc.id;

          array1.push(data);
        });

        res.json({
          content: array1,
        });
      })
      .catch((err) => {
        console.log(err, " <<<<<<<< error from main route controller");
      });
  } else {
    res.json({
      content: [],
    });
  }
};
