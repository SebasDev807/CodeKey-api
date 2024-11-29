import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileNamer } from './helpers/fileNamer';
import { ValidRoles } from 'src/auth/interfaces/valid-roles.enum';
import { Auth } from 'src/auth/decorators/role-protected/auth.decorator';
import { GetUser } from 'src/auth/decorators/role-protected/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) { }

  //files.controller.ts
  @Post('user')
  @Auth(ValidRoles.ADMIN, ValidRoles.USER)
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      filename: fileNamer
    })
  }))
  uploadUserfile(@UploadedFile() file: Express.Multer.File, @GetUser() user: User) {

    if (!file) {
      throw new BadRequestException('No file')
    }
    return this.uploadsService.uploadUserfile(file, user);
  }

  @Get('user')
  @Auth(ValidRoles.USER, ValidRoles.ADMIN)
  getProfilePhoto(@GetUser() user: User) {
    return this.uploadsService.getUserFile(user)
  }

}