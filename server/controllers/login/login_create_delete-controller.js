const admin = require("firebase-admin");

const db = admin.firestore();

exports.admin_create = async (req, res) => {
  const { name, password } = req.body;

  await db
    .collection("administrators")
    .add({
      name: name,
      password: password,
      status: "admin",
    })
    .then((result) => {
      res.json({
        message: "success",
      });
    })
    .catch((error) => {
      console.log(error, " ######## ERROR FROM CREATE NEW ADMIN");
      res.json({
        message: error,
      });
    });
};

exports.admin_delete = async (req, res) => {
  const { id } = req.body;

  await db
    .collection("administrators")
    .doc(id)
    .delete()
    .then((result) => {
      res.json({
        message: "success",
      });
    })
    .catch((error) => {
      res.json({
        message: error,
      });
    });
};
