import React ,{ useState, state }from "react";
import styles  from "../styles/globe.css";



const SignInForm = ({ }) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  
  var jsonData = {
    "username": username, 
    "password": password, 
  }
 
  const handleSubmit = (e) =>{
      e.preventDefault()
      //console.log(username, password)

      //localStorage.setItem('state', JSON.stringify(state)); 
     
      fetch('http://localhost:3333/', {  //IP address 

      method: 'POST', 
      mode: 'cors', 
      body: JSON.stringify(jsonData) // body data type must match "Content-Type" header
       
    })
    console.log( JSON.stringify(jsonData) )

  } 

  const validateInput = e => {
        
  }

  return (
    <div className="formularz">
		<form className="formularz"  onSubmit={handleSubmit}> 
 <input
   type="text"
   name="username"
   placeholder='Enter Username'
   value = { username }
    onChange = {(e) => setUsername(e.target.value)}
    onBlur={validateInput}
   >
    
   </input>
 

 <input
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