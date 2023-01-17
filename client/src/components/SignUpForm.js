import React, { useState, useEffect } from 'react';
import { isRegularExpressionLiteral } from 'typescript';
import "../styles/signup.css";
import PasswordStrenghtMeter from "./PasswordStrenghtMeter";
import { useForm } from "react-hook-form"
 
const SignUpForm = ({ }) => {
 
  const [username, setUsername] = useState("");
  const usernameError = 'Nazwa użytkownika powinna zawierać od 3 do 18 znaków alfanumerycznych';
  const [password, setPassword] = useState("");
  const passwordError = 'Hasło powinno zawierać od 7 do 19 znaków, w tym co najmniej jedną literę, jedną cyfrę i jeden znak specjalny';
  const [confirmPassword, setConfirmPassword] = useState("");
  const confirmPasswordError = 'Hasła się nie zgadzają';
  const [email, setEmail] = useState("");
  const emailError = 'Adres e-mail jest niepoprawny';
  const [pubKey, setPubKey] = useState("");
  const pubKeyError = 'Nie dodano pliku klucza publicznego'
  const [validation, setValidation] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  function validate() {
    return /^[a-zA-Z0-9]{3,18}$/.test(username) 
    && /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{7,19}$/.test(password) 
    && password === confirmPassword 
    && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    && pubKey !==""
  } 
 
  useEffect(() => {
    if (isSubmitted) {
        setValidation(validate());
    }
  }, [username, password, confirmPassword, email, pubKey, isSubmitted]);
 
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
  
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setIsSubmitted(true);
  //   if (validation) {
  //       // send the data to the server
  //       return;
  //   }
    
    
    // fetch('http://localhost:3333/auth/signup', {
 
    //   method: 'POST',
    //   mode: 'cors',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(jsonData)
 
    // }).then((response) => {
 
    //   if (!response.ok) {
    //     throw new Error(`HTTP error: ${response.status}`);
    //   }
 
    //   console.log(response)
    //   //console.log("Dodano Usera")
    //   window.location.pathname = "/signin"
    //   alert("stworzono usera - zaloguj się")
 
    //   return response.json();
    // }).catch((error) => {
    //     console.log(error)
    // })
 
  // }
  
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("pubKey", data.file[0]);
    formData.append("username", jsonData.username);
    formData.append("email", jsonData.email);
    formData.append("password", jsonData.password);

    const res = await fetch("http://localhost:3333/auth/signup", {
      method: "POST",
      body: formData,
    })
  }

  return (
    <div className="col-md-6 mx-auto mt-5 border  border-4 border-primary rounded default-text" style={{ color: "black" }}>
      <form className="formularz form-group mb-1 p-4 " onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="rejestracjaUsername">Username:</label><br />
        <input
          className="form-control shadow-none mb-4"
          type="text"
          name="username"
          placeholder='Enter Username'
          id="rejestracjaUsername"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onBlur={() => validate({'username':username})}
        >
        </input>
        { isSubmitted && !/^[a-zA-Z0-9]{3,18}$/.test(username) && <div className="error">{usernameError}</div>}
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
          onBlur={() => validate({'password':password})}
        ></input>
        {isSubmitted && !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{7,19}$/.test(password) && <div className="error">{passwordError}</div>}
        <br /><br />
        <PasswordStrenghtMeter password={password} />
 
        <label htmlFor="rejestracjaPasswdConf">Confirm Password:</label><br />
        <input
          className="form-control shadow-none mb-4"
          type="password"
          name="confirmPassword"
          placeholder='Enter Confirm Password'
          id="rejestracjaPasswdConf"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onBlur={() => validate({'confirmPassowrd':confirmPassword})}
        ></input>
        {isSubmitted && password !== confirmPassword && <div className="error">{confirmPasswordError}</div>}
        <br />
 
        <label htmlFor="RsaKEY">Send SSH Public Key:</label><br />
        <input
          className="form-control shadow-none mb-4"
          type="file" {...register("file")}
          // name="PubKey"
          // placeholder='PubKey'
          // id="PubKey"
          //value={pubKey}
          onChange={changePubKey}
          accept="pub"
        ></input>
        {isSubmitted && pubKey == "" && <div className="error">{pubKeyError}</div>}
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
          onBlur={() => validate({'email':email})}
        ></input>
        {isSubmitted && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && <div className="error">{emailError}</div>}
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