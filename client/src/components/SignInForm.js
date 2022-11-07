import React ,{ useState, state }from "react";
import styles  from "../styles/globe.css";



const SignInForm = ({ }) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  
   
 
  const handleSubmit = (e) =>{
      e.preventDefault()
      console.log(username, password)

      state = { 
          username: username, 
          password: password, 
      }
     
      localStorage.setItem('state', JSON.stringify(state)); 
      console.log( localStorage)
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