import { Inject, Injectable } from '@nestjs/common';
import { MoviesEntity } from 'src/infra/data/movie.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(MoviesEntity)
    private readonly userRepository: Repository<MoviesEntity>,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async create(data: any) {
    const title = this.userRepository.create(data);
    return await this.userRepository.save(title);
  }

  async findAll(): Promise<MoviesEntity[]> {
    const cachedCatalog = await this.cacheManager.get('catalog');

    if (cachedCatalog) {
      console.log('Cached');

      return cachedCatalog as MoviesEntity[];
    }

    const catalog = await this.userRepository.find();

    await this.cacheManager.set('catalog', catalog, 60000);

    console.log('Caching...');

    return catalog;
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
