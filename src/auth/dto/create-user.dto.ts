import { ApiProperty } from "@nestjs/swagger";
import { Equals, IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { Match, IsUnimayorEmail } from "src/common/decorators";


export class CreateUserDto {

    @ApiProperty({
        example: 'example perez',
        description: 'username'
    })
    @IsString()
    name: string;


    @ApiProperty({
        example: 'example@unimayor.edu.co',
        description: 'User email',
        uniqueItems: true
    })
    @IsEmail()
    @IsUnimayorEmail()
    email: string;


    @ApiProperty({
        example: 'Pass12345',
        description: 'User Password'
    })
    @IsString()
    @MinLength(5)
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password: string;

    @ApiProperty({
        example: 'Pass12345',
        description: 'must be the same as the password'
    })
    @Match('password', { message: 'Passwords do not match' })
    repeatedPassword: string;

}

