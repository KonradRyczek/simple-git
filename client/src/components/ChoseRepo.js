import React, { useState, state } from "react";
import styles from "../styles/globe.css";
import RepoCard from "./RepoCard";

const ChoseRepo = ({ }) => {
    const access_token = "Bearer " + localStorage.getItem("access_token")
    const tab = []

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
  
     tab.push(responseData)

    })
  
      .catch((error) => {
        console.log(error)
      })

    
    return (
        <>
       <RepoCard data={tab}/>
        </>
    ); 
};

export default ChoseRepo;
