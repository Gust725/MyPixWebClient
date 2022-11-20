const Remote1 = require("../../remoteWS");
const controller = {};

controller.listFollowingIllust = async (req, res) => {
  const LoginData = req.session.LoginSessionInfo;
  const illusts = await Remote1.DashboardFollowsIllust(LoginData.author_id);
  res.render("index", { illusts, LoginData });
};

controller.commission = async(req,res)=>{
  res.render("commission");
}

controller.request = async(req,res)=>{
  res.render("request");
}

module.exports = controller;
