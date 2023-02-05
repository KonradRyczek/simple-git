import React from "react";
import * as AiIcons from "react-icons/ai"

const RepoCard = ({data}) => {

  const access_token = "Bearer " + localStorage.getItem("access_token")
  //const username = localStorage.getItem("username", username);
  const username = localStorage.getItem("username");
  // const reponame = 

  console.log("RepoCard " + data);

  const otworzRepo = (e) => {
    console.log("e: " + e);
    const reponame = e;
    localStorage.setItem("reponame", reponame);


    // var jsonData = {
    //     "repoName": e,
    //   //  "username": username
    // }
      // e.preventDefault()
    
      fetch('http://localhost:3333/gitosis/'+username+'/'+reponame, { 

          method: 'GET',
          mode: 'cors',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': access_token

          }
          // body: JSON.stringify(jsonData)


      }).then((response) => {

          if (!response.ok) {
              throw new Error(`HTTP error: ${response.status}`);
          }

          return response.json();

      }).then((responseData) => {
        
          console.log(responseData)
          window.location.pathname ="/"+ username + '/' + reponame;

      })
          .catch((error) => {
              console.log(error)
              alert("Coś poszło nie tak :(")
          })
  }

 
  const usunRepo = (e) => {
    const reponame1 = localStorage.getItem("reponame");
    console.log(reponame1)

    var jsonData = {
      "repoName":reponame1
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

            setTimeout(() => {
            window.location.reload();
            }, 500);

      })
          .catch((error) => {
              console.log(error)
            //  alert("Coś poszło nie tak :(")
          })
  }

console.log(data+"data")
  return (
    <>
   {data.map((exp)=>{   
            return(
                <div className="repo">
                  <a className="repoName" onClick={() => otworzRepo(exp.reponame)}>{exp.reponame}</a>
                  {/* <a  onClick={otworzRepo(exp.repoName)}>{exp.reponame}</a>     */}
                  <a onClick={usunRepo}><AiIcons.AiFillDelete/></a>  
                </div>     
            )
           })}
   
    </>
  );
};

export default RepoCard;