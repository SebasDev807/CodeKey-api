import { ApiProperty } from '@nestjs/swagger';
import {  IsInt, IsPositive, IsUrl, MaxLength } from 'class-validator';

export class CreateCourseDto {

  @ApiProperty()
  @IsInt()
  @IsPositive()
  id:number;


  @ApiProperty({
    example: 'Java Course',
  })
  @MaxLength(50)
  title: string;

  
  @ApiProperty({
    example: 'Lorem ipsum',
  })
  @MaxLength(500)
  description:string;


  @ApiProperty({
    example: 'http://image.png',
  })
  @IsUrl()
  imageSrc: string;
}
