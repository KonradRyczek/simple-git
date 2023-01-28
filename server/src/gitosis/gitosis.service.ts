import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { GitosisConfigManager } from './configManager/gitosis-config-manager';
import { RepoManager } from './repoManager/repo-manager';
import { RepoActionDto, GitosisUserDto, UserDto, RepoFileActionDto, CreateBranchDto } from './dto';

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

            
            const branches = await this.getRepoBranches(dto.username, dto.repoName);
            
            if ("master" in branches)
                dto.branchName = "master"
            else
                dto.branchName = branches[1];
            
            if (!this.existsBranchInRepo(dto.username, dto.repoName, dto.branchName))
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

            if (!this.existsBranchInRepo(dto.username, dto.repoName, dto.branchName))
                throw new NotFoundException();

            return this.repoManager.getRepoDirectoryStructure(dto)

        } catch (err) {
            console.log(err)
        }
    } 
    

    async getFileFromRepoForBranch (dto : RepoFileActionDto) {
        const branches = await this.repoManager.getRepoBranches(dto.username, dto.repoName);
        if (dto.branchName == null || branches == null)
            throw new InternalServerErrorException();
        if ( !(branches.branches.includes(dto.branchName)) )
            throw new NotFoundException();
        
        
        return this.repoManager.getFileFromRepo(dto);
    }


    async getRepoBranches(username : string, repoName : string) {
        return await this.repoManager.getRepoBranches(username, repoName);
    }

    async createRepoBranch(dto: CreateBranchDto) {
        const repoDto = new RepoActionDto();
        
        if (!await this.existsBranchInRepo(dto.username, dto.repoName, dto.fromBranch))
            throw new NotFoundException('From branch doesn\'t exist');
        if (await this.existsBranchInRepo(dto.username, dto.repoName, dto.newBranch))
            throw new ForbiddenException('Branch already exists');
        
        return this.repoManager.createRepoBranch(dto);
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


    async existsBranchInRepo(username, repoName, branch) : Promise<boolean>{
        const data = await this.getRepoBranches(username, repoName);
        if (data.branches.find(elem => elem === branch)) 
            return true;
        return false;
    }
    
}
