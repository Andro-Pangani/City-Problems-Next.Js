const admin = require("firebase-admin");

const db = admin.firestore();

exports.getAllAdmins = async (req, res) => {
  const { id } = req.body;
  const admins = [];

  console.log("########## req body id FROM ", id);

  db.collection("administrators")
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        if (doc.id !== id) {
          let admin = doc.data();

          let resAdmin = {
            name: admin.name,
            id: doc.id,
            status: admin.status,
          };

          admins.push(resAdmin);
        }
      });

      res.json({
        data: {
          admins,
          error: "",
        },
      });
      // end of foreach
    })
    .catch((err) => {
      console.log(err, "######## ERROR FROM GETALLADMINS");
      res.json({
        data: {
          admins: [],
          error: err,
        },
      });
    });
};
