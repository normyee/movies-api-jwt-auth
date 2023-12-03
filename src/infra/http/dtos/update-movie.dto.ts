import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateMovieDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsInt()
  @IsOptional()
  year: number;
}
