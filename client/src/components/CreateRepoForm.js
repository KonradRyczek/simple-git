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
                alert("Coś poszło nie tak :(")
            })
    }

    

    return (
        <div className="">
            <form className="form-group mb-1 p-4 " onSubmit={handleSubmit}>
                <input
                    className="form-control shadow-none mb-4"
                    type="text"
                    name="repoName"
                    placeholder='Enter Name of your Repository'
                    id="repoName"
                    value={repoName}
                    onChange={(e) => setRepoName(e.target.value)}
                    //onBlur={validateInput}
                >
                </input>
                <input className="btn btn-dark" type="submit" value="Stwórz" />
            </form>
        </div>
    );
};

export default CreateRepoForm;
