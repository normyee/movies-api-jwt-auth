import { Module, forwardRef } from '@nestjs/common';
import { UserController } from '../http/controller/user.controller';
import { UserService } from 'src/application/services/user/user.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserEntity } from '../data/user.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth.module';
import { MoviesEntity } from '../data/movie.entity';
import { MoviesModule } from './movies.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.TYPEORM_CONNECTION,
      host: process.env.TYPEORM_HOST,
      port: process.env.TYPEORM_PORT,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    } as TypeOrmModuleOptions),
    TypeOrmModule.forFeature([UserEntity, MoviesEntity]),
    forwardRef(() => AuthModule),
    forwardRef(() => MoviesModule),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
