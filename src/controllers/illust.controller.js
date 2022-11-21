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

//#region Submit Illust
controller.addIllust = async(req, res)=>{

  res.render("submit/addIllust")
}

controller.addPost = async(req, res)=>{
  const id = req.params.id_user;
  const LoginData = req.session.LoginSessionInfo;
  const AuthorData = await Remote1.SingleAuthor(id);

  let match = true;

  if (AuthorData.author_id == LoginData.author_id) match = false;
  
  console.log(AuthorData);
  res.render("user", { LoginData, AuthorData, match });
}
//#endregion

module.exports = controller;
