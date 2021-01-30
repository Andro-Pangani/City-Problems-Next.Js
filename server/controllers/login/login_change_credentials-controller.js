const admin = require("firebase-admin");

const db = admin.firestore();

exports.change_name = async (req, res) => {
  const { id, name } = req.body;

  const administratorsRef = db.collection("administrators").doc(id);

  let doc = await administratorsRef.update({ name: name });

  administratorsRef
    .get()
    .then((doc) => {
      let loggedAdmin = {
        name: doc.data().name,
        status: doc.data().status,
        id: doc.id,
        logged: true,
      };
      res.cookie("user", loggedAdmin);
      res.json({
        message: "success",
      });
    })
    .catch((error) => {
      res.json({
        message: error,
      });
      console.log(" ##### Error from Change Admins Name");
    });
};

exports.change_password = async (req, res) => {
  const { id, password } = req.body;

  const administratorsRef = db.collection("administrators").doc(id);

  let doc = await administratorsRef.update({ password: password });

  doc = await administratorsRef.get();

  let loggedAdmin = {
    name: doc.data().name,
    status: doc.data().status,
    id: doc.id,
    logged: true,
  };

  res.cookie("user", loggedAdmin);

  console.log(
    id,
    password,
    " change name",
    doc.data(),
    doc.id,
    " ######## change"
  );

  res.json({
    message: "success",
  });
};
