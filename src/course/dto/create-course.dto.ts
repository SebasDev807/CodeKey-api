import { IsString, MaxLength } from 'class-validator';

export class CreateCourseDto {
  @MaxLength(20)
  @IsString()
  public title: string;

  @IsString()
  public imageSrc: string;
}
