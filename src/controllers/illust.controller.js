const Remote1 = require("../../remote2");
const controller = {};

controller.listFollowingIllust = (req, res) => {
  const LoginData = req.session.LoginSessionInfo;
  const data = Remote1.DashboardFollowsIllust(LoginData.author_id);
  data.then((illusts) => {
    //console.log(illusts[0].thumb_dir.split(".")[1]);
    // function* chunks(arr, n) {
    //   for (let i = 0; i < arr.length; i += n) {
    //     yield arr.slice(i, i + n);
    //   }
    // }
    // const array_illust = [...chunks(illusts, 5)];
    res.render("index", { illusts, LoginData });
  });
};

module.exports = controller;
