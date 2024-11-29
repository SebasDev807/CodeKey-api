import { Controller, Get, Post, Body, Param, HttpCode, ParseUUIDPipe, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiParam, ApiResponse } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { Auth } from './decorators/role-protected/auth.decorator';
import { ValidRoles } from './interfaces/valid-roles.enum';
import { GetUser } from './decorators/role-protected/get-user.decorator';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }


  @ApiResponse({ status: 201, description: 'User created', type: User })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @ApiResponse({ status: 200, description: 'Login success', type: LoginUserDto })
  @ApiResponse({ status: 401, description: 'Invalid Credentials' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @HttpCode(200)
  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @ApiParam({ name: 'token', description: 'Token to verify user' })
  @ApiResponse({ status: 200, description: 'Account verified.' })
  @ApiResponse({ status: 404, description: 'Token not found.' })
  @Get('verify/:token')
  confirmAccount(@Param('token') token: string) {
    return this.authService.confirmAccount(token);
  }


  @Patch('user/:id')
  @Auth(ValidRoles.ADMIN, ValidRoles.USER)
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.authService.updateUser(id, updateUserDto);
  }


  @Get('user')
  @Auth(ValidRoles.ADMIN, ValidRoles.USER)
  getUser(@GetUser() user: User) {
    return this.authService.getUser(user);
  }

}
