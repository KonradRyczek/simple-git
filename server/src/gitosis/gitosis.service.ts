import { Injectable } from '@nestjs/common';
import { GitosisConfigManager } from './configManager/gitosis-config-manager';
import { RepoActionDto } from './dto';
import { GitosisUserDto } from './dto/gitosis-user.dto';

@Injectable()
export class GitosisService {
    
    constructor (private gitosisConf : GitosisConfigManager) {}
    
    addUserToGitosis(dto: GitosisUserDto) {
        this.gitosisConf.addUserToGitosis(dto);
    }

    createPrivateRepo(dto: RepoActionDto) {
        this.gitosisConf.addPrivateRepo(dto);
        return {dto};
    }

    deletePrivateRepo(dto: RepoActionDto) {
        this.gitosisConf.deletePrivateRepo(dto);
        return {dto};
    }
    
}
