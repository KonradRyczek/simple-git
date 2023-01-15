import { IsNotEmpty, IsString } from "class-validator";

export class RepoActionDto {
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