import { IsString, IsNotEmpty, IsEmail, Matches } from 'class-validator';
import { RegExHelper } from 'src/infra/helpers/regex.helper';

export class UserDto {
  @IsNotEmpty({ message: 'Name is needed!' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'Email is needed!' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'Password is needed!' })
  @Matches(RegExHelper.password)
  password: string;
}
