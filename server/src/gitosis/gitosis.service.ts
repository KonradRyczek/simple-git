import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { GitosisConfigManager } from './configManager/gitosis-config-manager';
import { RepoManager } from './repoManager/repo-manager';
import { RepoActionDto, GitosisUserDto, UserDto, RepoFileActionDto } from './dto';

@Injectable()
export class GitosisService {
    
    constructor (
        private gitosisConf : GitosisConfigManager,
        private prisma : PrismaService,
        private repoManager : RepoManager,
        ) {}
    
    addUserToGitosis(dto: GitosisUserDto) {
        this.gitosisConf.addUserToGitosis(dto);
    }

    async getAllUserRepos(dto : UserDto) {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                  username: dto.username
                },
                include: {
                  repositories: {
                    select: {
                        createdAt: true,
                        reponame: true,
                        repopath: true,
                    }
                  }
                }
              });
              
              console.log(user.repositories);

            //   user.repositories.

              return user.repositories;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code == 'P2002') {
                    throw new ForbiddenException('Repository already exists');
                }
            }
            throw error;
        }
    }

    getFileFromRepo (dto : RepoFileActionDto) {

        return this.repoManager.getFileFromRepo(dto);
    }

    async getUserRepo(dto: RepoActionDto) {
        try {

            const user = await this.prisma.user.findUnique({
                where: {
                    username: dto.username,
                }
            });
            if (!user) 
                throw new NotFoundException();
            
            
            const repository = await this.prisma.repository.findFirst({
                where: {
                    userId: user.id,
                    repopath: dto.username + '/' + dto.repoName,
                }
            });

            return this.repoManager.getRepoDirectoryStructure(dto)

        } catch (err) {
            console.log(err)
        }
    }

    async createPrivateRepo(dto: RepoActionDto) {
        
        try {
            const repo = await this.prisma.repository.create({
                data: {
                    reponame: dto.repoName,
                    repopath: dto.username + '/' + dto.repoName,
                    user: {
                        connect: {
                            username: dto.username,
                        }
                    }
                }
            })

            await this.gitosisConf.addPrivateRepo(dto);

        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code == 'P2002') {
                    throw new ForbiddenException('Repository already exists');
                }
            }
            throw error;
        }
    }

    async deletePrivateRepo(dto: RepoActionDto) {
        
        try {
            const repo = await this.prisma.user.update({
                where: {
                    username: dto.username,
                },
                data: {
                    repositories: {
                        delete: {
                            repopath: dto.username + '/' +dto.repoName,
                        }
                    }
                }
            });

            this.gitosisConf.deletePrivateRepo(dto);

        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code == 'P2017') {
                    throw new ForbiddenException('Repository doesn\'t exist');
                }
            }
            throw error;
        }
        
        return {dto};
    }
    
}
