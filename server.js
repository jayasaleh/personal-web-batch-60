const express = require("express");
const app = express(); //express dalam bentuk function supaya bisa mengakses method dari express.js
const hbs = require("hbs");
const path = require("path");
const methodOverride = require("method-override");
const flash = require("express-flash");

const session = require("express-session");
const upload = require("./middlewares/upload-file");
const checkUser = require("./middlewares/auth");
require("dotenv").config();
const {
  countTimeProjectEnd,
  techValue,
  formatDate,
  formatDateStartEnd,
} = require("./utils/duration");
// const { updateProject } = require("./controllers/controller-v1");

const {
  authLogin,
  authRegister,
  authLogout,
  renderHome,
  renderLogin,
  renderRegister,
  renderProject,
  renderDetailProject,
  renderCreateProject,
  renderEditProject,
  renderContactMe,
  renderTestimonials,
  renderError,
  deleteProject,
  createProject,
  updateProject,
} = require("./controllers/controller-v2");
const port = process.env.PORT || 3000;
//set penggunaan value dari input
// supaya bisa menghandle data yang dikirimkan dari form
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
// menjadikan folder 'assets sebagai penyedia file statis'
app.use("/assets", express.static(path.join(__dirname, "./assets")));
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));
app.use(flash());
app.use(
  session({
    name: "my-session",
    secret: "ewr234xfd",
    resave: false,
    saveUninitialized: true,
  })
);
app.set("views", path.join(__dirname, "./views"));

hbs.registerPartials(__dirname + "/views/partials", function (err) {});
hbs.registerHelper("equal", (a, b) => {
  return a === b;
});
// untuk menampilkan array di dalam object array
hbs.registerHelper("getIndex", function (array, index) {
  return array && array[index]; // Pastikan array tidak undefined
});
hbs.registerHelper("countTimeProjectEnd", countTimeProjectEnd);
hbs.registerHelper("formatDateStartEnd", formatDateStartEnd);
hbs.registerHelper("techValue", techValue);
hbs.registerHelper("formatDate", formatDate);
// Menggunakan Handlebars sebagai template engine
// const hbs = create({ extname: ".hbs" });
// app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
// app.set("views", "./views");

//routing home
app.get("/login", renderLogin);
app.get("/register", renderRegister);
app.post("/login", authLogin);
app.post("/register", authRegister);
app.get("/", renderHome);
app.get("/logout", authLogout);
//routing project list
app.get("/my-project", renderProject);
//routing create project
app.get("/create-project", checkUser, renderCreateProject);
//routing detail project
app.get("/detail-project/:id", checkUser, renderDetailProject);
//routing contact
app.get("/contact-me", renderContactMe);
//routing testimonial
app.get("/testimonials", renderTestimonials);
//render editblog
app.get("/edit-project/:id", renderEditProject);
app.get("*", renderError);
//submit create project
app.post("/create-project", checkUser, upload.single("image"), createProject);
app.patch(
  "/edit-project/:id",
  checkUser,
  upload.single("image"),
  updateProject
);
app.delete("/my-project/:id", deleteProject);
app.listen(port, () => {
  console.log(`My personal app listening on port ${port}`);
});
