let blogs=[];
// Get Data Form
function submitFormProject(event){
  event.preventDefault()
  let projectName= document.getElementById("projectName").value
  let startDate= document.getElementById("startDate").value
  let endDate= document.getElementById("endDate").value
  let description= document.getElementById("description").value
  let node= document.getElementById("node").checked
  let next= document.getElementById("next").checked
  let react= document.getElementById("react").checked
  let typeScript= document.getElementById("typeScript").checked
  let image = document.getElementById("image")
  let imageFileName= URL.createObjectURL(image.files[0])

// Make Technology from boolean to String for display 
  function techValue(check){
    if (check){
      return"";
    }else{
      return "none";
    }
  }
 let nodeCheck=techValue(node)
 let nextCheck=techValue(next)
 let reactCheck=techValue(react)
 let typeScriptCheck=techValue(typeScript)
 
 timeProject = countTimeProjectEnd(endDate,startDate);


      let blog= {
        projectName: projectName,
        timeProject: timeProject,
        description: description,
        tech:[nodeCheck, nextCheck, reactCheck, typeScriptCheck],
        image:imageFileName
      }
      blogs.push(blog)
      renderBlog()
      // console.log(blogs)
}
function countTimeProjectEnd(end, start){
  const distance = new Date(end) - new Date(start);
  
  // let diffInYear= Math.floor(distance/(12*30*24*60*1000));
  // if (diffInYear>0){
  //   return diffInYear + (diffInYear === 1 ? "Year Ago" : "Years Ago");
  // }
  let diffInMonth = Math.floor(distance/(30*24*60*60*1000));
  let leftdays= (distance %(30*24*60*60*1000)/(24*60*60*1000));
  if (diffInMonth>0){
    if(leftdays>0){
      return diffInMonth+(diffInMonth === 1 ? " Month Ago ": " Months Ago ") + leftdays + (leftdays===1 ?" Day Ago":" Days Ago")
    }
    return diffInMonth + (diffInMonth === 1 ? " Month Ago" : " Months Ago");
  }

  let diffInDays= Math.floor(distance/ (24*60*60*1000));
  if (diffInDays>0){
    return diffInDays + (diffInDays === 1 ? " day Ago" : " days Ago");
  }
}

function renderBlog(){
  let listBlog= document.getElementById("contentProject")
  listBlog.innerHTML= firstBlogContent()
  for(let i=0; i<blogs.length;i++){
    listBlog.innerHTML+=`
    <div id="contentProject" class="content-detail-project">
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
    `
  }
}
function firstBlogContent(){
  return`
    <div id="contentProject" class="content-detail-project">
    <img src="assets/img/profile.jpg" alt="img-project" class="project-img">
    <h4>EDI SUPONO</h4>
    <span>Durasi : 1 Month</span>
    <p style="font-size: 10px;">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam eius odio officia, minus quam animi excepturi quo. Quo, consequuntur blanditiis. Sint illo reiciendis, fuga dicta ipsam vero laudantium velit earum?</p>
      <div class="icon-tech">
      <img src="assets/img/node.png" alt="icon">
      <img src="assets/img/next.png" alt="icon">
      <img src="assets/img/react.png" alt="icon">
      <img src="assets/img/type.png" alt="icon">
    </div>
    <div class="button-detail-project">
      <button class="edit-btn">Edit</button>
      <button class="delete">Delete</button>
    </div>
    
  </div>
  `
}