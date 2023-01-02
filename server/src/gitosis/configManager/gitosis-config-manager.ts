import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common/decorators';
import * as fs from 'fs';

@Injectable()
export class GitosisConfigManager {

    private gitosisConf : any
    private confFilePath : string
    private confDirPath : string
    private confFileName : string

    addPrivateRepo(owner :string, repoName :string) {
        console.log("Gitosis config: Adding private repo '" + repoName + "' for user: " + owner )
        if ( !(owner in this.gitosisConf)) {
            console.log("Gitosis config: Didn't find " + owner + " in gitosis config when trying to add " + repoName + " repository")
            this.addUserToGitosisConfig(owner, owner)
        }

        let repoPath = owner + '/' + repoName
        this.gitosisConf[owner]['writable'].push(repoPath)

        this.saveConfig()
    }

    deletePrivateRepo(owner: string, repoName: string) {
        console.log("Gitosis config: Deleting private repo '" + repoName + "' for user: " + owner )
        if (owner in this.gitosisConf) {
            let repoPath = owner + '/' + repoName
            const index = this.gitosisConf[owner]['writable'].indexOf(repoPath, 0);
            if (index > -1) {
                this.gitosisConf[owner]['writable'].splice(index, 1);
            }
        }
        console.log(this.gitosisConf)
        this.saveConfig();
      }
    
    addUserToGitosisConfig(user: string, sshKeyName: string) {
        this.gitosisConf[user] = 
            { 'members' : [sshKeyName], 'writable' : []};
        this.saveConfig();
    }

    constructor(config: ConfigService) {
        
        this.confFileName = "gitosis.conf";
        this.confDirPath = config.get("GITOSIS_CONFIG_PATH");
        this.confFilePath = this.confDirPath + '/' + this.confFileName;
        
        // clone the repository first

        this.loadGitosisConfToJSObject();
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
    }
    private saveConfig() {
        this.saveConfigTo(this.confDirPath, this.confFileName);
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
