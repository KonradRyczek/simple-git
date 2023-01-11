import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import dirToJson from "dir-to-json"
import * as fs from 'fs';
import * as path from 'path';
import simpleGit from "simple-git";
import { RepoActionDto, RepoFileActionDto } from "../dto";
// import dirToJson from "dir-to-json";


@Injectable()
export class RepoManager {

    private adminReposPath : string;
    private userReposPath : string;
    private bareReposPath : string;

    constructor (config: ConfigService,) {
        this.userReposPath = config.get("GITOSIS_USER_REPOS_PATH");
        this.bareReposPath = config.get("GITOSIS_BARE_REPOSITORIES_PATH");
    }

    getFileFromRepo(dto : RepoFileActionDto) {
        const repoPath = this.userReposPath + '/' + dto.username + '/' + dto.repoName;
        const absoluteFilePath = repoPath + '/' + dto.filePath;

        console.log(repoPath)
        if (!fs.existsSync(repoPath))
            return;

        const git = simpleGit(repoPath);
        git.pull("origin", "master")

        console.log(absoluteFilePath)
        if (!fs.existsSync(absoluteFilePath))
            return;
        
        
        try {
            const fileContent = fs.readFileSync(absoluteFilePath, 'utf-8');
            // const fileJson = JSON.parse(fileContent);
            console.log(fileContent);

            return { 
                filePath: dto.filePath,
                owner: dto.username,
                file: fileContent,
            };
            
        } catch (err) {
            return err;
        }
    }

    async getRepoDirectoryStructure(dto: RepoActionDto) {
        const repoPath = this.userReposPath + '/' + dto.username + '/' + dto.repoName;
        if (!fs.existsSync(repoPath))
            return;

        const git = simpleGit(repoPath);
        git.pull("origin", "master")

        var dirToJson = require("dir-to-json")
        const dirTree = await dirToJson(repoPath, { sortType: true })
        .then(function (dirTree) {
            // console.log('the structure looks like: ', JSON.stringify(dirTree, null, 4));
            return dirTree;
        })
        .catch(function (err) {
            throw err;
        });

        return JSON.stringify(dirTree, null, 4)
        // var dirToJson = require('directory-structure-json');
        // dirToJson.getStructure(fs, repoPath, function (err, structure, total) {
        //     console.log('there are a total of: ', total.folders, ' folders and ', total.files, ' files');
        //     console.log('the structure looks like: ', JSON.stringify(structure, null, 4));
        // });
        // const dirToJson = require('dir-to-json').dirToJson;
        

        // dirToJson(repoPath, { sortType: true })
        //     .then(function (dirTree){
        //         console.log(dirTree);
        //     })



        // this.gitAdminDir = simpleGit();
        // this.gitAdminDir.env("GIT_SSH_COMMAND", "ssh -o StrictHostKeyChecking=no -i /root/.ssh/id_rsa")
        // await this.gitAdminDir.clone('git@localhost:gitosis-admin.git',
        //     this.adminReposPath + '/' + this.confRepoName);
        // await this.gitAdminDir.cwd(this.adminReposPath + '/' + this.confRepoName);  
        // await this.gitAdminDir
        //     .addConfig("user.email", "admin")
        //     .addConfig("user.name", "admin@admin.com");
        
    
        // this.gitAdminDir = simpleGit(this.adminReposPath + '/' + this.confRepoName);
        // await this.gitAdminDir.pull("origin", "master").status().exec(() => console.log('pull done.'));
    }

}