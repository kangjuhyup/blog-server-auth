import { IsEthereumAddress, IsOptional, IsString } from "class-validator";

export class SetInfoDto {
    
    @IsEthereumAddress()
    address : string;

    @IsString()
    @IsOptional()
    nickName : string;
}