const Remote1 = require("../../remoteAuthor");
const controller = {};

controller.listFollowingIllust = (req, res) => {
  const LoginData = req.session.LoginSessionInfo;
  const data = Remote1.DashboardFollowsIllust(LoginData.author_id);
  data.then((illusts) => {
    res.render("index", { illusts, LoginData });
  });
};

module.exports = controller;
