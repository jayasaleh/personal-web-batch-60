const exp = require("constants");
const express = require("express");
const app = express(); //express dalam bentuk function supaya bisa mengakses method dari express.js
const port = 3000;
const hbs = require("hbs");
const path = require("path");
const {
  countTimeProjectEnd,
  techValue,
  formatDate,
} = require("./utils/duration");
//set penggunaan value dari input
// supaya bisa menghandle data yang dikirimkan dari form
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
//project list
app.get("/my-project", (req, res) => {
  console.log(blogProject);
  res.render("project-list", { blogProject: blogProject });
});
//routing create project
app.get("/create-project", (req, res) => {
  res.render("my-project");
});
//routing contact
app.get("/contact-me", (req, res) => {
  res.render("contact-me");
});
//routing testimonial
app.get("/testimonials", (req, res) => {
  res.render("testimonials");
});
let blogProject = [];
//submit create project
app.post("/create-project", (req, res) => {
  const {
    projectName,
    startDate,
    endDate,
    description,
    node,
    next,
    react,
    typeScript,
    image,
  } = req.body; //setiap value dari form input masuk ke request.body menggunakan method post

  // let nodeCheck = techValue(node);
  // let nextCheck = techValue(next);
  // let reactCheck = techValue(react);
  // let typeScriptCheck = techValue(typeScript);

  const addProject = {
    projectName: projectName,
    startDate: startDate,
    endDate: endDate,
    description: description,
    tech: [node, next, react, typeScript],
    image: "https://picsum.photos/200/300",
  };
  blogProject.push(addProject);
  res.redirect("/my-project");
});

app.listen(port, () => {
  console.log(`My personal app listening on port ${port}`);
});
