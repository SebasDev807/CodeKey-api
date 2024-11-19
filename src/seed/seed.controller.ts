import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SeedService } from './seed.service';
import { ValidRoles } from 'src/auth/interfaces/valid-roles.enum';
import { Auth } from 'src/auth/decorators/role-protected/auth.decorator';

@Controller('seed')
export class SeedController {

  constructor(private readonly seedService: SeedService) { }

  @Get()
  @Auth(ValidRoles.USER)
  executeSeed() {
    return this.seedService.executeSeed();
  }

}