import { Module } from '@nestjs/common';
import { UserController } from '../http/controller/user.controller';
import { UserServicee } from '../../application/services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../data/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'pgdb',
      autoLoadEntities: true, // only for development purposes!!
      synchronize: true,
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [UserController],
  providers: [UserServicee],
})
export class UserModule {}
