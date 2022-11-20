const Remote1 = require("../../remoteWS");
const controller = {};

controller.listFollowingIllust = async (req, res) => {
  const LoginData = req.session.LoginSessionInfo;
  const illusts = await Remote1.DashboardFollowsIllust(LoginData.author_id);
  res.render("index", { illusts, LoginData });
};

controller.commission = async(req,res)=>{
  const LoginData = req.session.LoginSessionInfo;
  res.render("commission", {LoginData});
}

controller.request = async(req,res)=>{
  const LoginData = req.session.LoginSessionInfo;
  res.render("request", {LoginData});
}

module.exports = controller;
