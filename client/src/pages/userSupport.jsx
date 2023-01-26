import React from "react";
import { Route, Navigate } from 'react-router-dom';
import UserHeader from "../components/UserHeader";


function hasJWT() {

  let flag = false;

  //check user has JWT token
  localStorage.getItem("access_token") ? flag = true : flag = false

  return flag
}

const userSupport = () => {

  return (
    hasJWT() ?
      <>
        <div className="">

          <UserHeader></UserHeader>


          <h1 id="simple-git">simple-git</h1>
          <p>Git server with web app interface.</p>
          <h3 id="requirements">Requirements</h3>
          <p>To run the app you will need: - npm - yarn - nodejs - docker</p>
          <h3 id="docker-structure">Docker structure</h3>
          <p>simple-git docker structure is composed of two containers: - <strong>simple_git_db</strong> - the database container running Postgres SQL - <strong>simple_git_app</strong> - in this container we’ll find the core of the app: - gitosis - the git server managing the user repositories. Gitosis repositories can be found under the following path <code>/srv/simple-git.com.</code> - react app - <code>/var/www/simple-git/client</code> - nest app - <code>/var/www/simple-git/server</code></p>
          <h3 id="running-simple-git">Running simple-git</h3>
          <p>Before running the application you need to generate two ssh keys. The keys must be named <strong>ssh-key</strong> and <strong>id_rsa</strong>, if you want to use other names change the key names in the Dockerfile. You can generate the keys writting: <br /> <code>ssh-keygen</code> <br /> <code>ssh-keygen -f ssh-key</code> <br /> And then place the keys in your users <strong>.ssh</strong> folder.</p>
          <h4 id="backend">Backend</h4>
          <p>Open a terminal on the root directory of the project and write: <br />
            <code>
              docker-compose up
            </code> <br />
            this will create our web app and git server container (simple_git_db) and out database container (simple_git_app). After this the backend will start automatically on watch mode. <br />
            #### Frontend To run the frontend you’ll need to open a shell on the simple_git_app container. You can ssh into the container using your ssh key: <br />
            <code>
              ssh test@localhost -i path-to-key/ssh-key
            </code> <br />
            or alternatively open a interactive cli through Docker Desktop. Once you access the container run react in watch mode: <br />
            <code>
              cd /var/www/simple-git/client
            </code> <br />
            <code>
              yarn start
            </code><br />
          </p>

        </div>
      </>





      :
      <Navigate to='/' />
  );
};

export default userSupport;