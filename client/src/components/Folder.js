import React ,{ useState }from "react"; 

import * as AiIcons from "react-icons/ai"
import * as DiIcons from "react-icons/di"
import * as VscIcons from "react-icons/vsc"
import * as SiIcons from "react-icons/si"

function Folder({explorer}){

const [expand, setExpand] = useState(false);


const CheckExtension = () => {
    const extension = explorer.name.split('.').pop();
    switch(extension){
        case "js":
            return <DiIcons.DiJavascript1/>;
        case "html":
            return <AiIcons.AiFillHtml5/>;
        case "css":
            return <DiIcons.DiCss3/>;
        case "json":
            return <VscIcons.VscJson/>;
        case "jsx":
            return <DiIcons.DiReact/>;
        case "tsx":
            return <SiIcons.SiTypescript/>;   
        default:
            return <AiIcons.AiFillFile/>;
    }
}

const CheckOpen = () => {
    switch(expand){
        case true:
            return <AiIcons.AiFillFolderOpen/>;
        default:
            return <AiIcons.AiFillFolder/>;
          
    }
}

const OpenFile = () => {
    const access_token = "Bearer " + localStorage.getItem("access_token")
    
    const username = localStorage.getItem("username")
    const reponame = "bbb"
    const pathToFile = "bbb"

    fetch('http://localhost:3333/gitosis/'+username+'/'+reponame+'/'+pathToFile, {
  
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': access_token
  
      },
  
    }).then((response) => {
  
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      return response.json();
  
    }).then((responseData) => {


    })
    
}


if(explorer.isFolder){
   
    return(
        <div style={{marginTop:5, fontSize:25}}>
        <div onClick={() => setExpand(!expand)} className="folder">
            <span>
                {CheckOpen()}{explorer.name}
            </span>       
        </div>

        <div style={{display: expand ? "block" : "none", paddingLeft:25}}> 
           {explorer.items.map((exp)=>{   
            return(
                <Folder explorer={exp} key={exp.id}/>             
            )
           })}
           
        </div>
    </div>
    );
    }

    if(!explorer.isFolder){
        return (
            <div className="file" onClick={() => OpenFile()} >
                <span> {CheckExtension()}{explorer.name} </span>
            </div>
        )
    }

}
export default Folder