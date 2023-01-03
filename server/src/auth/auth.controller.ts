import { Controller, Post, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { SignUpDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
    // auth service injection
    constructor(private authService: AuthService) {}

    @Post('signup')
    @UseInterceptors(FileInterceptor('pubKey'))
    async signup(@Body() body: any, @UploadedFile() file) {
        const fileContents = await file.readFile();
        const fileAsString = fileContents.toString();
        const dto : SignUpDto = new SignUpDto();
        dto.username = body.username;
        dto.email = body.email;
        dto.password = body.password;
        dto.sshPublicKey = body.pubKey;
        // return this.authService.signup(dto);
    }

    @Post("signin")
    signin(@Body() dto: AuthDto) {
        return this.authService.signin(dto);
    }

}
