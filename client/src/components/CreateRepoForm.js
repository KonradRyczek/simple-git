import React, { useState, state } from "react";
import styles from "../styles/globe.css";

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
            <form className="form-group " onSubmit={handleSubmit}>
            <label  className="p-3" for="CreateRepo">Stwórz Repozytorioum</label>
                <input
                    className="form-control shadow-none w-25 d-inline-block ml-2 mt-2 "
                    type="text"
                    name="repoName"
                    placeholder='Wprowadź nazwę Repozytorioum'
                    id="repoName"
                    value={repoName}
                    onChange={(e) => setRepoName(e.target.value)}
                    //onBlur={validateInput}
                >
                </input>
                <input className="btn btn-dark mb-2 float-right" type="submit" value="Stwórz"/>  
            </form>
        </div>
    );
};

export default CreateRepoForm;
