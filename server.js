const express = require("express");
const app = express(); //express dalam bentuk function supaya bisa mengakses method dari express.js
const hbs = require("hbs");
const path = require("path");
const methodOverride = require("method-override");

const {
  countTimeProjectEnd,
  techValue,
  formatDate,
  formatDateStartEnd,
} = require("./utils/duration");
const { updateProject } = require("./controllers/controller-v1");

const {
  renderProject,
  renderDetailProject,
  renderCreateProject,
  renderEditProject,
  deleteProject,
  createProject,
} = require("./controllers/controller-v2");
const port = 3000;
//set penggunaan value dari input
// supaya bisa menghandle data yang dikirimkan dari form
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
// menjadikan folder 'assets sebagai penyedia file statis'
app.use(express.static("assets"));
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
app.get("/", (req, res) => {
  res.render("index");
});
//routing project list
app.get("/my-project", renderProject);
//routing create project
app.get("/create-project", renderCreateProject);
//routing detail project
app.get("/detail-project/:id", renderDetailProject);
//routing contact
app.get("/contact-me", (req, res) => {
  res.render("contact-me");
});
//routing testimonial
app.get("/testimonials", (req, res) => {
  res.render("testimonials");
});
//render editblog
app.get("/edit-project/:id", renderEditProject);
app.get("*", (req, res) => {
  res.render("page-404");
});
//submit create project
app.post("/create-project", createProject);
app.patch("/edit-project/:id", updateProject);
app.delete("/my-project/:id", deleteProject);
app.listen(port, () => {
  console.log(`My personal app listening on port ${port}`);
});
