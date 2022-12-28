import { Module } from '@nestjs/common';
import { GitosisController } from './gitosis.controller';
import { GitosisService } from './gitosis.service';

@Module({
  controllers: [GitosisController],
  providers: [GitosisService]
})
export class GitosisModule {}
