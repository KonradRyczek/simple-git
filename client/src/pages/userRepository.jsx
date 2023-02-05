import React, { useState } from "react";
import "../styles/repository.css";
import { Route, Navigate } from 'react-router-dom';
import explorer from "../data/folderData";
import UserHeader from "../components/UserHeader";
import Folder from "../components/Folder";
import Footer from "../components/Footer";

function hasJWT() {
    let flag = false;
    localStorage.getItem("access_token") ? flag = true : flag = false
    return flag
}

function GetRepoTree(){
    
}

const UserRepository = () => {

    const [explorerData, setExplorerData] = useState(explorer);
    const username = localStorage.getItem("username");

    return (
        hasJWT() ?
            <>
            <div className="background-user">
                <UserHeader/>
                <div className="repository container-xl d-flex flex-column align-items-center p-responsive height-full position-relative z-1 px-5">
                    <div className="branches d-flex flex-row w-100">
                        {localStorage.getItem('username')}/simple-git
                        <div class="dropdown">
                            <button class="branches-button dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Master
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a class="dropdown-item" href="#">Develop</a>
                                <a class="dropdown-item" href="#">Branch Two</a>
                                <a class="dropdown-item" href="#">Branch Three</a>
                            </div>
                        </div>
                    </div>
                    <div className="row mx-auto mt-5 w-100">
                        <div className="tree col-3 align-items-center">
                            <Folder explorer={explorerData} />
                        </div>
                        <div className="gap col-1 align-items-center"></div>
                        <div className="file-code col-8">
                            <p>
                            <pre>
                            <code>
                                @Post('/:username/:reponame/branches') <br />
                                async createRepoBranch( <br />
                                @Param('username') username : string, <br />
                                @Param('reponame') reponame : string, <br />
                                @GetUser() user: User, <br />
                                @Body() body: any) <br />
                                <br />
                                if (user.username !== username) <br />
                                throw new UnauthorizedException("This profile is private.");<br />
                                <br />
                                const createBranchDto = new CreateBranchDto();<br />
                                createBranchDto.fromBranch = body.fromBranch;<br />
                                createBranchDto.newBranch = body.newBranch;<br />
                                createBranchDto.email = user.email;<br />
                                createBranchDto.username = user.username;<br />
                                createBranchDto.repoName = reponame;<br />
                                <br />
                                const errors = await validate(createBranchDto);<br />
                                <br />
                                if (errors.length  0) <br />
                                throw HttpException message: errors, HttpStatus.BAD_REQUEST);<br />
                            </code>
                            </pre>
                            </p>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    :
    <Navigate to='/' />
    );
};

export default UserRepository;