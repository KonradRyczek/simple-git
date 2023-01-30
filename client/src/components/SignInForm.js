import React, { useState, useEffect, state } from "react";

import setAuthToken from "../components/setAuthToken"
import { Link } from "react-router-dom";
import { usr } from "../components/GlobalVar"

const SignInForm = ({ }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginError = 'Błędny login lub hasło';
  const [validation, setValidation] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const validate = () => {
    return email.trim() !== "" && password.trim() !== ""
  }
 
  useEffect(() => {
    if (isSubmitted) {
        setValidation(validate());
    }
  }, [email, password]);

  var jsonData = {
    "email": email,
    "password": password,
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitted(true);
    if (validation) {
        // send the data to the server
        return;
    }
    
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
      console.log(responseData.user.username)
      if (responseData.access_token) {
      const access_token = responseData.access_token 
      const username = responseData.user.username
      const email = responseData.user.email
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("username", username);
      localStorage.setItem("email", email);
      setAuthToken(access_token);
      console.log(responseData.access_token)
     // console.log(jsonData)
      window.location.pathname = "/"+username //+access_token 
      }

    }).catch((error) => {
        console.log(error)
        //alert("Błędny login lub hasło")
        if(error.message === 'HTTP error: 401' 
        || error.message === 'HTTP error: 403'){
          setErrorMessage(loginError);
      }
      })
      /*.then((responseData) => {
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
      <form className="signin-form mx-auto mt-5 default-text" onSubmit={handleSubmit}>
        <label htmlFor="loginEmain"><h2>E-mail:</h2></label><br />
        <input
          className="form-control shadow-none mb-4"
          type="text"
          name="email"
          placeholder='Enter E-mail'
          id="loginEmain"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => validate({'email':email})}
        ></input>

        <label htmlFor="loginPassword"><h2>Password:</h2></label><br />
        <input
          className="form-control shadow-none mb-4"
          type="password"
          name="password"
          placeholder='Enter Password'
          id="loginPassword"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => validate({'password':password})}      
        ></input>
        {/* {isSubmitted && ((email.trim() === "" ? "error" : "") || (password.trim() === "" ? "error" : "")) && <div className="error">{loginError}</div>} */}
        {isSubmitted && ((email.trim() === "" || errorMessage ) ? <div className="error">{loginError}</div> : "")}
        <br />
        <input className="sign-submit w-25" type="submit" value="Sign In" />
      </form>
  );
};

export default SignInForm;
