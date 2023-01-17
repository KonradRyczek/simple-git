import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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

            const response = {
                "owner": {
                    "username" : dto.username,
                    "email" : dto.email,
                },
                "repositories" : user.repositories,
            }

            return response;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code == 'P2002') {
                    throw new ForbiddenException('Repository already exists');
                }
            }
            throw error;
        }
    }


    async getUserRepoAutomatically(dto: RepoActionDto) {
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

            
            const branches = await this.getRepoBranches(dto);
            
            if ("master" in branches)
                dto.branchName = "master"
            else
                dto.branchName = branches[1];
            
            if (!this.isBranchValidForRepo(dto))
                throw new NotFoundException();
            
            return this.repoManager.getRepoDirectoryStructure(dto)

        } catch (err) {
            console.log(err)
        }
    }


    async getUserRepoForBranch(dto: RepoActionDto) {
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

            if (!this.isBranchValidForRepo(dto))
                throw new NotFoundException();

            return this.repoManager.getRepoDirectoryStructure(dto)

        } catch (err) {
            console.log(err)
        }
    } 
    

    async getFileFromRepoForBranch (dto : RepoFileActionDto) {
        const branches = await this.repoManager.getRepoBranches(dto);
        if (dto.branchName == null || branches == null)
            throw new InternalServerErrorException();
        if ( !(branches.branches.includes(dto.branchName)) )
            throw new NotFoundException();
        
        
        return this.repoManager.getFileFromRepo(dto);
    }


    async getRepoBranches(dto: RepoActionDto) {
        return await this.repoManager.getRepoBranches(dto);
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


    async isBranchValidForRepo(dto : RepoActionDto) : Promise<boolean>{
        const branches = this.getRepoBranches(dto);
        if (dto.branchName in branches) 
            return true;
        return false;
    }
    
}
