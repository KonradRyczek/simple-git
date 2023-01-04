import { Controller, Post, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { SignUpDto } from './dto/signup.dto';
import * as fs from 'fs';

@Controller('auth')
export class AuthController {
    // auth service injection
    constructor(private authService: AuthService) {}

    @Post('signup')
    @UseInterceptors(FileInterceptor('pubKey'))
    signup(@Body() body: any, @UploadedFile() file) {
        const fileAsString = file.buffer.toString('utf8');
        const dto : SignUpDto = new SignUpDto();
        dto.username = body.username;
        dto.email = body.email;
        dto.password = body.password;
        dto.sshPublicKey = fileAsString;

        console.log({data: dto})
        return this.authService.signup(dto);
    }

    @Post("signin")
    signin(@Body() dto: AuthDto) {
        return this.authService.signin(dto);
    }

}
