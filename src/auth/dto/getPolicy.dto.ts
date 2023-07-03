import { IsEthereumAddress } from "class-validator";

export class getPolicyDto {
    
    @IsEthereumAddress()
    address : string;

}