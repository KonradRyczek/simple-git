import { IsNotEmpty, IsString } from "class-validator";

export class CreateRepoDto {
    @IsString()
    @IsNotEmpty()
    username: string

    @IsString()
    @IsNotEmpty()
    repoName: string
}