import React ,{ useState, state }from "react";
import styles  from "../styles/globe.css";


import { Link } from "react-router-dom";
import {usr} from "../components/GlobalVar"


const SignInForm = ({ }) => {

 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");

  
  var jsonData = {
    "email": email, 
    "password": password, 
  }
 
  const handleSubmit = (e) =>{
      e.preventDefault()
      //console.log(email, password)

      //localStorage.setItem('state', JSON.stringify(state)); 
     
      fetch('http://localhost:3333/auth/signin', {  //IP address 

      method: 'POST', 
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonData) 
       
    }) .then((response) => {
      // Our handler throws an error if the request did not succeed.
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      return response.json();
   
    }).then((responseData) => {
      console.log(responseData.username)
      const username = responseData.username
      localStorage.setItem("username",username);


      window.location.pathname = "/dashboard/"+username 
  
   
    }).then((responseData) => {
      const username = responseData.username
      window.location.pathname = "/dashboard/"+username 
    })

    .catch((error) => {
     console.log(error)
     alert("Błędny login lub hasło")
    })
   


  } 

  const validateInput = e => {
        
  }

  return (
    <div className="col-md-9 mx-auto">
		<form className="formularz form-group mb-1"  onSubmit={handleSubmit}> 
 <input
    className="form-control shadow-none my-1"
   type="text"
   name="email"
   placeholder='Enter E-mail'
   value = { email }
    onChange = {(e) => setEmail(e.target.value)}
    onBlur={validateInput}
   >
    
   </input>
 

 <input
  className="form-control shadow-none my-1"
   type="password"
   name="password"
   placeholder='Enter Password'
   value = { password }
    onChange = {(e) => setPassword(e.target.value)}
    onBlur={validateInput}
   ></input>
<input type="submit" value="Submit"/>
</form>
    </div>
  );
};

export default SignInForm;
