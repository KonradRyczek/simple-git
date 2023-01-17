import React, { useState } from "react";
import { Route, Navigate } from 'react-router-dom';
import explorer from "../data/folderData";
import UserHeader from "../components/UserHeader";
import Folder from "../components/Folder";

function hasJWT() {
    let flag = false;
    localStorage.getItem("access_token") ? flag = true : flag = false
    return flag
}

function GetRepoTree(){
    
}

const UserRepository = () => {

    const [explorerData, setExplorerData] = useState(explorer);






    return (
        hasJWT() ?
            <>
                <div className="">
                    <UserHeader></UserHeader>
                </div>
                <div>

                </div>

                <div className="  row mx-auto mt-1 vh-100">
                    <div className=" col-6 align-items-center">
                        <Folder explorer={explorerData} />
                    </div>
                    <div className="fileTresc col-6 border border-white rounded">
                        <p>Kod źródłowy pliku pobrany jsonem</p>
                        {//<p>{localStorage.getItem('plik')}</p>
                        }
                    </div>

                </div>

            </>
            :
            <Navigate to='/' />
    );
};

export default UserRepository;