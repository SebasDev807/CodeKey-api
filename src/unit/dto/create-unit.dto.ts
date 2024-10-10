import { IsInt, IsString, MinLength } from 'class-validator';

export class CreateUnitDto {
  @IsString()
  @MinLength(5)
  public title: string;

  @IsString()
  @MinLength(15)
  public description: string;

  // TODO: orden integer
  @IsInt()
  public order: number;
}
