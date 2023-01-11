import { Controller, Post, UseGuards, Body, Get, Param, UnauthorizedException, Req } from '@nestjs/common';
import { User } from '@prisma/client';
import { request } from 'http';
import { REPL_MODE_SLOPPY } from 'repl';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { JwtGuard } from 'src/auth/guard';
import { pathToFileURL } from 'url';
import { RepoActionDto, GitosisUserDto, UserDto, RepoFileActionDto } from './dto';
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
    getAllUserRepos(
        @Param('username') username : string, 
        @GetUser() user: User,) {

        if (user.username !== username) 
            throw new UnauthorizedException("This profile is private.");
        
        const dto : UserDto = new UserDto();
        dto.username = user.username;
        dto.email = user.email;
        console.log({"data" : dto})
        return this.gitosis.getAllUserRepos(dto);
    }


    @Get('/:username/:reponame')
    getUserRepo(
        @Param('username') username : string, 
        @Param('reponame') reponame : string, 
        @GetUser() user: User) {

        if (user.username !== username) 
            throw new UnauthorizedException("This profile is private.");
        
        const dto : RepoActionDto = new RepoActionDto();
        dto.username = user.username;
        dto.email = user.email;
        dto.repoName = reponame;

        return this.gitosis.getUserRepo(dto);
    }


    @Get('/:username/:reponame/*')
    getFileFromRepo(
        @Param('username') username : string, 
        @Param('reponame') reponame : string, 
        @Req() request, Request,
        // @Param('pathToFile') pathToFile : string, 
        @GetUser() user: User,) {

        if (user.username !== username) 
            throw new UnauthorizedException("This profile's' content is private.");
        
        const fullPath = request.url;

        // Extract the pathToFile value from the full path
        const pathToFile = fullPath.substring(
            fullPath.indexOf( '/' + username + '/' + reponame + '/') + ('/' + username + '/' + reponame + '/').length);
        console.log(pathToFile)
        
        const dto : RepoFileActionDto = new RepoFileActionDto();
        dto.email = user.email;
        dto.username = user.username;
        dto.repoName = reponame;
        dto.filePath = pathToFile;

        return this.gitosis.getFileFromRepo(dto);
    }
}
