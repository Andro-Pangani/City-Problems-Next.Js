exports.logout_user = (req, res) => {
  let { logout } = req.body;

  res.clearCookie("user");

  res.json({
    loggedOut: true,
  });
};
