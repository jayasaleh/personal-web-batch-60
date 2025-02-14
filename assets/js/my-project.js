let blogs = [];
// Get Data Form
function submitFormProject(event) {
  event.preventDefault();
  let projectName = document.getElementById("projectName").value;
  let startDate = document.getElementById("startDate").value;
  let endDate = document.getElementById("endDate").value;
  let description = document.getElementById("description").value;
  let node = document.getElementById("node").checked;
  let next = document.getElementById("next").checked;
  let react = document.getElementById("react").checked;
  let typeScript = document.getElementById("typeScript").checked;
  let image = document.getElementById("image");
  let imageFileName = URL.createObjectURL(image.files[0]);

  // Make Technology from boolean to String for display
  function techValue(check) {
    if (check) {
      return "";
    } else {
      return "none";
    }
  }
  let nodeCheck = techValue(node);
  let nextCheck = techValue(next);
  let reactCheck = techValue(react);
  let typeScriptCheck = techValue(typeScript);

  timeProject = countTimeProjectEnd(endDate, startDate);

  let blog = {
    projectName: projectName,
    timeProject: timeProject,
    description: description,
    tech: [nodeCheck, nextCheck, reactCheck, typeScriptCheck],
    image: imageFileName,
  };
  blogs.push(blog);
  renderBlog();
  // console.log(blogs)
}
function countTimeProjectEnd(end, start) {
  const distance = new Date(end) - new Date(start);

  // let diffInYear= Math.floor(distance/(12*30*24*60*1000));
  // if (diffInYear>0){
  //   return diffInYear + (diffInYear === 1 ? "Year Ago" : "Years Ago");
  // }
  let diffInMonth = Math.floor(distance / (30 * 24 * 60 * 60 * 1000));
  let leftdays =
    (distance % (30 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000);
  if (diffInMonth > 0) {
    if (leftdays > 0) {
      return (
        diffInMonth +
        (diffInMonth === 1 ? " Month Ago " : " Months Ago ") +
        leftdays +
        (leftdays === 1 ? " Day Ago" : " Days Ago")
      );
    }
    return diffInMonth + (diffInMonth === 1 ? " Month Ago" : " Months Ago");
  }

  let diffInDays = Math.floor(distance / (24 * 60 * 60 * 1000));
  if (diffInDays > 0) {
    return diffInDays + (diffInDays === 1 ? " day Ago" : " days Ago");
  } else {
    return "less than 1 day";
  }
}

function renderBlog() {
  let listBlog = document.getElementById("contentProject");
  listBlog.innerHTML = firstBlogContent();
  for (let i = 0; i < blogs.length; i++) {
    listBlog.innerHTML += `
        <div class="col">
          <div class="card h-100">
            <img src="${blogs[i].image}" class="card-img-top" alt="Image" />
            <div class="card-body">
              <h5 class="card-title">${blogs[i].projectName}</h5>
              <p>Duration : ${blogs[i].timeProject}</p>
              <p class="card-text">${blogs[i].description}</p>
              <div class="iconTech">
                <img src="/img/node.png" alt="icon" style="display:${blogs[i].tech[0]};" />
                <img src="/img/next.png" alt="icon" style="display:${blogs[i].tech[1]};" />
                <img src="/img/react.png" alt="icon" style="display:${blogs[i].tech[2]};" />
                <img src="/img/type.png" alt="icon" style="display:${blogs[i].tech[3]};" />
              </div>
              <div class="btn-edit-delete">
                <button>edit</button>
                <button>delete</button>
              </div>
            </div>
          </div>
        </div>
    `;
  }
}
function firstBlogContent() {
  return `
        <div class="col">
          <div class="card h-100">
            <img src="/img/profil.jpg" class="card-img-top" alt="Image" />
            <div class="card-body">
              <h5 class="card-title">Project Name</h5>
              <p>Duration : 3 Month</p>
              <p class="card-text">This is a description for the third card.</p>
              <div class="iconTech">
                <img src="/img/node.png" alt="icon" style="" />
                <img src="/img/next.png" alt="icon" style="" />
                <img src="/img/react.png" alt="icon" style="" />
                <img src="/img/type.png" alt="icon" style="" />
              </div>
              <div class="btn-edit-delete">
                <button>edit</button>
                <button>delete</button>
              </div>
            </div>
          </div>
        </div>
  `;
  /* <div id="contentProject" class="content-detail-project">
    <img src="${blogs[i].image}" alt="img-project" class="project-img">
    <h4>${blogs[i].projectName}</h4>
    <span>Durasi : ${blogs[i].timeProject}</span>
    <p style="font-size: 10px;">${blogs[i].description}</p>
      <div class="icon-tech">
      <img src="assets/img/node.png" alt="icon" style="display:${blogs[i].tech[0]};">
      <img src="assets/img/next.png" alt="icon" style="display:${blogs[i].tech[1]};">
      <img src="assets/img/react.png" alt="icon" style="display:${blogs[i].tech[2]};">
      <img src="assets/img/type.png" alt="icon" style="display:${blogs[i].tech[3]};">
    </div>
    <div class="button-detail-project">
      <button class="edit-btn">Edit</button>
      <button class="delete">Delete</button>
    </div>
    
  </div>
    */
}
