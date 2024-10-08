import { Equals, IsEmail, IsString, MinLength } from "class-validator";
import { Match } from "src/common/decorators/match.decorator";
import { IsUnimayorEmail } from "src/common/decorators/unimayorEmail.decorator";

export class CreateUserDto {

    @IsString()
    @MinLength(5)
    public name: string;

    @IsEmail()
    @IsString()
    // @IsUnimayorEmail() // Desactivado temporalmente
    public email: string;

    @IsString()
    @MinLength(5)
    public password: string;

    @IsString()
    @Match('password', { message: 'Passwords do not match' })
    public repeatedPassword: string;

}
