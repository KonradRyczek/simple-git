# simple-git
Git server with web app interface.

### Requirements
To run the app you will need:
- npm
- yarn
- nodejs
- docker

### Docker structure
simple-git docker structure is composed of two containers: 
- **simple_git_db** - the database container running Postgres SQL
- **simple_git_app** - in this container we'll find the core of the app:
    - gitosis - the git server managing the user repositories. Gitosis repositories can be found under the following path `/srv/simple-git.com.`
    - react app - `/var/www/simple-git/client`
    - nest app - `/var/www/simple-git/server`

### Running simple-git
Before running the application you need to generate two ssh keys. The keys must be named **ssh-key** and **id_rsa**, if you want to use other names change the key names in the Dockerfile. You can generate the keys writting: <br>
`ssh-keygen` <br>
`ssh-keygen -f ssh-key` <br>
And then place the keys in your users **.ssh** folder.

#### Backend
Open a terminal on the root directory of the project and write: <br>
`docker-compose up` <br>
this will create our web app and git server container (simple_git_db) and out database container (simple_git_app). After this the backend will start automatically on watch mode. <br>
#### Frontend
To run the frontend you'll need to open a shell on the simple_git_app container. You can ssh into the container using your ssh key: <br>
`ssh test@localhost -i path-to-key/ssh-key` <br>
or alternatively open a interactive cli through Docker Desktop. Once you access the container run react in watch mode: <br>
`cd /var/www/simple-git/client` <br>
`yarn start`<br>

