const { Sequelize, where } = require("sequelize");
const config = require("../config/config.json");
const { Project, User } = require("../models");
const sequelize = new Sequelize(config.development);
const bcrypt = require("bcrypt");

async function renderHome(req, res) {
  const user = req.session.user;
  res.render("index", { user: user });
}
async function renderLogin(req, res) {
  const user = req.session.user;
  if (user) {
    res.redirect("/");
  } else {
    res.render("auth-login", { user: user });
  }
}
async function renderRegister(req, res) {
  const user = req.session.user;
  if (user) {
    res.redirect("/");
  } else {
    res.render("auth-register", { user: user });
  }
}
async function renderProject(req, res) {
  const user = req.session.user;
  const projects = await Project.findAll({
    include: {
      model: User,
      as: "user",
      attributes: { exclude: ["password"] },
    },
    order: [["createdAt", "DESC"]],
  });
  // console.log("ini hasil select dengan include", projects);
  if (user) {
    res.render("project-list", { blogProject: projects, user: user });
  } else {
    res.render("project-list", { blogProject: projects });
  }
}
async function renderCreateProject(req, res) {
  const user = req.session.user;
  res.render("my-project", { user: user });
  if (!user) {
    res.redirect("/login");
  }
}
async function renderDetailProject(req, res) {
  const user = req.session.user;
  const id = req.params.id;
  const detailProject = await Project.findOne({
    include: {
      model: User,
      as: "user",
      attributes: { exclude: ["password"] },
    },
    where: {
      id: id,
    },
  });
  // if (detailProject.user.id !== detailProject.authorId) {
  //   res.redirect("/my-project");
  // // }
  // console.log("ini id user", detailProject.user.id);
  // console.log("ini id author", detailProject.authorId);
  if (detailProject === null) {
    res.render("page-404");
  } else {
    res.render("detail-project", { blogProject: detailProject, user: user });
  }
}
async function renderEditProject(req, res) {
  const user = req.session.user;
  const id = req.params.id;
  const editProject = await Project.findOne({
    where: {
      id: id,
    },
  });
  if (!user) {
    return res.redirect("/login");
  }
  if (editProject === null) {
    res.render("page-404");
  } else {
    res.render("edit-project", { blogProject: editProject, user: user });
  }
}
async function renderContactMe(req, res) {
  const user = req.session.user;
  res.render("contact-me", { user: user });
}
async function renderTestimonials(req, res) {
  const user = req.session.user;
  res.render("testimonials", { user: user });
}
async function renderError(req, res) {
  const user = req.session.user;
  res.render("page-404", { user: user });
}
async function updateProject(req, res) {
  const id = req.params.id;
  const {
    projectName,
    startDate,
    endDate,
    description,
    node,
    next,
    react,
    typeScript,
  } = req.body;
  let image = "https://picsum.photos/200/300";
  const updateResult = await Project.update(
    {
      projectName,
      startDate,
      endDate,
      description,
      technologys: [node, next, react, typeScript],
      image,
      updatedAt: sequelize.fn("NOW"),
    },
    {
      where: {
        id,
      },
    }
  );
  res.redirect("/my-project");
}
async function createProject(req, res) {
  const {
    projectName,
    startDate,
    endDate,
    description,
    node,
    next,
    react,
    typeScript,
  } = req.body;
  let image = "https://picsum.photos/200/300";

  const addProject = {
    projectName, // ini sama dengan menuliskan projectName: ProjectName,
    startDate,
    endDate,
    description,
    technologys: [node, next, react, typeScript],
    image,
  };
  const result = await Project.create(addProject);
  // console.log("ini hasilnya create project", result);
  res.redirect("/my-project");
}
async function deleteProject(req, res) {
  const id = req.params.id;
  const deleteResult = await Project.destroy({
    where: {
      id: id, // id project yang dipilih
    },
  });
  console.log("result delete", deleteResult);
  res.redirect("/my-project");
}
async function authLogin(req, res) {
  const { email, password } = req.body;
  console.log(email, password);

  const user = await User.findOne({
    where: {
      email,
    },
  });
  if (!user) {
    req.flash("error", "User tidak ditemukan");
    return res.redirect("/login");
  }
  const isValidated = await bcrypt.compare(password, user.password);
  if (!isValidated) {
    req.flash("error", "Password Salah");
    return res.redirect("/login");
  }
  let loggedInUser = user.toJSON();
  delete loggedInUser.password;
  req.session.user = loggedInUser;
  req.flash("success", `Berhasil Log In ${user.name}`);
  res.redirect("/");
}

function capitalizeWords(str) {
  // mengubah awalan kata menjadi huruf besar
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
async function authLogout(req, res) {
  req.session.user = null;
  res.redirect("/login");
}
async function authRegister(req, res) {
  let { name, email, password, confirmPassword } = req.body;

  if (name) {
    name = capitalizeWords(name);
  }
  //cek apakah ada user yang sudah menggunakan email yang samaa
  const user = await User.findOne({
    where: {
      email: email,
    },
  });
  if (user) {
    req.flash("error", "Email sudah digunakan oleh akun lainnya");
    return res.redirect("/register");
  }
  // cek apakah password sudah sama
  if (password !== confirmPassword) {
    req.flash("error", "Passwordnya tidak sama");
    return res.redirect("/register");
  }
  const saltRounds = 10;
  console.log(req.body);
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const newUser = {
    name,
    email,
    password: hashedPassword,
  };

  const userInsert = await User.create(newUser);
  req.flash("success", "Berhasil mendaftar silakan login");
  res.redirect("/login");
}
module.exports = {
  authLogin,
  authRegister,
  authLogout,
  renderLogin,
  renderRegister,
  renderHome,
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
};
