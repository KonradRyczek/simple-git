import React, { useState, state } from "react";
import styles from "../styles/globe.css";

import setAuthToken from "../components/setAuthToken"
import { Link } from "react-router-dom";
import { usr } from "../components/GlobalVar"

const SignInForm = ({ }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  var jsonData = {
    "email": email,
    "password": password,
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    fetch('http://localhost:3333/auth/signin', {

      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
        //"Authorization" : {access_token}

      },
      body: JSON.stringify(jsonData)


    }).then((response) => {

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      return response.json();

    }).then((responseData) => {

      const access_token = responseData.access_token

      localStorage.setItem("access_token", access_token);
      setAuthToken(access_token);
      console.log(responseData.access_token)
      console.log(jsonData)
      window.location.pathname = "/dashboard"//+access_token 


    })/*.then((responseData) => {
      const access_token = responseData.access_token
      window.location.pathname = "/dashboard/"+access_token 
    })*/

      .catch((error) => {
        console.log(error)
        alert("Błędny login lub hasło")
        
       
      })



      

  }

  const validateInput = e => {

  }

  return (
    <div className="col-md-9 mx-auto default-text "style={{color: "black"}}>
      <form className="formularz form-group mb-1 col-md-9 border border-4 border-primary p-4 rounded" onSubmit={handleSubmit}>
        <label for="loginEmain">E-mail:</label><br />
        <input
          className="form-control shadow-none mb-4"
          type="text"
          name="email"
          placeholder='Enter E-mail'
          id="loginEmain"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={validateInput}
        >

        </input>

        <label for="loginPassword">Password:</label><br />
        <input
          className="form-control shadow-none mb-4"
          type="password"
          name="password"
          placeholder='Enter Password'
          id="loginPassword"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={validateInput}
         
        ></input>
        <input className="btn btn-primary w-100" type="submit" value="Zaloguj" />
      </form>
    </div>
  );
};

export default SignInForm;
