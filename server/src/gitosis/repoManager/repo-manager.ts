import { Injectable, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as fs from 'fs';
import simpleGit from "simple-git";
import { CreateBranchDto, RepoActionDto, RepoFileActionDto } from "../dto";


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

    async getRepoBranches(username : string, repoName : string) {
        const repoPath = this.userReposPath + '/' + username + '/' + repoName;
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
                "username": username,
            },
            "repoName": repoName,
            "branches" : branches,
        }
        return response;
    }

    async createRepoBranch(dto: CreateBranchDto) {
        const repoPath = this.userReposPath + '/' + dto.username + '/' + dto.repoName;

        if (!fs.existsSync(repoPath))
            return;
        
        const git = simpleGit(repoPath);

        // Checkout the branch the new branch will be based on
        await git.checkout(dto.fromBranch);
        await git.checkout(["-b", dto.newBranch]);
        // Push the new branch to the remote repository
        await git.push('origin', dto.newBranch);

        return await this.getRepoBranches(dto.username, dto.repoName);
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