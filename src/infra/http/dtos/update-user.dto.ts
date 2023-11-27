import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty({ message: 'Name is needed!' })
  @IsString()
  name: string;
}
