import { Injectable } from '@nestjs/common';
import { MoviesEntity } from '../../../infra/data/movie.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeleteResponse,
  MovieData,
  UpdateResponse,
} from '../../../common/types';
import { MovieDto } from '../../../infra/http/dtos/movie.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(MoviesEntity)
    private readonly userRepository: Repository<MoviesEntity>,
  ) {}

  async create(data: MovieDto) {
    const title = this.userRepository.create(data);
    return await this.userRepository.save(title);
  }

  async findAll(): Promise<MoviesEntity[]> {
    return await this.userRepository.find();
  }

  async findById(id: string): Promise<MoviesEntity> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async findByTitle(title: string): Promise<MoviesEntity> {
    return await this.userRepository.findOne({ where: { title } });
  }

  async updateById(id: string, data: MovieData): Promise<UpdateResponse> {
    return await this.userRepository.update(id, data);
  }

  async deleteById(id: string): Promise<DeleteResponse> {
    return await this.userRepository.delete(id);
  }
}
