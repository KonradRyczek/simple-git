import { IsNotEmpty, IsString } from "class-validator";

export class GitosisUserDto {
    @IsString()
    @IsNotEmpty()
    username: string

    @IsString()
    @IsNotEmpty()
    sshPublicKey: string

}