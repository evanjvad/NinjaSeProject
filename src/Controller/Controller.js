//import { Model } from './model/Model.js';
import axios from 'axios'
const instance = axios.create({
  baseURL: "https://96uvqm7408.execute-api.us-east-1.amazonaws.com/Prod/"
});

//register designer
export function handleRegisterDesignerClick(e) {
  //get info from form
  let form = document.designerForm;
  let designerID = form.designerID.value;
  let name = form.name.value;
  if (designerID !== "" && name !== "") {
    //Formatting payload
    let msg = {};
    msg["designerID"] = designerID;
    msg["name"] = name;
    let value = JSON.stringify(msg);
    let data = {
      'body': value
    };
    instance.post("/registerDesigner", data).then(function (response) {
      console.log(response.data.result);
    }).catch(function (error) {
      console.log(error);
    });
  }
}

//register admin
export function handleRegisterAdminClick(e) {
  //get info from form
  let form = document.adminRegisterForm;
  let adminID = form.adminID.value;
  let name = form.name.value;
  if (adminID !== "" && name !== "") {
    //Formatting payload
    let msg = {};
    msg["adminID"] = adminID;
    msg["name"] = name;
    let value = JSON.stringify(msg);
    let data = {
      'body': value
    };
    instance.post("/registerAdmin", data).then(function (response) {
      console.log(response);
    }).catch(function (error) {
      console.log(error);
    });
  }
}


//register supporter (placeholder)
export function handleRegisterSupporterClick(e) {
  //get info from form
  let form = document.registerSupporterForm;
  let supporterID = form.supporterID.value;
  let name = form.supporterName.value;
  if (supporterID !== "" && name !== "") {
    //Formatting payload
    let msg = {};
    msg["supporterID"] = supporterID;
    msg["name"] = name;
    let value = JSON.stringify(msg);
    let data = {
      'body': value
    };
    instance.post("/registerSupporter", data).then(function (response) {
      console.log(response);
    }).catch(function (error) {
      console.log(error);
    });
  }

}


//info.nameProject, info.designerID, info.nameProject, info.story, info.goal, info.deadline
//create project
export function handleCreateProjectClick(e) {
  //get form info
  var form = document.createProjectForm;
  var designerID = document.userInfo.userID.value;
  console.log(designerID);
  var nameProject = form.nameProject.value;
  var story = form.story.value;
  var goal = parseInt(form.goal.value);
  var deadline = form.deadline.value;
  var genre = form.genre.value; //tell format of deadline on site
  //Format payload
  if (designerID !== "" && nameProject !== "" && deadline !== "") {
    var msg = {};
    msg["nameProject"] = nameProject;
    msg["designerID"] = designerID;
    msg["story"] = story;
    msg["goal"] = goal;
    msg["deadline"] = deadline;
    msg["genre"] = genre;
    let value = JSON.stringify(msg);
    //
    let data = {};
    data = {
      'body': value
    };
    console.log('test');
    instance.post("/createProject", data).then(function (response) {
      console.log(response);
    }).catch(function (error) {
      console.log(error);
    });
  }
}

//create pledge
export function handleCreatePledgeClick(e) {
  //get form info
  var form = document.createPledgeForm;
  var designerID = document.userInfo.userID.value;
  var nameProject = form.nameProject.value;
  var namePledge = form.namePledge.value;
  var dollarAmount = parseInt(form.dollarAmount.value);
  var reward = form.reward.value;
  var supportersMax = parseInt(form.supportersMax.value); //tell format of deadline on site
  //Format payload
  var msg = {};
  msg["designerID"] = designerID;
  msg["nameProject"] = nameProject;
  msg["namePledge"] = namePledge;
  msg["dollarAmount"] = dollarAmount;
  msg["reward"] = reward;
  msg["supportersMax"] = supportersMax;
  let value = JSON.stringify(msg);
  //
  let data = {};
  data = {
    'body': value
  };
  instance.post("/createPledge", data).then(function (response) {
    console.log(response);
  }).catch(function (error) {
    console.log(error);
  });
}

//list projects
export function handleListProjectsClick(e) {
  // get info
  //var form = document.listProjectsForm; //manual entry
  //var designerID = form.designerID.value;
  var form = document.userInfo; //stored from login
  var role = form.userRole.value;
  var designerID = form.userID.value;
  if (role === "Designer") {
    //format payload
    var msg = {};
    msg["designerID"] = designerID;
    let value = JSON.stringify(msg);
    let data = {};
    data = {
      'body': value
    };
    instance.post("/listProjects", data).then(function (response) {
      console.log(response.data.projects.length);
      // let form2 = document.listProjectsForm;
      
      // let listString = "";
      // for (let i = 0; i < response.data.projects.length; i++) {
      //   listString += response.data.projects[i].name + "\n";
      // }
      // console.log(listString);
      // let input = listString;
      var x = '';
    let tempString = '';
    for (let i = 0; i < response.data.projects.length; ++i) {
      tempString = response.data.projects[i].name;
      x = x + ('<li>' + tempString + '</li>');
    }
      document.getElementById("projectList").innerHTML = x;
      //form2.projectList.innerHTML = input;
    }).catch(function (error) {
      console.log(error);
    });
  }
  if (role === "Admin") {
    //format payload
    console.log("admin");
    instance.get("/adminListProjects").then(function (response) {
      console.log(response);
      let form2 = document.listProjectsForm;
      let listString = "";
      for (let i = 0; i < response.data.projects.length; i++) {
        listString += response.data.projects[i].name + "\n";
        
      }
      let input = listString;
      document.getElementById("projectList").innerText = input;
    }).catch(function (error) {
      console.log(error);
    });
  }
}

//login admin
export function handleAdminLoginClick(e) {
  var form = document.loginAdminForm;
  var userID = form.userID.value;
  var role = "Admin";
  //format payload
  var msg = {};
  msg["userID"] = userID;
  msg["role"] = role;
  let value = JSON.stringify(msg);
  let data = {};
  data = {
    'body': value
  };
  instance.post("/checkUser", data).then(function (response) {
    //console.log(response.data.userInfo.name);
    fillUserInfo(response.data.userInfo.role, response.data.userInfo.email, response.data.userInfo.name);
    handleUserVisibility("Admin");
  }).catch(function (error) {
    console.log(error);
  });
}

//login designer
export function handleDesignerLoginClick(e) {
  var form = document.loginDesignerForm;
  var userID = form.userID.value;
  var role = "Designer";
  //format payload
  var msg = {};
  msg["userID"] = userID;
  msg["role"] = role;
  let value = JSON.stringify(msg);
  let data = {};
  data = {
    'body': value
  };
  instance.post("/checkUser", data).then(function (response) {
    handleUserVisibility("Designer");
    fillUserInfo(response.data.userInfo.role, response.data.userInfo.email, response.data.userInfo.name);
  }).catch(function (error) {
    console.log(error);
  });

}

//login supporter
export function handleSupporterLoginClick(e){
  var form = document.loginSupporterForm;
  var userID = form.supporterID.value;
  var role = "Supporter";
  //format payload
  var msg = {}
  msg["userID"] = userID;
  msg["role"] = role;

  let value = JSON.stringify(msg);
  let data = {};
  data = { 'body' : value };

  instance.post("/checkUser", data)
    .then(function (response){
      fillUserInfo(response.data.userInfo.role, response.data.userInfo.email,response.data.userInfo.name);
      handleUserVisibility("Supporter");
      console.log(response)
    })
    .catch(function (error){
      console.log(error)
    })
}

//admin list projects
export function handleAdminListProjectsClick(e) {
  //adminListProjects is a get
  /*
  // get info
  var form = document.adminListProjectsForm;
  var adminID = form.adminID.value;
  //format payload
  var msg = {};
  msg["adminID"] = designerID;
  let value = JSON.stringify(msg);
  let data = {};
  data = { 'body' : value };
  */
  // instance.get("/adminListProjects", data)
  //   .then(function (response){

  //     forceRedraw(redraw+1);
  //   })
  //   .catch(function (error){

  //   })
}

//designer view (review) project
export function handleReviewProjectClick(e) {
  //get info
  var form = document.reviewProjectForm;
  var designerID = document.userInfo.userID.value;
  var nameProject = form.nameProject.value;
  //format payload
  var msg = {};
  msg["designerID"] = designerID;
  msg["nameProject"] = nameProject;
  let value = JSON.stringify(msg);
  let data = {};
  data = {
    'body': value
  };
  instance.post("/reviewProject", data).then(function (response) {
    let form2 = document.actualView;
    console.log(response);
    let obj = response.data.project;
    //console.log(response.data.project.goal);
    form2.nameProject.value = obj.name;
    form2.story.value = obj.story;
    // form2.designerID.value = obj.designerID;
    form2.genre.value = obj.genre;
    form2.goal.value = "$" + obj.goal;
    form2.deadline.value = obj.deadline;
    var x = '';
    let tempString = '';
    for (let i = 0; i < obj.pledges.length; ++i) {
      tempString = obj.pledges[i].name;
      x = x + ('<li>' + tempString + '</li>');
    }
    //console.log(x);
    document.getElementById("pledges").innerHTML = x;
    let launched = obj.isLaunched;
    let isLaunched = launched ? "Launched" : "Not Launched";
    
    form2.isLaunched.value = isLaunched;
    form2.currentFunding.value = "$" + obj.currentFunding;
  }).catch(function (error) {
    console.log(error);
  });
}

//supporter search projects
export function handleSearchProjectsClick(e) {
  //var form = document.userInfo; //stored from login
  //var role = form.userRole.value;
  //var supporterID = form.userID.value;
  
  var genre = document.getElementById("genreSearch").value; //get genre from input field
  
  //format payload
  var msg = {};
  //msg["supporterID"] = supporterID;
  msg["genre"] = genre;
  let value = JSON.stringify(msg);
  let data = {};
  data = {
    'body': value
  };
  instance.post("/searchProjects", data).then(function (response) {
    //console.log(response.data.projects.length);
    console.log(response);
    // let form2 = document.listProjectsForm;
    let listString = "";
    for (let i = 0; i < response.data.projects.length; i++) {
      listString += response.data.projects[i].name + "\n";
    }
    
    console.log(listString);
    let input = listString;
    document.getElementById("projects").innerText = input;
    //form2.projectList.innerHTML = input;
  }).catch(function (error) {
    console.log(error);
  });
}

//supporter search projects
export function handleViewProjectClick(e) {
  //get info
  var form = document.viewProjectInputForm;
  //var supporterID = document.userInfo.userID.value;
  var nameProject = form.nameProject.value;
  //format payload
  var msg = {};
  //msg["supporterID"] = supporterID;
  msg["nameProject"] = nameProject;
  let value = JSON.stringify(msg);
  let data = {};
  data = {
    'body': value
  };
  instance.post("/viewProject", data).then(function (response) {
    let form2 = document.viewProjectOutputForm;
    console.log(response);
    let obj = response.data.project;
    //console.log(response.data.project.goal);
    form2.nameProject.value = obj.name;
    form2.story.value = obj.story;
    // form2.designerID.value = obj.designerID;
    form2.genre.value = obj.genre;
    form2.goal.value = "$" + obj.goal;
    form2.deadline.value = obj.deadline;
    //form2.pledges.value = response.data.project.pledges;
    //fill out list of pledges 
    // let pldgs = "";
    // for (let k = 0; k < obj.pledges.length; ++k) {
    //   let newPledge = response.data.project.pledges[k].name;
    //   pldgs = pldgs + newPledge + ", ";
    // }
    // form2.pledges.value = pldgs;
  
    // let listString = "";
    // for (let i = 0; i < obj.pledges.length; ++i) {
    //   listString += obj.pledges[i].name + "\n";
    // }
    // let input = listString;
    // document.getElementById("pledges").innerText = input;
    // console.log(document.getElementById("pledges"));
    var x = '';
    let tempString = '';
    for (let i = 0; i < obj.pledges.length; ++i) {
      
      tempString = obj.pledges[i].name;

      x = x + ('<li>' + tempString + '</li>');

    }
    console.log(x);
    document.getElementById("pledgesSupporterView").innerHTML = x;
    let launched = obj.isLaunched; //maybe hide this for the support view since it should already be launched to see
    let isLaunched = launched ? "Launched" : "Not Launched";
    
    form2.isLaunched.value = isLaunched;
    form2.currentFunding.value = "$" + obj.currentFunding;
  }).catch(function (error) {
    console.log(error);
  });
}

//view pledge
export function handleViewPledgeClick(e) {
  //get info 
  var form = document.viewPledgeInputForm; //edit these to pull data from right locatio
  var nameProject = document.viewProjectOutputForm.nameProject.value;
  var namePledge = document.getElementById("pledgeNameID").value;

  if(document.userInfo.userRole.value === "Designer") {
    nameProject = document.reviewProjectForm.nameProject.value;
  }
  //format payload
  var msg = {};
  msg["nameProject"] = nameProject;
  msg["namePledge"] = namePledge;
  let value = JSON.stringify(msg);
  let data = {};
  data = {
    'body': value
  };
  instance.post("/viewPledge", data).then(function (response) {
    let form2 = document.pledgeView;
    console.log(response);
    let obj = response.data.pledge;
    //console.log(response.data.project.goal);
    form2.pledgeID.value = obj.pledgeID;
    form2.projectID.value = obj.projectID;
    // form2.designerID.value = obj.designerID;
    form2.amount.value = "$" + obj.dollarAmount;
    form2.reward.value = obj.reward;
    form2.supportersMax.value = obj.supportersMax;
    
    var x = '';
    let tempString = '';
    for (let i = 0; i < obj.supporters.length; ++i) {
      
      tempString = obj.supporters[i].email;

      x = x + ('<li>' + tempString + '</li>');

    }
    //console.log(x);
    document.getElementById("supporters").innerHTML = x;
  }).catch(function (error) {
    console.log(error);
  });
}

//supporter claim pledge
export function handleClaimPledgeClick(e) {
  let form = document.claimPledgeForm;
  var namePledge = form.pledgeID.value;
  var supporterID = document.userInfo.userID.value; 
  var nameProject = document.viewProjectOutputForm.nameProject.value;
  var msg = {};
  msg["namePledge"] = namePledge;
  msg["supporterID"] = supporterID;
  msg["nameProject"] = nameProject;
  let value = JSON.stringify(msg);
  let data = {};
  data = {
    'body': value
  };

  instance.post("/claimPledge", data).then(function (response) {
    console.log(response);
  }).catch(function (error) {
    console.log(error);
  });
}


//delete pledge (designer)
export function handleDeletePledgeClick(e) {
  let form = document.deletePledgeForm;
  var designerID = document.userInfo.userID.value;
  var nameProject = document.reviewProjectForm.nameProject.value;
  var namePledge = form.pledgeID.value;
   console.log(nameProject);
  var msg = {};
  msg["designerID"] = designerID;
  msg["nameProject"] = nameProject;
  msg["namePledge"] = namePledge;

  let value = JSON.stringify(msg);
  let data = {};
  data = {
    'body': value
  };

  instance.post("/deletePledge", data).then(function (response) {
    console.log(response);
  }).catch(function (error) {
    console.log(error);
  });
}


//delete project (designer)
export function handleDeleteProjectClick(e) {
  let form = document.deleteProjectForm;
  var designerID = document.userInfo.userID.value;
  var nameProject = form.projectName.value; 

  var msg = {};
  msg["designerID"] = designerID;
  msg["nameProject"] = nameProject;

  let value = JSON.stringify(msg);
  let data = {};
  data = {
    'body': value
  };

  instance.post("/deleteProject", data).then(function (response) {
    console.log(response);
  }).catch(function (error) {
    console.log(error);
  });
}


//launch project (designer)
export function handleLaunchProjectClick(e) {
  var nameProject = document.reviewProjectForm.nameProject.value;
  var designerID = document.userInfo.userID.value
  
  var msg = {};
  msg["nameProject"] = nameProject;
  msg["designerID"] = designerID;
  let value = JSON.stringify(msg);
  let data = {};
  data = {
    'body': value
  };

  instance.post("/launchProject", data).then(function (response) {
    console.log(response);
    handleReviewProjectClick(e);
  }).catch(function (error) {
    console.log(error);
  });
}


//fill info after logged in (login storage)
function fillUserInfo(role, email, name) {
  var form = document.userInfo;
  form.userID.value = email;
  form.userRole.value = role;
  form.userName.value = name;
}

function handleUserVisibility(role){
  switch(role){
    case "Designer":
      document.getElementById("listProjects").style.visibility = "visible";
      document.getElementById("reviewProject").style.visibility = "visible";
      document.getElementById("displayProject").style.visibility = "visible";
      document.getElementById("createProject").style.visibility = "visible";
      document.getElementById("createPledge").style.visibility = "visible";
      document.getElementById("deleteProject").style.visibility = "visible";
      document.getElementById("deletePledge").style.visibility = "visible";
      document.getElementById("launchProject").style.visibility = "visible";
      break;
    case "Admin":
      document.getElementById("listProjects").style.visibility = "visible";
      break;
    case "Supporter":
      document.getElementById("listProjects").style.visibility = "hidden";
      document.getElementById("reviewProject").style.visibility = "hidden";
      document.getElementById("displayProject").style.visibility = "hidden";
      document.getElementById("createProject").style.visibility = "hidden";
      document.getElementById("createPledge").style.visibility = "hidden";
      document.getElementById("deleteProject").style.visibility = "hidden";
      document.getElementById("deletePledge").style.visibility = "hidden";
      break;
  }
}


