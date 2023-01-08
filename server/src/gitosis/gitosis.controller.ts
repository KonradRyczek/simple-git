import { Controller, Post, UseGuards, Body, Get } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { JwtGuard } from 'src/auth/guard';
import { RepoActionDto, GitosisUserDto } from './dto';
import { GitosisService } from './gitosis.service';

@UseGuards(JwtGuard)
@Controller('gitosis')
export class GitosisController {

    constructor(private gitosis: GitosisService) {}

    @Post('addGitosisUser')
    addGitosisUser(@GetUser() user: User, @Body() body: any) {
        const dto : GitosisUserDto = new GitosisUserDto();
        dto.username = user.username;
        dto.email = user.email;
        dto.sshPublicKey = body.sshPublicKey;
        return this.gitosis.addUserToGitosis(dto);
    }
    
    @Post('createPrivateRepo')
    createPrivateRepo(@GetUser() user: User, @Body() body: any) {
        const dto : RepoActionDto = new RepoActionDto();
        dto.username = user.username;
        dto.email = user.email;
        dto.repoName = body.repoName;
        console.log({ "data" : dto});
        return this.gitosis.createPrivateRepo(dto);
    }

    @Post('deletePrivateRepo')
    deletePrivateRepo(@GetUser() user: User, @Body() body: any) {
        const dto : RepoActionDto = new RepoActionDto();
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
        const dto : RepoActionDto = new RepoActionDto();
        dto.username = user.username;
        dto.email = user.email;
        dto.repoName = body.repoName;
    }
}
