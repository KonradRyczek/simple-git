import { IsNotEmpty, IsString } from "class-validator";

export class GitosisUser {
    @IsString()
    @IsNotEmpty()
    username: string

    @IsString()
    @IsNotEmpty()
    sshPublicKey: string

}