import { Injectable, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
//import dirToJson from "dir-to-json"
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
            throw new NotFoundException("Couldn't find repo");

        const git = simpleGit(repoPath);
        git.pull("origin", dto.branchName)

        console.log(absoluteFilePath)
        if (!fs.existsSync(absoluteFilePath))
            throw new NotFoundException("Couldn't find the file");
        
        
        try {
            const fileContent = fs.readFileSync(absoluteFilePath, 'utf-8');
            // const fileJson = JSON.parse(fileContent);
            console.log(fileContent);

            return { 
                "owner" : {
                    "username": dto.username,
                    "email": dto.email,
                },
                "repoName" : dto.repoName,
                "branchName" : dto.branchName,
                "filePath": dto.filePath,
                "fileContent": fileContent,
            };
            
        } catch (err) {
            return err;
        }
    }

    async getRepoBranches(dto: RepoActionDto) {
        const repoPath = this.userReposPath + '/' + dto.username + '/' + dto.repoName;
        if (!fs.existsSync(repoPath))
            return;

        const git = simpleGit(repoPath);
        await git.fetch();
        const allBranches = await git.branch()

        const filteredBranches = allBranches.all.filter(
            branch => branch.startsWith("remotes/origin/"));
        const branches = filteredBranches.map(
            branch => branch.replace('remotes/origin/', ''));

        const response = {
            "owner" : {
                "username": dto.username,
                "email": dto.email,
            },
            "repoName": dto.repoName,
            "branches" : branches,
        }
        return response;
    }


    async getRepoDirectoryStructure(dto: RepoActionDto) {
        const repoPath = this.userReposPath + '/' + dto.username + '/' + dto.repoName;

        if (!fs.existsSync(repoPath))
            return;

        const git = simpleGit(repoPath);
        await git.fetch()
            .checkout(dto.branchName)
            .pull();
        // await git.checkout()
        // await git.pull("origin", "master")

        var dirToJson = require("dir-to-json")
        const dirTree = await dirToJson(repoPath, { sortType: true })
        .then(function (dirTree) {
            // console.log('the structure looks like: ', JSON.stringify(dirTree, null, 4));
            return dirTree;
        })
        .catch(function (err) {
            throw err;
        });
        
        const response = {
            "owner" : {
                "username": dto.username,
                "email": dto.email,
            },
            "repoName": dto.repoName,
            "branch" : dto.branchName,
            "repotree": dirTree,
        }

        return response;
    }

}