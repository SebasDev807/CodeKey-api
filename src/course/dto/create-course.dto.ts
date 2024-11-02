import { IsString, IsUrl, MaxLength } from 'class-validator';

export class CreateCourseDto {
  @MaxLength(50)
  title: string;

  @MaxLength(500)
  description:string;

  @IsUrl()
  imageSrc: string;
}
