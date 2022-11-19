const Remote1 = require("../../remoteWS");
const controller = {};

//Remote.LoginIn('selitzia@email.com','12345');
// const data = Remote1.LoginIn('selitzia@email.com','12345');

controller.loginAuthor = (req, res) => {
  const mail = req.body.login_mail;
  const passw = req.body.login_pass;
  console.log(mail, passw);
  try {
    const logData = Remote1.LoginIn(mail, passw);

    logData.then((value) => {
      console.log(value);
      if (value) {
        req.session.LoginSessionInfo = value;
        res.redirect("/DashBoard/index");
      } else {
        res.render("login", { log: 2 });
      }
    });
  } catch(err) {
    console.log(err);
  }
};

controller.registerAuthor = (req, res) => {
  const regdata = {
    username: req.body.register_nick,
    mail: req.body.register_correo,
    country: req.body.register_country,
    birth: req.body.register_birth,
    passw: req.body.register_pass,
  };
  console.log(regdata);
};

module.exports = controller;
