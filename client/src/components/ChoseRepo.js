import React, { useState, state } from "react";
import styles from "../styles/globe.css";
import RepoCard from "./RepoCard";

const ChoseRepo = ({ }) => {

  const access_token = "Bearer " + localStorage.getItem("access_token")
  const username = "zark" //localStorage.getItem("username", username);
  const tab = []
  const flag = false

  async function WaitingforRepos() {

    //const url = "http://localhost:3333/gitosis/:"+username

    fetch('http://localhost:3333/gitosis/' + username, {

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

    }).then(async (responseData) => {
      //console.log(responseData)
      
      tab.push(responseData)
      console.log(tab)//tab.push("test")
      flag = true

    })

      .catch((error) => {
        console.log(error)
      })

      return flag
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
