import { Controller, Post, UseGuards, Body, Get } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { JwtGuard } from 'src/auth/guard';
import { RepoDto } from './dto';
import { GitosisUser } from './dto/gitosis-user.dto';
import { GitosisService } from './gitosis.service';

@UseGuards(JwtGuard)
@Controller('gitosis')
export class GitosisController {

    constructor(private gitosis: GitosisService) {}

    @Post('addGitosisUser')
    addGitosisUser(@GetUser() user: User, @Body() body: any) {
        const dto : GitosisUser = new GitosisUser();
        dto.username = user.username;
        dto.sshPublicKey = body.sshPublicKey;
        return this.gitosis.addGitosisUser(dto);
    }
    
    @Post('createPrivateRepo')
    createPrivateRepo(@GetUser() user: User, @Body() body: any) {
        const dto : RepoDto = new RepoDto();
        dto.username = user.username;
        dto.email = user.email;
        dto.repoName = body.repoName;
        console.log({ "data" : dto});
        return this.gitosis.createPrivateRepo(dto);
    }

    @Post('deletePrivateRepo')
    deletePrivateRepo(@GetUser() user: User, @Body() body: any) {
        const dto : RepoDto = new RepoDto();
        dto.username = user.username;
        dto.email = user.email;
        dto.repoName = body.repoName;
        console.log({ "data" : dto});
        return this.gitosis.deletePrivateRepo(dto);
    }

    //TODO:
    @Get('getRepos')
    getUserRepos(@GetUser() user: User) {

    }

    @Get('getRepo') 
    getRepo(@GetUser() user: User, @Body() body: any){
        const dto : RepoDto = new RepoDto();
        dto.username = user.username;
        dto.email = user.email;
        dto.repoName = body.repoName;
    }
}
