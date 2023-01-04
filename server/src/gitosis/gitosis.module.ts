import { Module } from '@nestjs/common';
import { GitosisConfigManager } from './configManager/gitosis-config-manager';
import { GitosisController } from './gitosis.controller';
import { GitosisService } from './gitosis.service';

@Module({
  controllers: [GitosisController],
  providers: [GitosisService, GitosisConfigManager],
})
export class GitosisModule {}
