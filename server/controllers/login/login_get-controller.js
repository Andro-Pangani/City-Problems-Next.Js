exports.login_get = (req, res) => {
  console.log(req.cookies.user, " From login get");

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

  if (req.cookies.user) {
    user.name = req.cookies.user.name;
    user.id = req.cookies.user.id;
    user.logged = req.cookies.user.logged;
    user.status = req.cookies.user.status;
  }
  res.json({
    user,
  });
};
