import React, { useState, state } from "react";
import styles from "../styles/globe.css";
import PasswordStrenghtMeter from "./PasswordStrenghtMeter";


const SignUpForm = ({ }) => {



  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [pubKey, setPubKey] = useState("");


	const changePubKey = (e) => {
		setPubKey(e.target.files[0]);

	};

  var jsonData = {
    "username": username,
    "password": password,
    "email": email,
    'File':pubKey
  }



  const handleSubmit = (e) => {
    e.preventDefault()




    fetch('http://localhost:3333/auth/signup', {

      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonData)

    }).then((response) => {

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      
     console.log(response)
     //console.log("Dodano Usera")
      window.location.pathname = "/signin"
      alert("stworzono usera - zaloguj się")

      return response.json();
    })
      .catch((error) => {
        console.log(error)
        alert("Na ten emial już jest założone konto")
      })

  }

 


  const validateInput = e => {

  }



  return (
    <div className="col-md-6 mx-auto mt-5 border  border-4 border-primary rounded default-text" style={{color: "black"}}>
      <form className="formularz form-group mb-1 p-4 " onSubmit={handleSubmit}>
        <label for="rejestracjaUsername">Username:</label><br />
        <input
          className="form-control shadow-none mb-4"
          type="text"
          name="username"
          placeholder='Enter Username'
          id="rejestracjaUsername"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onBlur={validateInput}
        >
        </input>

        <label for="rejestracjaPasswd">Password:</label><br />
        <input
          className="form-control shadow-none  "
          type="password"
          name="password"
          placeholder='Enter Password'
          id="rejestracjaPasswd"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={validateInput}
        ></input>
        <PasswordStrenghtMeter password={password} />

        <label for="rejestracjaPasswdConf">Confirm Password:</label><br />
        <input
          className="form-control shadow-none mb-4"
          type="password"
          name="confirmPassword"
          placeholder='Enter Confirm Password'
          id="rejestracjaPasswdConf"
          value={confirmpassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onBlur={validateInput}
        ></input>

<label for="RsaKEY">Send RSA key:</label><br />
        <input
          className="form-control shadow-none mb-4"
          type="file"
          name="PubKey"
          placeholder='PubKey'
          id="PubKey"
          //value={pubKey}
          onChange={changePubKey}
          onBlur={validateInput}
          //accept="pub"
        ></input>

        <label for="rejestracjaEmail">E-mail:</label><br />
        <input
          className="form-control shadow-none mb-4"
          type="text"
          name="emial"
          placeholder='Enter E-mail'
          id="rejestracjaEmail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={validateInput}
        ></input>

        <input className="btn btn-primary w-100 btn-lg" type="submit" value="Rejestracja" />
      </form>
    </div>
  );
};

export default SignUpForm;