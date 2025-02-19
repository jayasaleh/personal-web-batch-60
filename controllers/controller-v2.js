const { Sequelize, where } = require("sequelize");
const config = require("../config/config.json");
const { Project } = require("../models");
const sequelize = new Sequelize(config.development);

async function renderProject(req, res) {
  const projects = await Project.findAll({
    order: [["createdAt", "DESC"]],
  });
  res.render("project-list", { blogProject: projects });
}
async function renderCreateProject(req, res) {
  res.render("my-project");
}
async function renderDetailProject(req, res) {
  const id = req.params.id;
  const detailProject = await Project.findOne({
    where: {
      id: id,
    },
  });
  if (detailProject === null) {
    res.render("page-404");
  } else {
    res.render("detail-project", { blogProject: detailProject });
  }
}
async function renderEditProject(req, res) {
  const id = req.params.id;
  const editProject = await Project.findOne({
    where: {
      id: id,
    },
  });
  if (editProject === null) {
    res.render("page-404");
  } else {
    res.render("edit-project", { blogProject: editProject });
  }
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
  res.redirect("result Update", updateResult);
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

module.exports = {
  renderProject,
  renderDetailProject,
  renderCreateProject,
  renderEditProject,
  deleteProject,
  createProject,
};
