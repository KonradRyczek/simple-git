import { IsNotEmpty, IsString } from "class-validator";

export class RepoFileActionDto {
    @IsString()
    @IsNotEmpty()
    username: string

    @IsString()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    repoName: string

    @IsString()
    @IsNotEmpty()
    filePath: string
}