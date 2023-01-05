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
  //  console.log(e.target.files[0])
	};

  var jsonData = {
    username,
    password,
    email,
    File: pubKey,
  }

  const handleSubmit = (e) => {
    validateInput(e)
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
    // Zresetuj komunikaty błędów
    document.getElementById("username-error").innerHTML = "";
    document.getElementById("password-error").innerHTML = "";
    document.getElementById("confirm-password-error").innerHTML = "";
    document.getElementById("email-error").innerHTML = "";
    
    // Pobierz dane z formularza rejestracji
    const username = document.getElementById('rejestracjaUsername').value;
    const password = document.getElementById('rejestracjaPasswd').value;
    const confirmPassword = document.getElementById('rejestracjaPasswdConf').value;
    const email = document.getElementById('rejestracjaEmail').value;
  
    // Zmienna do przechowywania błędów
    let errors = false;
  
    // Walidacja nazwy użytkownika
    if (!username) {
      document.getElementById('username-error').innerHTML = 'Wprowadź nazwę użytkownika';
      errors = true;
    } else if (!/^[a-zA-Z0-9]{3,18}$/.test(username)) {
      document.getElementById('username-error').innerHTML = '<span style="color: red;">Nazwa użytkownika powinna zawierać od 3 do 18 znaków alfanumerycznych';
      errors = true;
    }
  
    // Walidacja hasła
    if (!password) {
      document.getElementById('password-error').innerHTML = 'Wprowadź hasło';
      errors = true;
    } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{7,19}$/.test(password)) {
      document.getElementById('password-error').innerHTML = '<span style="color: red;">Hasło powinno zawierać od 7 do 19 znaków, w tym co najmniej jedną literę, jedną cyfrę i jeden znak specjalny';
      errors = true;
    }
  
    // Walidacja potwierdzenia hasła
    if (!confirmPassword) {
      document.getElementById('confirm-password-error').innerHTML = 'Potwierdź hasło';
      errors = true;
    } else if (password !== confirmPassword) {
      document.getElementById('confirm-password-error').innerHTML = '<span style="color: red;">Hasła się nie zgadzają';
      errors = true;
    }

    // Walidacja adresu e-mail
    if (!email) {
      document.getElementById('email-error').innerHTML = 'Wprowadź adres e-mail';
      errors = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      document.getElementById('email-error').innerHTML = '<span style="color: red;">Adres e-mail jest niepoprawny';
      errors = true;
    }
  
    // Jeśli wystąpiły błędy, zatrzymaj przesyłanie formularza
    if (errors) {
      e.preventDefault();
      return false;
    }
  }

  return (
    <div className="col-md-6 mx-auto mt-5 border  border-4 border-primary rounded default-text" style={{ color: "black" }}>
      <form className="formularz form-group mb-1 p-4 " onSubmit={handleSubmit}>
        <label htmlFor="rejestracjaUsername">Username:</label><br />
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
        <span id="username-error" style={{ color: "red" }}>Error</span>
        <br />

        <label htmlFor="rejestracjaPasswd">Password:</label><br />
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
        <span id="password-error" style={{ color: "red" }}>Error</span>
        <PasswordStrenghtMeter password={password} />

        <label htmlFor="rejestracjaPasswdConf">Confirm Password:</label><br />
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
        <span id="password-error" style={{ color: "red" }}>Error</span>
        <br />

<label for="RsaKEY">Send SSH Public Key:</label><br />
        <input
          className="form-control shadow-none mb-4"
          type="file"
          name="PubKey"
          placeholder='PubKey'
          id="PubKey"
          onChange={changePubKey}
          onBlur={validateInput}
          //accept="pub"
        ></input>
        <span id="username-error" style={{ color: "red" }}>Error</span>
        <br />

        <label htmlFor="rejestracjaEmail">E-mail:</label><br />
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
        <span id="email-error" style={{ color: "red" }}>Error</span>
        <br />
        <input className="btn btn-primary w-100 btn-lg" type="submit" value="Rejestracja" />

        <br />
      <p className="text-muted text-center mt-3 mb-3">
        Masz już konto?{" "}
        <a href="/signin" className="text-primary">
          Zaloguj się
        </a>
      </p>
      </form>
    </div>
  );
};

export default SignUpForm;