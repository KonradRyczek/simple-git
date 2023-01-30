import React, { useState, state } from "react";
import "../styles/user.css";
import setAuthToken from "../components/setAuthToken"
import { Link } from "react-router-dom";
import { usr } from "../components/GlobalVar"

const CreateRepoForm = ({ }) => {

    const access_token = "Bearer " + localStorage.getItem("access_token")

    const [repoName, setRepoName] = useState("");

    var jsonData = {
        "repoName": repoName,
    }
    console.log(jsonData)
    console.log(access_token)

    const handleSubmit = (e) => {
        e.preventDefault()

        fetch('http://localhost:3333/gitosis/createPrivateRepo', { 

            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': access_token

            },
            body: JSON.stringify(jsonData)


        }).then((response) => {

            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }

            return response.json();

        }).then((responseData) => {
            alert("Pomyślnie stworzono Repozytorioum")

        })
            .catch((error) => {
                console.log(error)
             //   alert("Coś poszło nie tak :(")
            })


    }

    return (
        <div className="">
            <form className="form-group mx-auto" onSubmit={handleSubmit}>
            <label  className="p-3" for="CreateRepo">Create new Repository</label>
                <div className="d-flex align-items-center justify-content-center">
                <input
                    className="form-control-repo shadow-none"
                    type="text"
                    name="repoName"
                    placeholder='Enter the name of the repository'
                    id="repoName"
                    value={repoName}
                    onChange={(e) => setRepoName(e.target.value)}
                    //onBlur={validateInput}
                >
                </input>
                <input className="create" type="submit" value="Create"/>
                </div>  
            </form>
        </div>
    );
};

export default CreateRepoForm;
