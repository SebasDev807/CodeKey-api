import { IsEmail, IsString } from 'class-validator';
import { IsUnimayorEmail } from 'src/common/decorators';


export class LoginUserDto {

    @IsEmail()
    @IsUnimayorEmail()
    email: string;

    @IsString()
    password: string;

}