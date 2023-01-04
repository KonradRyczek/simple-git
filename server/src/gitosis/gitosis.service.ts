import { Injectable } from '@nestjs/common';
import { GitosisConfigManager } from './configManager/gitosis-config-manager';
import { RepoDto } from './dto';
import { GitosisUserDto } from './dto/gitosis-user.dto';

@Injectable()
export class GitosisService {
    
    constructor (private gitosisConf : GitosisConfigManager) {}
    
    addGitosisUser(dto: GitosisUserDto) {
        //Add ssh key to gitosis-admin.git repo

        //Add user to the gitosis.conf file
        console.log({dtoSent: dto});
        this.gitosisConf.addUserToGitosis(dto);
    }

    createPrivateRepo(dto: RepoDto) {
        this.gitosisConf.addPrivateRepo(dto.username, dto.repoName.trim());
        return {dto};
    }

    deletePrivateRepo(dto: RepoDto) {
        this.gitosisConf.deletePrivateRepo(dto.username, dto.repoName.trim());
        return {dto};
    }
    
}
