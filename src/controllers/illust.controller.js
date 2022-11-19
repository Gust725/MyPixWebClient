const Remote1 = require("../../remoteWS");
const controller = {};

controller.getOneIllust = async (req, res, next) => {
  const id = req.params.id;
  const LoginData = req.session.LoginSessionInfo;
  const illust_data = await Remote1.GetIllust(id);
  const illust_pages = await Remote1.GetIllustPages(id);
  const illust_tags = await Remote1.GetIllustsTags(id);

  const data = { illust_data, illust_pages, illust_tags };
  // illust_data.then((oneIllust) => {
  //   res.render("illust", {LoginData, oneIllust,})
  // })

  // illust_pages.then(())

  res.render("illust", { data, LoginData });
};

module.exports = controller;
