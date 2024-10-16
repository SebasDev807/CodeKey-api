import { Equals, IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { Match, IsUnimayorEmail } from "src/common/decorators";


export class CreateUserDto {

    @IsString()
    public name: string;

    @IsEmail()
    @IsUnimayorEmail() 
    public email: string;

    @IsString()
    @MinLength(5)
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    public password: string;

    
    @Match('password', { message: 'Passwords do not match' })
    public repeatedPassword: string;

}

