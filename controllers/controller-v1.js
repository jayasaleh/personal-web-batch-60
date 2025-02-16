let blogProject = [
  {
    projectName: "Cortax 1.3T",
    startDate: "2025-2-14",
    endDate: "2025-12-28",
    description:
      "Cortex AI dapat membantu Anda menulis lagu rap dengan gaya artis favorit Anda atau bahkan menulis ulang lirik menjadi lagu klasik.",
    tech: ["on", "on", "on", "on"],
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR3NmHf1NnQYqpJnBZVqns9nCoAcalsqrpYg&s",
  },
];

function createProject(req, res) {
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
}
function deleteProject(req, res) {
  const id = req.params.id;
  const pilihProject = blogProject[id];
  blogProject.splice(id, 1);
  res.redirect("/my-project");
}
function updateProject(req, res) {
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

  const editProject = {
    projectName: projectName,
    startDate: startDate,
    endDate: endDate,
    description: description,
    tech: [node, next, react, typeScript],
    image: "https://picsum.photos/200/300",
  };
  blogProject[id] = editProject;
  res.redirect("/my-project");
}
function renderDetailProject(req, res) {
  const id = req.params.id;
  const pilih = blogProject[id]; //mengambil data dari array
  res.render("detail-project", { blogProject: pilih });
}
function renderProject(req, res) {
  res.render("project-list", { blogProject: blogProject });
}
function renderEditProject(req, res) {
  const id = req.params.id;
  const pilihProject = blogProject[id];
  res.render("edit-project", { blogProject: pilihProject, id: id });
}
module.exports = {
  renderProject,
  createProject,
  deleteProject,
  updateProject,
  renderEditProject,
  renderDetailProject,
};
