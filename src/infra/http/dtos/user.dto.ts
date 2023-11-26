import { IsString, IsNotEmpty } from 'class-validator';

export class UserDto {
  @IsNotEmpty({ message: 'Name cannot be empty!' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'Email cannot be empty!' })
  @IsString()
  email: string;

  @IsNotEmpty({ message: 'password is needed!' })
  @IsString()
  password: string;
}
