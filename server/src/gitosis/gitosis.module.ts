import { Module } from '@nestjs/common';
import { GitosisConfigManager } from './configManager/gitosis-config-manager';
import { GitosisController } from './gitosis.controller';
import { GitosisService } from './gitosis.service';
import { RepoManager } from './repoManager/repo-manager';

@Module({
  controllers: [GitosisController],
  providers: [GitosisService, GitosisConfigManager, RepoManager],
  exports: [GitosisService],
})
export class GitosisModule {}
