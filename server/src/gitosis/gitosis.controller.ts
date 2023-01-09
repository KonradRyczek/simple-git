import { Controller, Post, UseGuards, Body, Get, Param, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { JwtGuard } from 'src/auth/guard';
import { RepoActionDto, GitosisUserDto, UserDto } from './dto';
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

    // @Get('getRepos')
    // getUserRepos(@GetUser() user: User) {
    //     const dto : UserDto = new UserDto();
    //     dto.username = user.username;
    //     dto.email = user.email;
    //     console.log({"data" : dto})
    //     return this.gitosis.getUserRepos(dto);
    // }

    //TODO
    // @Get('getRepo')
    // getRepo(@GetUser() user: User, @Body() body: any){
    //     const dto : RepoActionDto = new RepoActionDto();
    //     dto.username = user.username;
    //     dto.email = user.email;
    //     dto.repoName = body.repoName;
    // }

    @Get('/:username')
    getAllUserRepos(@Param('username') username : string, @GetUser() user: User) {
        if (user.username !== username) 
            throw new UnauthorizedException("This profile is private.");
        
        const dto : UserDto = new UserDto();
        dto.username = user.username;
        dto.email = user.email;
        console.log({"data" : dto})
        return this.gitosis.getAllUserRepos(dto);
    }

    @Get('/:username/:reponame')
    getUserRepo(@Param('username') username : string, @Param('reponame') reponame : string, @GetUser() user: User) {
        if (user.username !== username) 
            throw new UnauthorizedException("This profile is private.");
        
        const dto : RepoActionDto = new RepoActionDto();
        dto.username = user.username;
        dto.email = user.email;
        dto.repoName = reponame;

        return this.gitosis.getUserRepo(dto);
    }
}
