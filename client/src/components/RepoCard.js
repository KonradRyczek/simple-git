import React from "react";
import * as AiIcons from "react-icons/ai"

const RepoCard = ({data}) => {

  const access_token = "Bearer " + localStorage.getItem("access_token")
 
  const handleSubmit = (e) => {

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
                <p key={exp.id}>{exp.username}</p>    
                <p onClick={handleSubmit}><AiIcons.AiFillDelete/></p>  
                </div>     
            )
           })}
   
    </>
  );
};

export default RepoCard;