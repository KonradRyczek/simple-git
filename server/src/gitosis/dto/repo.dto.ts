import { IsNotEmpty, IsString } from "class-validator";

export class RepoDto {
    @IsString()
    @IsNotEmpty()
    username: string

    @IsString()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    repoName: string
}