import React, { useState } from "react";
import "../styles/user.css";
import { Route, Navigate } from 'react-router-dom';
import explorer from "../data/folderData";
import UserHeader from "../components/UserHeader";
import Folder from "../components/Folder";

function hasJWT() {
    let flag = false;
    localStorage.getItem("access_token") ? flag = true : flag = false
    return flag
}

const UserBranches = () => {

    const [explorerData, setExplorerData] = useState(explorer);

    return (
        hasJWT() ?
            <>
            <div className="background-user">
                <div className="">
                    <UserHeader></UserHeader>
                </div>
                <div>
                    <p>List of branches</p>
                </div>
            </div>
            </>
            :
            <Navigate to='/' />
    );
};

export default UserBranches;