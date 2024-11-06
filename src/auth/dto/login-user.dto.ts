import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { IsUnimayorEmail } from 'src/common/decorators';


export class LoginUserDto {

    @ApiProperty({
        example: 'example@unimayor.edu.co'
    })
    @IsEmail()
    @IsUnimayorEmail()
    email: string;


    @ApiProperty({
        example: 'Password12345',
    })
    @IsString()
    password: string;

}