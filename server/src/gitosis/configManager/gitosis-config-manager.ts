import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common/decorators';
import * as fs from 'fs';
import * as rimraf from 'rimraf';
import {simpleGit,  SimpleGit } from 'simple-git';
import { GitosisUserDto } from '../dto/gitosis-user.dto';


@Injectable()
export class GitosisConfigManager {
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

    private gitAdmin: SimpleGit;
    private gitUser: SimpleGit;

    addPrivateRepo(owner :string, repoName :string) {
        console.log("Gitosis config: Adding private repo '" + repoName + "' for user: " + owner )
        if ( !(owner in this.gitosisConf)) {
            console.log("Gitosis config: Didn't find " + owner + " in gitosis config when trying to add " + repoName + " repository")
            return;
        }

        let repoPath = owner + '/' + repoName
        this.gitosisConf[owner]['writable'].push(repoPath)

        this.saveConfig()

        if (fs.existsSync(this.bareReposPath + '/' + owner)) {
            const path = this.bareReposPath + '/' + owner + '/' + repoName + '.git'
            if (!fs.existsSync(path)) {
                fs.mkdirSync(path, { recursive: true });
              }
            const git = simpleGit(path);
            git.init(true)
            .then((data) => {
                console.log(data);
                // this.gitAdmin.commit()
            })
            .catch((err) => {
                //console.error(err);
            });
        }

        if (fs.existsSync(this.userReposPath + '/' + owner)) {
            const git = simpleGit(this.userReposPath + '/' + owner);
            git.clone(this.bareReposPath + '/' + owner + '/' + repoName + '.git')
            .then((data) => {
                console.log(data);
                // this.gitAdmin.commit()
            })
            .catch((err) => {
                //console.error(err);
            });
        }
    }

    deletePrivateRepo(owner: string, repoName: string) {
        console.log("Gitosis config: Deleting private repo '" + repoName + "' for user: " + owner )
        if ( !(owner in this.gitosisConf)) {
            console.log("Gitosis config: Didn't find " + owner + " in gitosis config when trying to delete " + repoName + " repository")
        } else {
            let repoPath = owner + '/' + repoName
            const index = this.gitosisConf[owner]['writable'].indexOf(repoPath, 0);
            if (index > -1) {
                this.gitosisConf[owner]['writable'].splice(index, 1);
            }
            this.saveConfig();
        }

        if (fs.existsSync(this.userReposPath + '/' + owner + '/' + repoName + '.git')) {
            rimraf.sync(this.userReposPath + '/' + owner + '/' + repoName + '.git');
        }

        if (fs.existsSync(this.bareReposPath + '/' + owner + '/' + repoName + '.git')) {
            rimraf.sync(this.bareReposPath + '/' + owner + '/' + repoName + '.git');
        }
      }
    
    addUserToGitosis(dto : GitosisUserDto) {
        console.log(this.gitosisConf)
        this.gitosisConf[dto.username] = 
            { 'members' : [dto.username], 'writable' : []};
        
        this.saveConfig();
        
        //saving ssh key
        const regex = /^(\S*\s{1}\S*)/;
        const match = dto.sshPublicKey.match(regex);
        console.log(this.confKeyDirPath + '/' + dto.username + '.pub')
        if (match) {
            fs.writeFileSync(
                this.confKeyDirPath + '/' + dto.username + '.pub', 
                match[0] + ' ' + match[1] + ' ' + dto.username
                );
        }
        
        // Gitosis bare repos dir
        if (!fs.existsSync(this.userReposPath + '/' + dto.username)) {
            fs.mkdirSync(this.userReposPath + '/' + dto.username);
        }
        // Non bare repos
        if (!fs.existsSync(this.bareReposPath + '/' + dto.username)) {
            fs.mkdirSync(this.bareReposPath + '/' + dto.username);
        }

    }
    

    constructor(config: ConfigService) {
        
        // Location of user and admin non bare repositories
        this.adminReposPath = config.get("GITOSIS_ADMIN_REPOS_PATH");
        this.userReposPath = config.get("GITOSIS_USER_REPOS_PATH");
        // Location of bare repositories
        this.bareReposPath = config.get("GITOSIS_BARE_REPOSITORIES_PATH")
        this.confRepoName = config.get("GITOSIS_ADMIN_REPO_NAME");
        this.confFileName = config.get("GITOSIS_ADMIN_CONFIG_FILENAME");

        this.confRepoPath = this.adminReposPath + '/' + this.confRepoName;
        this.confFilePath = this.confRepoPath + '/' + this.confFileName;

        this.confKeyDirName = config.get("GITOSIS_ADMIN_KEY_DIR_NAME");
        this.confKeyDirPath = this.confRepoPath + '/' + this.confKeyDirName

        // Git wrapper handlers
        this.gitAdmin = simpleGit(this.adminReposPath);
        this.gitUser = simpleGit(this.userReposPath);
        
        this.gitAdmin.clone('/srv/simple-git.com/repositories/gitosis-admin.git')
        .then((data) => {
            console.log(data);
            this.loadGitosisConfToJSObject();
            // this.gitAdmin.commit()
        })
        .catch((err) => {
            //console.error(err);
        }).finally(() => {
            this.loadGitosisConfToJSObject();
        });
        
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
