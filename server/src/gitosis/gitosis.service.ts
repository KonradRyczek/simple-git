import { Injectable } from '@nestjs/common';
import { GitosisConfigManager } from './configManager/gitosis-config-manager';
import { RepoDto } from './dto';

@Injectable()
export class GitosisService {
    
    constructor (private gitosisConf : GitosisConfigManager) {}
    
    createPrivateRepo(dto: RepoDto){
        this.gitosisConf.addPrivateRepo(dto.username, dto.repoName.trim());
        return {dto};
    }

    deletePrivateRepo(dto: RepoDto){
        this.gitosisConf.deletePrivateRepo(dto.username, dto.repoName.trim());
        return {dto};
    }
    
}


    // add ssh key

    // delete ssh key