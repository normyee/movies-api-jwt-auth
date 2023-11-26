import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/infra/data/user.entity';
// import { UserDto } from 'src/infra/http/dtos/user.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UserServicee {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async all(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  // async create(data: UserDto) {
  //   return await this.userRepository.save(data);
  // }

  // async findById(id: number): Promise<UserEntity> {
  //   return this.userRepository.findOne({ where: { id } });
  // }

  // async updateById(id: number, data: UserDto): Promise<any> {
  //   return await this.userRepository.update(id, data);
  // }

  async deleteById(id: number): Promise<any> {
    return await this.userRepository.delete(id);
  }
}
