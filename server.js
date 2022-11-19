const express = require("express");
const session = require("express-session");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

app.use(express.static(path.join(__dirname, "./src/public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./src/views"));

const login_route = require("./src/routes/login.routes");
const illust_route = require("./src/routes/illust.routes");

app.use(cookieParser());
app.use(
  session({
    secret: "keyboard neko",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 15,
    },
  })
);
app.use((req, res, next) => {
  if (!req.user)
    res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
  next();
});
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", login_route);
app.use("/DashBoard", illust_route);

const PORT = 1234;

app.listen(PORT, (req, res) => {
  console.log("App listening on port: ", PORT);
});
