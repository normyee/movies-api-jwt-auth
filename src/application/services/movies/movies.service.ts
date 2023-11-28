import { Injectable } from '@nestjs/common';
import { MoviesEntity } from 'src/infra/data/movie.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(MoviesEntity)
    private readonly userRepository: Repository<MoviesEntity>,
  ) {}

  async create(data: any) {
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

  async updateById(id: string, data: any): Promise<any> {
    return await this.userRepository.update(id, data);
  }

  async deleteById(id: string): Promise<any> {
    return await this.userRepository.delete(id);
  }
}
