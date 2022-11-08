import React ,{ useState ,state }from "react";
import styles  from "../styles/globe.css";



const SignUpForm = ({ }) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    
     
   
    const handleSubmit = (e) =>{
        e.preventDefault()
        console.log(username, email, password)

        state = { 
            username: username, 
            password: password, 
            email: email, 
        }
       
        localStorage.setItem('state', JSON.stringify(state)); 
        console.log( localStorage)
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