import React ,{ useState }from "react"; 

import explorer from "../data/folderData";
import UserHeader from "../components/UserHeader";
import Folder from "../components/Folder";
import CreateRepoForm from "../components/CreateRepoForm";
import ChoseRepo from "../components/ChoseRepo";

const UserMainPage = () => {

  const access_token = "Bearer " + localStorage.getItem("access_token")

  fetch('http://localhost:3333/users/me', {

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

    const email = responseData.email
    localStorage.setItem("email", email);
    const username = responseData.username
    localStorage.setItem("username", username);

  })

    .catch((error) => {
      console.log(error)
    })


// const [explorerData, setExplorerData] = useState(explorer);
	
return (
  <>
	<div className="">
		<UserHeader></UserHeader>
	</div>
  <div>
  <p className=""> Witaj {localStorage.getItem('username')} oto twój Dashboard</p>
  <CreateRepoForm/>
  <ChoseRepo/>
  </div>

</>
  );
};

export default UserMainPage;