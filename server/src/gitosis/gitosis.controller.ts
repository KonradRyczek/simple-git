import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { JwtGuard } from 'src/auth/guard';
import { CreateRepoDto } from './dto';
import { GitosisService } from './gitosis.service';

@UseGuards(JwtGuard)
@Controller('gitosis')
export class GitosisController {

    constructor(private gitosis: GitosisService) {}

    
    @Post('createRepository')
    createRepository(@GetUser() user: User, @Body() body: any) {
        const dto : CreateRepoDto = new CreateRepoDto();
        dto.username = user.username;
        dto.repoName = body.repoName;
        // return this.gitosis.createRepository(dto);
    }

    // getMe(@GetUser() user: User) {
    //     console.log({username: user.username})
    //     return user;
    // }

}
