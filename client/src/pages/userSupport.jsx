import React from "react";
import "../styles/user.css";
import { Route, Navigate } from 'react-router-dom';
import UserHeader from "../components/UserHeader";
import Footer from "../components/Footer";


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
      <div className="background-user">
        <div>
          <UserHeader></UserHeader>
         </div> 
            <div class="about row mx-auto mb-5 w-100">
            <div className="frame1 col-md-8 mx-auto mt-5 mb-150 default-text">
                <h1 class="text-center-h3">Simple Git Dependency Requirements</h1>
                  <p>Git server with web app interface.</p>
                <h2 className="h4">Requirements</h2>
                <p>To run the app you will need:</p>
                    <ul className="disc">
                      <li>npm</li>
                      <li>yarn</li>
                      <li>nodejs</li>
                      <li>docker</li>
                    </ul>
                <h2 className="h4">Docker structure</h2>
                  <p>simple-git docker structure is composed of two containers:</p>
                    <ul className="disc">
                      <li>simple_git_db - the database container running Postgres SQL</li>
                      <li>simple_git_app - in this container we'll find the core of the app:</li>
                    <ul className="circle">
                      <li>gitosis - the git server managing the user repositories. Gitosis repositories can be found under the following path<code>/srv/simple-git.com.</code></li>
                      <li>react app -<code>/var/www/simple-git/client</code></li>  
                      <li>nest app -<code>/var/www/simple-git/server</code></li>
                    </ul>
                    </ul>
                  <h2 className="h4">Running simple-git</h2>
                  <p>Before running the application you need to generate two ssh keys. The keys must be named ssh-key and id_rsa, if you want to use other names change the key names in the Dockerfile. You can generate the keys writting:</p>
                      <ul>
                    <li><code>ssh-keygen</code></li><br />
                      <li><code>ssh-keygen -f ssh-key</code></li>
                    </ul>
                    <p>And then place the keys in your users .ssh folder.</p>
                    <h2 className="h4">Backend</h2>
                    <p>Open a terminal on the root directory of the project and write:</p>
                      <ul><code>docker-compose up</code></ul>
                    <p>this will create our web app and git server container (simple_git_db) and out database container (simple_git_app). After this the backend will start automatically on watch mode.</p>
                  <h2 className="h4">Frontend</h2>
                    <p>To run the frontend you'll need to open a shell on the simple_git_app container. You can ssh into the container using your ssh key:</p>
                      <ul><code>ssh test@localhost -i path-to-key/ssh-key</code></ul>
                    <p>or alternatively open a interactive cli through Docker Desktop. Once you access the container run react in watch mode:</p>
                  <ul><code>cd /var/www/simple-git/client</code></ul>
                  <ul><code>yarn start</code></ul>
            </div>
            <div className="col-md-8 mx-auto mt-5 mb-150 default-text">
              <h2 className="h4">Collaborators</h2>
              <ul className="disc">
                  <li>Konrad Ryczek<code>Backend</code></li>
                  <li>Jakub Sotwin<code>Frontend and UX/UI</code></li>
                  <li>Aleksander Postrzednik<code>Frontend</code></li>
                </ul>
            </div>
            <div className="blank"></div>
          </div>
          <div>
            <Footer />
          </div>
        </div>
      </>

      :
      <Navigate to='/' />
  );
};

export default userSupport;