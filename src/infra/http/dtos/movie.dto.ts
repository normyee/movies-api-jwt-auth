import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class MovieDto {
  @IsNotEmpty({ message: 'Title is needed!' })
  @IsString()
  title: string;

  @IsNotEmpty({ message: 'Description is needed!' })
  @IsString()
  description: string;

  @IsNotEmpty({ message: 'Year is needed!' })
  @IsInt()
  year: number;
}
