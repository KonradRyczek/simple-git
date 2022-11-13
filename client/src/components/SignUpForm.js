import React ,{ useState ,state }from "react";
import styles  from "../styles/globe.css";



const SignUpForm = ({ }) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    
    var jsonData = {
      "username": username, 
      "password": password, 
      "email": email,  
    }
   
   
    const handleSubmit = (e) =>{
        e.preventDefault()
        //console.log(username, email, password)

        fetch('http://localhost:3333/auth/signup', {  //IP address 

        method: 'POST', 
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData) // body data type must match "Content-Type" header
         
      })
      console.log( JSON.stringify(jsonData) )
       
    }

    
    const validateInput = e => {
        
      }
    
    
      
  return (
    <div >
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
 

 <input
   type="password"
   name="confirmPassword"
   placeholder='Enter Confirm Password'
   value = { confirmpassword }
    onChange = {(e) => setConfirmPassword(e.target.value) }
    onBlur={validateInput}
   ></input>

<input
    type="text"
    name="emial"
    placeholder='Enter E-mail'
    value = { email }
    onChange = {(e) => setEmail(e.target.value) }
    onBlur={validateInput}
   ></input>

<input type="submit" value="Submit"/>
</form>
    </div>
  );
};

export default SignUpForm;