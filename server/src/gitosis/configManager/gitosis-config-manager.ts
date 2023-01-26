import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common/decorators';
import { OnModuleInit } from '@nestjs/common';
import * as fs from 'fs';
import * as rimraf from 'rimraf';
import {simpleGit,  SimpleGit } from 'simple-git';
import { RepoActionDto, GitosisUserDto } from '../dto';
import { exec } from 'child_process';


@Injectable()
export class GitosisConfigManager implements OnModuleInit{

    //JS object representing gitosis configuration
    private gitosisConf : any
    private confRepoPath : string
    private confFilePath : string
    private confFileName : string
    private confRepoName : string
    private confKeyDirName : string
    private confKeyDirPath : string
    private bareReposPath : string
    private adminReposPath : string
    private userReposPath : string

    private gitAdminDir: SimpleGit;
    private gitAdminRepo: SimpleGit;
    private gitUser: SimpleGit;


    constructor(
        config: ConfigService,
        ) {
        //  ** SETTING UP CLASS VARIABLES **
        // Location of user and admin NON BARE repositories (CLONED COPIES OF THE BARE REPOS)
        this.adminReposPath = config.get("GITOSIS_ADMIN_REPOS_PATH");
        this.userReposPath = config.get("GITOSIS_USER_REPOS_PATH");
        // Location of bare repositories (Repositories served by the gitosis service)
        this.bareReposPath = config.get("GITOSIS_BARE_REPOSITORIES_PATH")
        this.confRepoName = config.get("GITOSIS_ADMIN_REPO_NAME");
        this.confFileName = config.get("GITOSIS_ADMIN_CONFIG_FILENAME");
        // Path to gitosis-admin and to gitosis-admin/gitosis.conf
        this.confRepoPath = this.adminReposPath + '/' + this.confRepoName;
        this.confFilePath = this.confRepoPath + '/' + this.confFileName;
        // Path to folder with the PUBLIC SSH KEYS
        this.confKeyDirName = config.get("GITOSIS_ADMIN_KEY_DIR_NAME");
        this.confKeyDirPath = this.confRepoPath + '/' + this.confKeyDirName

        // this.gitAdminDir: SimpleGit;
        // this.gitAdminRepo: SimpleGit;
        // this.gitUser: SimpleGit;
    }

    async onModuleInit() {
        if (!fs.existsSync(this.adminReposPath + '/' + this.confRepoName)) {
            this.gitAdminDir = simpleGit();
            this.gitAdminDir.env("GIT_SSH_COMMAND", "ssh -o StrictHostKeyChecking=no -i /root/.ssh/id_rsa")
            await this.gitAdminDir.clone('git@localhost:gitosis-admin.git',
                this.adminReposPath + '/' + this.confRepoName);
            await this.gitAdminDir.cwd(this.adminReposPath + '/' + this.confRepoName);  
            await this.gitAdminDir
                .addConfig("user.email", "admin")
                .addConfig("user.name", "admin@admin.com");
            this.loadGitosisConfToJSObject();
        } else {
            this.gitAdminDir = simpleGit(this.adminReposPath + '/' + this.confRepoName);
            this.gitAdminDir.env("GIT_SSH_COMMAND", "ssh -o StrictHostKeyChecking=no -i /root/.ssh/id_rsa")
            this.gitAdminDir.addRemote("origin", "git@localhost:gitosis-admin.git");
            await this.gitAdminDir.pull("origin", "master").status().exec(() => console.log('pull done.'));
            this.loadGitosisConfToJSObject();
        }
    }

    
    async addPrivateRepo(dto : RepoActionDto) {
        console.log("Gitosis config: Adding private repo '" + dto.repoName + "' for user: " + dto.username )
        if ( !(dto.username in this.gitosisConf)) {
            console.log("Gitosis config: Didn't find " + dto.username + " in gitosis config when trying to add " + dto.repoName + " repository")
            return;
        }

        let repoPath = dto.username + '/' + dto.repoName
        this.gitosisConf[dto.username]['writable'].push(repoPath)

        this.saveConfig()

        if (fs.existsSync(this.bareReposPath + '/' + dto.username)) {
            const path = this.bareReposPath + '/' + dto.username + '/' + dto.repoName + '.git'
            if (!fs.existsSync(path)) {
                fs.mkdirSync(path, { recursive: true });
            }
            const git = simpleGit(path);
            await git.init(true)

            exec('chown git:git -R ' + path, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error: ${error}`);
                    return;
                }
            });
        }

        if (fs.existsSync(this.userReposPath + '/' + dto.username)) {
            const git = simpleGit(this.userReposPath + '/' + dto.username);
            git.clone(this.bareReposPath + '/' + dto.username + '/' + dto.repoName + '.git')
                .addConfig("user.name", dto.username)
                .addConfig("user.email", dto.email);
        }
    }


    deletePrivateRepo(dto : RepoActionDto) {
        console.log("Gitosis config: Deleting private repo '" + dto.repoName + "' for user: " + dto.username )
        if ( !(dto.username in this.gitosisConf)) {
            console.log("Gitosis config: Didn't find " + dto.username + " in gitosis config when trying to delete " + dto.repoName + " repository")
        } else {
            let repoPath = dto.username + '/' + dto.repoName
            const index = this.gitosisConf[dto.username]['writable'].indexOf(repoPath, 0);
            if (index > -1) {
                this.gitosisConf[dto.username]['writable'].splice(index, 1);
            }
            this.saveConfig();
        }

        if (fs.existsSync(this.userReposPath + '/' + dto.username + '/' + dto.repoName)) {
            rimraf.sync(this.userReposPath + '/' + dto.username + '/' + dto.repoName);
        }

        if (fs.existsSync(this.bareReposPath + '/' + dto.username + '/' + dto.repoName + '.git')) {
            rimraf.sync(this.bareReposPath + '/' + dto.username + '/' + dto.repoName + '.git');
        }
    }
    
    
    async addUserToGitosis(dto : GitosisUserDto) {
        console.log(this.gitosisConf)
        this.gitosisConf[dto.username] = 
            { 'members' : [dto.username], 'writable' : []};
        
        this.saveConfig();
        
        // Save ssh key with username appended at the end
        // filename: keydir/username.pub
        const regex = /^(\S*\s{1}\S*)/;
        const match = dto.sshPublicKey.match(regex);
        console.log(this.confKeyDirPath + '/' + dto.username + '.pub')
        if (match) {
            fs.writeFileSync(
                this.confKeyDirPath + '/' + dto.username + '.pub', 
                match[0] + ' ' + match[1] + ' ' + dto.username
                );
        }

        // this.gitAdminDir = simpleGit(this.adminReposPath + '/' + this.confRepoName);
        // console.log("1")
        console.log(await this.gitAdminDir.status());
        await this.gitAdminDir.pull("origin", "master").exec(() => console.log('pull done.'))
            .add('--all')
            .commit('update')
            .push();

        console.log(await this.gitAdminDir.log({ '-1': null }));
        
        // // Create BARE repos dir
        if (!fs.existsSync(this.userReposPath + '/' + dto.username)) {
            fs.mkdirSync(this.userReposPath + '/' + dto.username);
            // const git = simpleGit(this.userReposPath + '/' + dto.username)
        }
        // Create NON BARE repos dir
        if (!fs.existsSync(this.bareReposPath + '/' + dto.username)) {
            fs.mkdirSync(this.bareReposPath + '/' + dto.username);
        }
    }


    private loadGitosisConfToJSObject() {
        // Load gitosis conf to this.gitosisConf
        const data = fs.readFileSync(this.confFilePath, 'utf8');
        const lines = data.split('\n');

        const json: any = {};
        let values: any = {};
        let group: string | null = null;
        let groupData: any = {};

        for (const line of lines) {
            if (line.startsWith('[gitosis]'))
                continue;
            if (line.trim().length === 0) 
                continue;
            
            if (line.startsWith('[group')) {

                if (group) {
                    json[group] = groupData;
                    groupData = {}
                }

                const match = line.match(/\[group (.*)\]/);
                if (match) {
                    group = match[1].trim();
                }
            } else {
                if (line.startsWith("members") || line.startsWith("writable")) {
                    const [key, value] = line.split(' = ').map((str) => str.trim().replace(/\r/g, ''));
                    groupData[key] = value.split(' ');
                }
            }
        }

        if (group) {
            json[group] = groupData;
            groupData = {}
        }
        
        this.gitosisConf = json;
        console.log(this.gitosisConf);
    }


    private saveConfig() {
        this.saveConfigTo(this.confRepoPath, this.confFileName);
    }


    private saveConfigTo(path :string, confFileName :string) {
        let config = "[gitosis]\n";
        for (const key in this.gitosisConf) {
            config += `\n[group ${key}]\n`;
            config += `members = ${this.gitosisConf[key].members.join(" ")}\n`;
            config += `writable = ${this.gitosisConf[key].writable.join(" ")}\n`;
        }

        fs.writeFileSync(path + '/' + confFileName,config);
        const adminRepo = simpleGit(this.adminReposPath + '/' + this.confRepoName)
        adminRepo.add(".")
            .then(() => adminRepo.commit("Updated config"))
            .then(() => adminRepo.push())
    }


    private saveConfigToJson() {
        console.log(this.gitosisConf)
        const jsonString = JSON.stringify(this.gitosisConf, null, 2);
        fs.writeFile('./output.json', jsonString, (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log('JSON written to file');
        }
        });
    }


}
