import React from "react";
import * as AiIcons from "react-icons/ai"

const RepoCard = ({data}) => {

  const access_token = "Bearer " + localStorage.getItem("access_token")
  //const username = localStorage.getItem("username", username);
  const otworzRepo = (e) => {

    var jsonData = {
      "repoName": e.name,
    //  "username": username
  }
      e.preventDefault()

      fetch('http://localhost:3333/gitosis/:username/:reponame', { 

          method: 'GET',
          mode: 'cors',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': access_token

          },
          body: JSON.stringify(jsonData)


      }).then((response) => {

          if (!response.ok) {
              throw new Error(`HTTP error: ${response.status}`);
          }

          return response.json();

      }).then((responseData) => {
        
          console.log(responseData)
          window.location.pathname = "/user/repository"

      })
          .catch((error) => {
              console.log(error)
              alert("Coś poszło nie tak :(")
          })
  }

 
  const usunRepo = (e) => {

    var jsonData = {
      "repoName": e.name,
  }
      e.preventDefault()

      fetch('http://localhost:3333/gitosis/deletePrivateRepo', { 

          method: 'POST',
          mode: 'cors',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': access_token

          },
          body: JSON.stringify(jsonData)


      }).then((response) => {

          if (!response.ok) {
              throw new Error(`HTTP error: ${response.status}`);
          }

          return response.json();

      }).then((responseData) => {
          alert("Pomyślnie Usunięto Repozytorioum")

      })
          .catch((error) => {
              console.log(error)
              alert("Coś poszło nie tak :(")
          })
  }

console.log(data)
  return (
    <>
   {data.map((exp)=>{   
            return(
              <div className="border">
                <p  key={exp.id} onClick={otworzRepo}>{exp.username}</p>    
                <p onClick={usunRepo}><AiIcons.AiFillDelete/></p>  
              </div>     
            )
           })}
   
    </>
  );
};

export default RepoCard;