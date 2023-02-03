import { IsNotEmpty, IsString } from "class-validator";

export class CreateBranchDto {
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
    newBranch: string

    @IsString()
    @IsNotEmpty()
    fromBranch: string
}