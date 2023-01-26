import React, { useState, state } from "react";
import RepoCard from "./RepoCard";

const ChoseRepo =  ({ }) => {

  const access_token = "Bearer " + localStorage.getItem("access_token")
  const username = localStorage.getItem("username");
  const tab = []
  const flag = false

  async function WaitingforRepos()  {

    //const url = "http://localhost:3333/gitosis/:"+username

  await  fetch('http://localhost:3333/gitosis/' + username, {

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

    }).then( (responseData) => {
      console.log(responseData.repositories[0].reponame)
      
      tab.push(responseData.repositories)
      const reponame = responseData.repositories[0].reponame
      localStorage.setItem("reponame", reponame);
     

    })

      .catch((error) => {
        console.log(error)
      })


  }


 // WaitingforRepos.then()

  return (

    WaitingforRepos() ?
    <>

      <RepoCard data={tab} />
      <p>{tab[0]}aaaa</p>
    </>
     :
      WaitingforRepos() 


  );


};

export default ChoseRepo;
