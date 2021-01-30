const admin = require("firebase-admin");

const db = admin.firestore();

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: false,
  signed: true,
};

exports.login = (req, res) => {
  let { user, password } = req.body;
  let signedUser = req.cookies.user ? req.cookies.user : undefined;

  console.log(
    signedUser,
    req.cookies.user,
    "signed cookies ########",
    " req body ###### >>>",
    req.body
  );

  if (req.body.user && req.body.user !== "") {
    const { user, password } = req.body;
    let resData = undefined;
    let dataArray = [];

    db.collection("administrators")
      .get()
      .then((snapshot) => {
        let loggedAdmin = {
          name: "",
          id: "",
          logged: false,
          creator: false,
        };

        snapshot.forEach((doc) => {
          let admin = doc.data();
          admin.id = doc.id;

          // CHECKING IF IT'S ADMIN
          if (admin.name === user && admin.password === password) {
            loggedAdmin = {
              name: admin.name,
              id: admin.id,
              logged: true,
              status: admin.status,
            };
          }
        });
        res.cookie("user", loggedAdmin);

        if (loggedAdmin.logged) {
          res.json({
            profile: {
              name: loggedAdmin.name,
              status: loggedAdmin.status,
            },
            logged: true,
            message: "",
          });
        } else {
          res.json({
            logged: false,
            message: "Error, user name or password are incorrect.",
          });
        }
      });
  } else {
    res.json({
      logged: false,
      message: "Error, user name or password is incorrect.",
    });
  }

  // if (user === "andro" && password === "login") {
  //   res.cookie("user", {
  //     logged: true,
  //   });
  // }

  // if (user === "andro" && password === "logout") {
  //   res.clearCookie("user");
  // }

  // res.cookie(
  //   "user",
  //   {
  //     name: "andro",
  //     age: 31,
  //     type: "authenticated",
  //   },
  //   COOKIE_OPTIONS
  // );
};
