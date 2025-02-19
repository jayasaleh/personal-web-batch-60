// const { sequelize } = require("../models");
const { Sequelize, QueryTypes } = require("sequelize");
const config = require("../config/config.json");
const { SELECT } = require("sequelize/lib/query-types");
const { Query } = require("pg");
const sequelize = new Sequelize(config.development);
// let blogProject = [
//   {
//     projectName: "Cortax 1.3T",
//     startDate: "2025-2-14",
//     endDate: "2025-12-28",
//     description:
//       "Cortex AI dapat membantu Anda menulis lagu rap dengan gaya artis favorit Anda atau bahkan menulis ulang lirik menjadi lagu klasik.",
//     tech: ["on", "on", "on", "on"],
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR3NmHf1NnQYqpJnBZVqns9nCoAcalsqrpYg&s",
//   },
// ];

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
  } = req.body; //setiap value dari form input masuk ke request.body menggunakan method post

  // const addProject = {
  //   projectName: projectName,
  //   startDate: startDate,
  //   endDate: endDate,
  //   description: description,
  //   tech: [node, next, react, typeScript],
  //   image: "https://picsum.photos/200/300",
  // };
  let authorId = 1;
  let image = "https://picsum.photos/200/300";
  let query = `INSERT INTO public."Projects"("authorId", "projectName", "startDate", "endDate", description, technologys, image)
  VALUES ('${authorId}','${projectName}','${startDate}','${endDate}','${description}','["${node}","${next}","${react}","${typeScript}"]', '${image}')`;
  const newProject = await sequelize.query(query, {
    type: QueryTypes.INSERT,
  });
  // blogProject.push(addProject);
  res.redirect("/my-project");
}
async function deleteProject(req, res) {
  const id = req.params.id;
  const query = `DELETE FROM "Projects" WHERE id=${id}`;
  const deleteProject = await sequelize.query(query, {
    type: QueryTypes.DELETE,
  });
  // console.log("hasil deletenya ", deleteProject);

  res.redirect("/my-project");
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
    image,
  } = req.body; //setiap value dari form input masuk ke request.body menggunakan method post

  // const editProject = {
  //   projectName: projectName,
  //   startDate: startDate,
  //   endDate: endDate,
  //   description: description,
  //   tech: [node, next, react, typeScript],
  //   image: "https://picsum.photos/200/300",
  // };
  const query = `
  UPDATE public."Projects"
  SET "projectName"='${projectName}', "startDate"='${startDate}', "endDate"='${endDate}', description='${description}', technologys='["${node}","${next}","${react}","${typeScript}"]', "updatedAt"='${new Date().toISOString()}'
	WHERE id=${id};
  `;
  const updateResult = await sequelize.query(query, {
    type: QueryTypes.UPDATE,
  });
  console.log("updatenya ini", updateResult);
  res.redirect("/my-project");
}
async function renderDetailProject(req, res) {
  const id = req.params.id;
  const query = `SELECT * FROM "Projects" WHERE id=${id}`;
  const project = await sequelize.query(query, {
    type: QueryTypes.SELECT,
  }); //mengambil data dari array
  res.render("detail-project", { blogProject: project[0] });
}
async function renderProject(req, res) {
  const project = await sequelize.query(
    `SELECT * FROM public."Projects" ORDER BY "createdAt" DESC`,
    {
      type: QueryTypes.SELECT,
    }
  );
  res.render("project-list", { blogProject: project });
}
async function renderEditProject(req, res) {
  const id = req.params.id;
  const editProject = await sequelize.query(
    `SELECT * FROM public."Projects" WHERE id=${id}`,
    {
      type: QueryTypes.SELECT,
    }
  );
  const pilihProject = editProject;
  res.render("edit-project", { blogProject: pilihProject[0], id: id });
}
module.exports = {
  renderProject,
  createProject,
  deleteProject,
  updateProject,
  renderEditProject,
  renderDetailProject,
};
