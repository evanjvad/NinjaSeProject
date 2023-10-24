import React from 'react';
import './App.css';
import { layout } from './layout.js'
import { handleLaunchProjectClick, handleDeleteProjectClick, handleDeletePledgeClick, handleClaimPledgeClick, handleViewPledgeClick, handleRegisterDesignerClick, handleRegisterAdminClick, handleCreateProjectClick , handleCreatePledgeClick, handleAdminLoginClick, handleDesignerLoginClick, handleReviewProjectClick, handleListProjectsClick, handleRegisterSupporterClick, handleSupporterLoginClick, handleSearchProjectsClick, handleViewProjectClick } from './controller/controller.js'
import { Model } from './model/Model.js';
import axios from "axios";

function App() {
  const [model, setModel] = React.useState(new Model(""));
  const [redraw, forceRedraw] = React.useState(0);
  
  // const updateListedProjects = () => {
  //   // go through and get output from the model
  //   let str = model.output;

  //   // insert HTML in the <div> with
  //   // constant-list
  //   let cd = document.getElementById('listProjects')
  //   cd.innerHTML = str
  // }

  /** Ensures initial rendering is performed, and that whenever model changes, it is re-rendered. */
  React.useEffect (() => {
    // do something
    //updateListedProjects()
  }, [model, redraw])  // this argument is critical! since it says what to do


  return (
    <main>
      {/* this stores user info, basically keeps track of who is logged in */}
      <div id="sessionInformation" style={layout.sessionInformation}>
        <label style={layout.userInfo}>User Info</label>
        <form name="userInfo">
          <input name="userRole" style={layout.userDisplayRole} placeholder="role" readOnly></input>
          <input name="userID" style={layout.userDisplayID} placeholder="email" readOnly></input>
          <input name="userName" style={layout.userDisplayName} placeholder="name" readOnly></input> 
        </form>
      </div>
     

     {/* designer registration */}
     <div id="registerDesigner" style={layout.registerDesigner}>
     <label style={layout.registerDesignerText}>Designer registration here!<br></br>Input username: </label>
     <form name="designerForm" method="post">
      <input name="designerID" style={layout.registerDesignerID} placeholder="email"></input>
      <input name="name" style={layout.registerDesignerName} placeholder="name"></input>
     </form>
     <button style={layout.registerDesignerButton} onClick={(e) => handleRegisterDesignerClick()}>Register</button>
     </div>


    {/* admin registration */}
    <div id="registerAdmin" style={layout.registerAdmin}>
     <label style={layout.registerAdminText}>Admin Registration here!<br></br>Input username:</label>
     <form name="adminRegisterForm" method="post">
      <input name="adminID" style={layout.registerAdminInputID} placeholder="email"></input>
      <input name="name" style={layout.registerAdminInputName} placeholder="name"></input>
      </form>
      <button style={layout.registerAdminButton} onClick={(e) => handleRegisterAdminClick()}>Register</button>
    </div>

    {/* designer login */}
    <div id="loginDesigner" style={layout.loginDesigner}>
      <form name="loginDesignerForm" method="post"> 
        <label style={layout.loginDesignerText}>Designer login here!</label>
        <input name="userID" placeholder="email" style={layout.loginDesignerInput}></input>
      </form>
      <button style={layout.loginDesignerButton} onClick={(e) => handleDesignerLoginClick()}>Login</button>
    </div>
    
    {/* admin login */}
    <div id="loginAdmin" style={layout.loginAdmin}>
     <label style={layout.loginAdminText}>Admin login here!</label>
     <form name="loginAdminForm" method="post"> 
      <input name="userID" style={layout.loginAdminInput} placeholder="email"></input>
     </form>
     <button style={layout.loginAdminButton} onClick={(e) => handleAdminLoginClick()}>Login</button>
    </div>
    
    {/* list projects */}
    <div id="listProjects" style={layout.listProjects}>
      <form name="listProjectsForm" method="post">
        <label style={layout.listProjectsText}>Login and click the button to list projects.</label>
        <pre>
          <label id="projectList"style={layout.listProjectsNameList}></label>
        </pre> 
      </form>
      <button style={layout.listProjectsButton} id="listProjects" onClick={(e) => handleListProjectsClick()}>List Projects</button>
    </div>

    {/* review/view project input */}
    <div id="reviewProject" style={layout.reviewProject}>
      <form name="reviewProjectForm" method="post">
        <label style={layout.reviewProjectText}>Review Project: </label>
        <input name="nameProject" style={layout.reviewProjectInput} placeholder="name"></input>
      </form>
      <button style={layout.reviewProjectButton} onClick={(e) => handleReviewProjectClick()}>Review</button>
    </div>

    {/* review/view project output */}
    <div id="displayProject" style={layout.displayProject}>
      <form name="actualView" method="post">
        <label style={layout.displayProjectText}>Project Review: </label>
        <input name="nameProject" style={layout.displayProjectName} placeholder="Project Name" readOnly></input>
        <input name="story" style={layout.displayProjectStory} placeholder="Story" readOnly></input>
        <input name="genre" style={layout.displayProjectGenre} placeholder="Genre" readOnly></input>
        <input name="goal" style={layout.displayProjectGoal} placeholder="Goal" readOnly></input>
        <input name="deadline" style={layout.displayProjectDeadline} placeholder="Deadline" readOnly></input>
        <input name="isLaunched" style={layout.displayProjectLaunched} placeholder="Launched?" readOnly></input>
        <input name="currentFunding" style={layout.displayProjectFunding} placeholder="Current Funding" readOnly></input>
        <label style={layout.displayProjectPledgesText}>Pledges:</label>
        <pre>
          <label name="pledges" id="pledges" style={layout.displayProjectPledges}></label>
        </pre> 
      </form>
    </div>

    {/* create project */}
    <div id="createProject" style={layout.createProject}>
     <form name="createProjectForm" method="post">
      <label style={layout.createProjectText}>Create Project: </label>
      <input name="nameProject" style={layout.createProjectInputName} placeholder="project name"></input>
      <input name="story" style={layout.createProjectInputStory} placeholder="story"></input>
      <input name="goal" style={layout.createProjectInputGoal} placeholder="goal (exclude the $)"></input>
      <input name="deadline" style={layout.createProjectInputDeadline} placeholder="deadline, ex: JAN-01-70"></input>
      <input name="genre" style={layout.createProjectGenre} placeholder="project genre"></input>

      </form>
      <button style={layout.createProjectButton} onClick={(e) => handleCreateProjectClick()}>Create</button>
     </div>


    {/* create pledge */}
    <div id="createPledge" style={layout.createPledge}>
     <form name="createPledgeForm" method="post">
      <label style={layout.createPledgeText}>Create Pledge: </label>
      <input name="nameProject" style={layout.createPledgeInputProjectName} placeholder="project name"></input>
      <input name="namePledge" style={layout.createPledgeInputName} placeholder="pledge name"></input>
      <input name="dollarAmount" style={layout.createPledgeInputAmount} placeholder="amount (exclude the $)"></input>
      <input name="reward" style={layout.createPledgeInputReward} placeholder="reward"></input>
      <input name="supportersMax" style={layout.createPledgeInputMax} placeholder="max supporters"></input>
     </form>
     <button style={layout.createPledgeButton} onClick={(e) => handleCreatePledgeClick()}>Create</button>
    </div>

    {/* supporter registration */}
    <div name="registerSupporter" style={layout.registerSupporter}>
      <label style={layout.registerSupporterText}>Supporter registration here!<br></br>Input username: </label>
      <form name="registerSupporterForm" method="post">
        <input name="supporterID" style={layout.registerSupporterID} placeholder="email"></input>
        <input name="supporterName" style={layout.registerSupporterName} placeholder="name"></input>
      </form>

      <button style={layout.registerSupporterButton} onClick={(e) => handleRegisterSupporterClick()}>Register</button>
     </div>


    {/* supporter login */}
    <div name="loginSupporter" style={layout.loginSupporter}>
    <label style={layout.loginSupporterText}>Supporter login here!</label>
     <form name="loginSupporterForm" method="post">
      <input name="supporterID" style={layout.loginSupporterID} placeholder="email"></input>
     </form>

     <button style={layout.loginSupporterButton} onClick={(e) => handleSupporterLoginClick()}>Login</button>
     </div>
    

    {/* supporter search projects */}
    <div name="searchProjects" style={layout.searchProjects}>
      <label style={layout.searchProjectsText}>Search Projects</label>
      <form name="searchProjectsForm" method="post">
       <input id="genreSearch" name="genre" style={layout.searchProjectsInput} placeholder="genre"></input>
      </form>

      <button style={layout.searchProjectsButton} onClick={(e) => handleSearchProjectsClick()}>Search</button>
      <label style={layout.searchProjectsOutputText}>Projects:</label>
      <pre>
        <label name="projects" id="projects" style={layout.searchProjectsOutputProjects}></label>
      </pre>
    </div>

    {/* supporter view projects */}
    {/* <div name="searchProjects" style={layout.searchProjects}>
      <label style={layout.searchProjectsText}>Search Projects</label>
      <form name="searchProjectsForm" method="post">
       <input name="genre" style={layout.searchProjectsInput} placeholder="genre"></input>
      </form>

      <button style={layout.searchProjectsButton} onClick={(e) => handleSearchProjectsClick()}>Search</button>
      <label style={layout.searchProjectsOutputText}>Projects:</label>
      <pre>
        <label name="projects" id="projects" style={layout.searchProjectsOutputProjects}></label>
      </pre>
    </div> */}

  
    {/* supporter view project input */}
      <div name="viewProjectInput" style={layout.viewProjectInput}>
      <form name="viewProjectInputForm" method="post">
        <label style={layout.viewProjectInputText}>View Project: </label>
        <input name="nameProject" style={layout.viewProjectInputName} placeholder="name"></input>
      </form>
      <button style={layout.viewProjectInputButton} onClick={(e) => handleViewProjectClick()}>View</button>
    </div>


    {/* supporter view project output */}
    <div name="viewProjectOutput" style={layout.viewProjectOutput}>
      <form name="viewProjectOutputForm" method="post">
      <label style={layout.viewProjectOutputText}>Project View:</label>
      <input name="nameProject" style={layout.viewProjectOutputName} placeholder="Project Name" readOnly></input>
      <input name="story" style={layout.viewProjectOutputStory} placeholder="Story" readOnly></input>
      <input name="genre" style={layout.viewProjectOutputGenre} placeholder="Genre" readOnly></input>
      <input name="goal" style={layout.viewProjectOutputGoal} placeholder="Goal" readOnly></input>
      <input name="deadline" style={layout.viewProjectOutputDeadline} placeholder="Deadline" readOnly></input>
      <input name="isLaunched" style={layout.viewProjectOutputLaunched} placeholder="Launched?" readOnly></input>
      <input name="currentFunding" style={layout.viewProjectOutputFunding} placeholder="Current Funding" readOnly></input>
      <label style={layout.viewProjectOutputPledgesText}>Pledges:</label>
      <pre>
        <label name="pledges" id="pledgesSupporterView" style={layout.viewProjectOutputPledges}></label>
      </pre>
      </form>
    </div>


    {/* view pledge input (presumably usable by any user type) */}
    {/* note: for getting projectID, grab it from the viewProject input */}
    <div name="viewPledge" style={layout.viewPledgeInput}>
    <form name="viewPledgeInputForm" method="post">
        <label style={layout.viewPledgeInputText}>View Pledge:</label>
        <input name="pledgeID" id="pledgeNameID"  style={layout.viewPledgeInputName} placeholder="name"></input>
    </form>
      <button style={layout.viewPledgeInputButton} onClick={(e) => handleViewPledgeClick()}>View</button>
    </div>


   {/* view pledge output (presumably usable by any user type) */}
    <div name="pledgeView" style={layout.viewPledgeOutput}>
      <form name="pledgeView" method="post">
        <label style={layout.viewPledgeOutputText}>Pledge:</label>
        <input name="pledgeID" style={layout.viewPledgeOutputName} placeholder="Pledge Name" readOnly></input>
        <input name="projectID" style={layout.viewPledgeOutputProject} placeholder="Project Name" readOnly></input> 
        <input name="amount" style={layout.viewPledgeOutputAmount} placeholder="Amount" readOnly></input> 
        <input name="reward" style={layout.viewPledgeOutputReward} placeholder="Reward" readOnly></input>
        <input name="supportersMax" style={layout.viewPledgeOutputSupportersMax} placeholder="Max Supporters" readOnly></input>
        <label style={layout.viewPledgeOutputSupportersText}>Supporters:</label>
        <pre>
          <label name="supporters" id="supporters" style={layout.viewPledgeOutputSupporters}></label>
        </pre>
      </form>
    </div>


    {/* supporter claim pledge */}
    <div name="claimPledge" style={layout.claimPledge}>
      <form name="claimPledgeForm" method="post">
        <label style={layout.claimPledgeText}>Claim Pledge:</label>
        <input name="pledgeID" style={layout.claimPledgeName} placeholder="name"></input>
      </form>
      <button style={layout.claimPledgeButton} onClick={(e) => handleClaimPledgeClick()}>Claim Pledge</button>
    </div>


    {/* delete project (designer, admin?) */}
    <div id="deleteProject" style={layout.deleteProject}>
      <form name="deleteProjectForm" method="post">
        <label name="deleteProjectText" style={layout.deleteProjectText}>Delete Project Here</label>
        <input name="projectName" style={layout.deleteProjectName} placeholder='project name'></input>
      </form>
      <button name="deleteProjectButton"style={layout.deleteProjectButton} onClick={(e) => handleDeleteProjectClick()}>Delete</button>
    </div>


    {/* delete pledge (designer) */}
    <div id="deletePledge" style={layout.deletePledge}>
      <form name="deletePledgeForm" method="post">
        <label style={layout.deletePledgeText}>Delete Pledge:</label>
        <input name="projectID" style={layout.deletePledgeName} placeholder="project name"></input>
        <input name="pledgeID" style={layout.deletePledgeName} placeholder="pledge name"></input>
      </form>
      <button style={layout.deletePledgeButton} onClick={(e) => handleDeletePledgeClick()}>Delete</button>
    </div>


    {/* launch project (designer) */}
    <div id="launchProject" style={layout.launchProject}>
      <form name="launchProjectForm" method="post">
        <label style={layout.launchProjectText}>Launch Project<br></br>(Launch currently reviewed project)</label>
      </form>
      <button style={layout.launchProjectButton} onClick={(e) => handleLaunchProjectClick()}>Launch</button>
    </div>

    </main>
  );
}

export default App;