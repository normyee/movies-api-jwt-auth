import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, Matches } from 'class-validator';
import { RegExHelper } from 'src/infra/helpers/regex.helper';

export class UserDto {
  @ApiProperty({
    description: 'Username for the login user.',
    example: 'Sisi amimi',
  })
  @IsNotEmpty({ message: 'Name is needed!' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Email used for login.',
    example: 'amimisisi@gmail.com',
  })
  @IsNotEmpty({ message: 'Email is needed!' })
  @IsEmail()
  email: string;

  @ApiProperty({
    description:
      'Password for the user. It must contain uppercase letters, lowercase, numbers and special characters.',
    example: 'Siwi@afkdi2i9',
  })
  @IsNotEmpty({ message: 'Password is needed!' })
  @Matches(RegExHelper.password, {
    message:
      'The password must contain uppercase letters, lowercase letters, numbers, and special characters.',
  })
  password: string;
}
