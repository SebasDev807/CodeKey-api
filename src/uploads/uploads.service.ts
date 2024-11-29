import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/auth/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfilePhoto } from './entities/profile-photo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UploadsService {
  private readonly logger = new Logger('UploadsService');

  constructor(
    private readonly configService: ConfigService,

    @InjectRepository(ProfilePhoto)
    private readonly profileRepository: Repository<ProfilePhoto>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>

  ) {

    cloudinary.config({
      cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET'),
    });

  }

  async uploadUserfile(file: Express.Multer.File, user: User) {
    try {
      const { path } = file;

      // Subir el archivo a Cloudinary
      const res = await cloudinary.uploader.upload(path, {
        folder: 'users',
      });

      // Obtener el public_id y la URL de la respuesta
      const { public_id, secure_url } = res;

      // Buscar y eliminar la foto de perfil existente del usuario (si existe)
      const existingProfile = await this.profileRepository.findOne({
        where: { user: { id: user.id } },
      });

      // Eliminar la foto de perfil anterior, si existe
      if (existingProfile) {
        await Promise.all([
          this.profileRepository.remove(existingProfile),
          cloudinary.uploader.destroy(existingProfile.publicId),
        ]);
      }

      // Crear y guardar la nueva foto de perfil
      const profilePhoto = this.profileRepository.create({
        publicId: public_id,
        url: secure_url,
        user,
      });
      await this.profileRepository.save(profilePhoto);

      return res;
    } catch (error) {
      throw new InternalServerErrorException('Algo salió mal al subir el archivo.');
    }
  }


  async getUserFile(user: User) {

    try {

      // Obtiene detalles de un recurso específico de Cloudinary
      const queryBuilder = this.userRepository.createQueryBuilder('user');

      const user = await queryBuilder.
        leftJoinAndSelect('user.profilePhotoUrl', 'profile_photo')
        .getOne();

      const { profilePhotoUrl } = user;

      return profilePhotoUrl;

    } catch (error) {
     
      this.logger.error(`Error al obtener archivo: ${error}`);
      throw new InternalServerErrorException('Algo salió mal al obtener el archivo.');

    }
  }

}
