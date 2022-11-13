import React ,{ useState, state }from "react";
import styles  from "../styles/globe.css";


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
       
    })
    .catch((error) => {
      console.log(error)
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
   name="email"
   placeholder='Enter email'
   value = { email }
    onChange = {(e) => setEmail(e.target.value)}
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