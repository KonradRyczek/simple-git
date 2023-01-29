// import { setDefaultResultOrder } from "dns";
import React, { useState, state, useEffect } from "react";
import RepoCard from "./RepoCard";

// const ChoseRepo =  ({ }) => {
//   const [result, setResult] = useState();

//   const access_token = "Bearer " + localStorage.getItem("access_token")
//   const username = localStorage.getItem("username");
//   const tab = []
//   const flag = false

//   const fetchRepos = async () => {
//     const response = await WaitingforRepos();
//     setResult(response);
//   }

//   async function WaitingforRepos()  {

//     //const url = "http://localhost:3333/gitosis/:"+username
//     fetch('http://localhost:3333/gitosis/' + username, {

//       method: 'GET',
//       mode: 'cors',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': access_token

//       },

//     }).then((response) => {

//       if (!response.ok) {
//         throw new Error(`HTTP error: ${response.status}`);
//       }
//       return response.json();

//     }).then( (responseData) => {
//       console.log(responseData.repositories[0].reponame)
//       tab.push(responseData.repositories)
//       const reponame = responseData.repositories[0].reponame
//       localStorage.setItem("reponame", reponame);
     

//     }).catch((error) => {
//         console.log(error)
//     })

//     console.log("tab: " + tab);
//   }

//   useEffect(() => {
//     fetchRepos();
//   }, []);


//   return (

//     WaitingforRepos() ?
//     <>

//       <RepoCard data={tab} />
//       <p>{tab[0]}aaaa</p>
//     </>
//      :
//       WaitingforRepos() 


//   );


// };

// export default ChoseRepo;

const ChoseRepo =  ({ }) => {
  const [result, setResult] = useState();

  const access_token = "Bearer " + localStorage.getItem("access_token")
  const username = localStorage.getItem("username");

  const fetchRepos = async () => {
    const response = await WaitingforRepos();
    setResult(response);
  }

  async function WaitingforRepos()  {
    try {
      const response = await fetch(`http://localhost:3333/gitosis/${username}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': access_token
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      const responseData = await response.json();
      // console.log(responseData.repositories[0].reponame);
      // localStorage.setItem("reponame", responseData.repositories[0].reponame);
      return responseData;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchRepos();
  }, []);

  if (result === undefined) {
    return <p>Loading...</p>;
  } else {
    return <RepoCard data={result.repositories} />;
  }
};

export default ChoseRepo;