import { Injectable } from '@nestjs/common/decorators';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { ForbiddenException } from '@nestjs/common';



@Injectable()
export class AuthService {
    constructor (private prisma: PrismaService) {}

    async signup(dto: AuthDto) {

        const hash = await argon.hash(dto.password);

        try {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    username: dto.username,
                    hash,
                }
            });
            
            delete user.hash

            return user
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code == 'P2002') {
                    throw new ForbiddenException('Credentials already taken')
                }
            }
            throw error;
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
        
        delete user.hash
        return user;
    }
}
