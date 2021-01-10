const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: false,
  signed: true,
};

exports.auth = (req, res) => {
  console.log(req.signedCookies, "signed cookies ########");

  res.cookie(
    "nameOfCookie",
    {
      name: "andro",
      age: 31,
      type: "authenticated",
    },
    COOKIE_OPTIONS
  );

  res.json({
    message: "Hy from auth",
  });
};
