exports.login_get = (req, res) => {
  console.log(req.signedCookies.user, " From login get");

  // if(req.cookies.user){
  //  let user = req.cookies.user;
  //  let {logged} = user;
  //  if(user.logged){
  //   res.json(user)
  //  }
  // }else{
  //  res.json({
  //   data: 'hi from login geet'
  //  })
  // }
  let user = {
    name: null,
    id: null,
    logged: false,
    status: null,
  };

  if (req.signedCookies.user) {
    let { name, id, logged, status } = req.signedCookies.user;

    user.name = name;
    user.id = id;
    user.logged = logged;
    user.status = status;
  }
  res.json({
    user,
  });
};
