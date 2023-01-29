import React ,{ useState }from "react"; 
import "../styles/user.css";
import explorer from "../data/folderData";
import UserHeader from "../components/UserHeader";
import Folder from "../components/Folder";
import CreateRepoForm from "../components/CreateRepoForm";
import ChoseRepo from "../components/ChoseRepo";
import Footer from "../components/Footer";

const UserMainPage = () => {

const access_token = "Bearer " + localStorage.getItem("access_token")
const username = localStorage.getItem("username");
const reponame = localStorage.getItem("username"); //default

fetch('http://localhost:3333/gitosis/'+username+'/'+reponame+'/branches', {

    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': access_token

    },

  }).then((response) => {

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();

  }).then((responseData) => {

    const branches = responseData.branches
    localStorage.setItem("branches", branches);
    console.log("user: "+username+" reponame: "+reponame +" branches: "+branches )

  })

    .catch((error) => {
      console.log(error)
    })

// const [explorerData, setExplorerData] = useState(explorer);
	
return (
  <>
  <div className="background-user">
	  <div>
		  <UserHeader></UserHeader>
	  </div>
    <div className="dashboard container-xl d-flex flex-column align-items-center p-responsive height-full position-relative z-1">
      <h1 className="text-center"> Hello {localStorage.getItem('username')}, here is your Dashboard</h1>
      <br />
        <CreateRepoForm/>
      <hr/>
    <div>
    <h1 className="text-center">My repositories</h1>
      <ChoseRepo/>
    </div>
    </div>
    <div>
				<Footer />
			</div>
  </div>
</>
  );
};

export default UserMainPage;