import { Controller, Post } from '@nestjs/common';
import { GitosisService } from './gitosis.service';

@Controller('gitosis')
export class GitosisController {

    constructor(private gitosis: GitosisService) {}

    @Post('addRepo')
    createRepository() {
        return this.gitosis.createRepository();
    }

}
