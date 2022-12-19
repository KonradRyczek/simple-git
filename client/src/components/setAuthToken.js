//import axios from 'axios';
 
export const setAuthToken = access_token => {
   if (access_token) {
    
      fetch('http://localhost:3333/users/me', { 

      method: 'GET',  
      headers: {   
        'Authorization' : `Bearer ${access_token}`     
      },
   
      
    })
   
   }
   else{
    //console.log("aa")
    fetch('http://localhost:3333/users/me', { 

      method: 'GET', 
      
      headers: {
        
      },
   
      
    })

   }
   

    
}
export default setAuthToken;