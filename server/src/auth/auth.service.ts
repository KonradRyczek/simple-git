import { Injectable } from '@nestjs/common/decorators';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto, SignUpDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AuthService {

    constructor (
        private prisma: PrismaService, 
        private jwt: JwtService,
        private config: ConfigService,
        // private gitosis: GitosisService,
    ) {}

    async signup(dto: SignUpDto) {

        const hash = await argon.hash(dto.password);

        try {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    username: dto.username,
                    hash,
                }
            });

            // this.gitosisService.createGitosisUser()
            // add ssh key to the right folder
            // create user repositories dir
            const token = await this.signToken(user.id, user.email)
            const response = {
                "user" : {
                    "username" : user.username,
                    "email" : user.email,
                },
                "access_token": token.access_token
            }
            return response;

        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code == 'P2002') {
                    throw new ForbiddenException('Credentials already taken');
                }
            }
            console.log(error);
        }
    }

    async signin(dto: AuthDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            },
        });
        
        if (!user) 
            throw new ForbiddenException('Incorrect credentials')

        const pwMatches = await argon.verify(
            user.hash,
            dto.password
        );

        if (!pwMatches)
            throw new ForbiddenException('Incorrect credentials')
        
        const token = await this.signToken(user.id, user.email);
        const response = {
            "user" : {
                "username" : user.username,
                "email" : user.email,
            },
            "access_token": token.access_token
        }
        return response;
    }

    async signToken(
        userId: number, 
        email: string
        ):Promise<{access_token: string}>{

        const payload = {
            sub: userId,
            email,
        };
        
        const secret = this.config.get("JWT_SECRET");

        const token = await this.jwt.signAsync(
            payload,
            {
                expiresIn: '15m',
                secret: secret,
            },
        );

        return {
            access_token: token,
        };
    }
}
