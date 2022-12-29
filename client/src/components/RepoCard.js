import React from "react";

const RepoCard = ({data}) => {

console.log(data)
  return (
    <>
   {data.map((exp)=>{   
            return(
                <p key={exp.id}>{exp.username}</p>           
            )
           })}
   
    </>
  );
};

export default RepoCard;