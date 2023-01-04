import { Controller, Post, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { SignUpDto } from './dto/signup.dto';
import * as fs from 'fs';
import { GitosisService } from 'src/gitosis/gitosis.service';
import { GitosisUserDto } from 'src/gitosis/dto/gitosis-user.dto';

@Controller('auth')
export class AuthController {
    // auth service injection

    constructor(
        private authService: AuthService,
        private gitosis: GitosisService,
        ) {}

    @Post('signup')
    @UseInterceptors(FileInterceptor('pubKey'))
    async signup(@Body() body: any, @UploadedFile() file) {
        const fileAsString = file.buffer.toString('utf8');
        const dto : SignUpDto = new SignUpDto();
        dto.username = body.username;
        dto.email = body.email;
        dto.password = body.password;
        dto.sshPublicKey = fileAsString;

        console.log({data: dto})
        const result = await this.authService.signup(dto);

        const gitosisDto : GitosisUserDto = new GitosisUserDto();
            gitosisDto.sshPublicKey = dto.sshPublicKey;
            gitosisDto.username = dto.username; 
            this.gitosis.addGitosisUser(gitosisDto)
        return result;
    }

    @Post("signin")
    signin(@Body() dto: AuthDto) {
        return this.authService.signin(dto);
    }

}
