import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { MoviesController } from '../http/controller/movies.controller';
import { MoviesService } from '../../application/services/movies/movies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesEntity } from '../data/movie.entity';
import { redisStore } from 'cache-manager-redis-yet';

@Module({
  imports: [
    CacheModule.register({ store: redisStore }),
    TypeOrmModule.forFeature([MoviesEntity]),
  ],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
