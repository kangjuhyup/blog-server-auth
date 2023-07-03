import { IsEthereumAddress } from "class-validator";

export class SignInDto {
    
    @IsEthereumAddress()
    address : string;

}