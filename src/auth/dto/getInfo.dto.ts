import { IsEthereumAddress } from "class-validator";

export class GetInfoDto {
    
    @IsEthereumAddress()
    address : string;

}