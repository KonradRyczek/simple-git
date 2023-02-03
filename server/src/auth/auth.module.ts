import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { GitosisModule } from 'src/gitosis/gitosis.module';
import { GitosisService } from 'src/gitosis/gitosis.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy';

@Module({
  imports: [JwtModule.register({}), GitosisModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
