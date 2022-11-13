import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
    // auth service injection
    constructor(private authService: AuthService) {}

    @Post('signup')
    signup(@Body() dto: AuthDto) {
        console.log("sent");
        return this.authService.signup(dto);
    }

    @Post("signin")
    signin(@Body() dto: AuthDto) {
        console.log("sent");
        return this.authService.signin(dto);
    }

}
