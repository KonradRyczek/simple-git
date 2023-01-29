import React ,{ useState }from "react"; 

import explorer from "../data/folderData";
import UserHeader from "../components/UserHeader";
import Folder from "../components/Folder";
import CreateRepoForm from "../components/CreateRepoForm";
import ChoseRepo from "../components/ChoseRepo";

const UserMainPage = () => {

const access_token = "Bearer " + localStorage.getItem("access_token")
const username = localStorage.getItem("username");
// const reponame = localStorage.getItem("username"); //default

// fetch('http://localhost:3333/gitosis/'+username+'/'+reponame+'/branches', {

//     method: 'GET',
//     mode: 'cors',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': access_token

//     },

//   }).then((response) => {

//     if (!response.ok) {
//       throw new Error(`HTTP error: ${response.status}`);
//     }
//     return response.json();

//   }).then((responseData) => {

//     const branches = responseData.branches
//     localStorage.setItem("branches", branches);
//     console.log("user: "+username+" reponame: "+reponame +" branches: "+branches )

//   })

//     .catch((error) => {
//       console.log(error)
//     })
// const [explorerData, setExplorerData] = useState(explorer);
	
return (
  <>
	<div className="">
		<UserHeader></UserHeader>
	</div>
  <div>
  <h1 className="text-center"> Witaj {localStorage.getItem('username')} oto twój Dashboard</h1>
  <CreateRepoForm/>
  
  </div>
  <hr/>
  <div>
    <h1 className="text-center">Moje repozytoria</h1>
    <ChoseRepo/>
  </div>

</>
  );
};

export default UserMainPage;