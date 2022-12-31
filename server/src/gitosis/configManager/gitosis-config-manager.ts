import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common/decorators';
import * as fs from 'fs';
import path from 'path'

@Injectable()
export class GitosisConfigManager {

    private gitosisConf : any
    private confFilePath : string
    private confDirPath : string
    private confFileName : string

    addPrivateRepo(owner :string, repoName :string) {
        // check if the owner exists in the gitosisConf object
        if (owner in this.gitosisConf) {
            console.log("found key" + owner)
            this.gitosisConf[owner]['members'].push(repoName)
            console.log(this.gitosisConf[owner])

        } else {
            console.log("didn't find key owner" + owner)
            this.gitosisConf[owner] = 
            { 'members' : [owner], 'writable' : [repoName]};
        }
        this.saveConfig()
    }

    deletePrivateRepo(owner: string, repoName: string) {
        // check if the owner exists in the gitosisConf object
        if (owner in this.gitosisConf) {
            const index = this.gitosisConf[owner]['members'].indexOf(repoName, 0);
            if (index > -1) {
                this.gitosisConf[owner]['members'].splice(index, 1);
            }
        }
        console.log(this.gitosisConf)
        this.saveConfig();
      }

    constructor(config: ConfigService) {
        
        this.confFileName = "gitosis.conf"
        this.confDirPath = config.get("GITOSIS_CONFIG_PATH")
        this.confFilePath = this.confDirPath + '/' + this.confFileName;
        
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
        this.saveConfigToJson()
    }

    saveConfig() {
        this.saveConfigTo(this.confDirPath, this.confFileName);
    }

    saveConfigTo(path :string, confFileName :string) {
        let config = "[gitosis]\n";
        for (const key in this.gitosisConf) {
            config += `\n[group ${key}]\n`;
            config += `members = ${this.gitosisConf[key].members.join(" ")}\n`;
            config += `writable = ${this.gitosisConf[key].writable.join(" ")}\n`;
        }

        fs.writeFileSync(path + '/' + confFileName,config);
    }

    saveConfigToJson() {
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
