import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/infra/data/user.entity';
import { UpdateUserDto } from 'src/infra/http/dtos/update-user.dto';
import { UserDto } from 'src/infra/http/dtos/user.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(data: UserDto) {
    return await this.userRepository.save(data);
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find({ select: ['id', 'name', 'email'] });
  }

  async findById(id: string): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { id } });
  }

  async updateById(id: string, data: UpdateUserDto): Promise<any> {
    return await this.userRepository.update(id, data);
  }

  async deleteById(id: string): Promise<any> {
    return await this.userRepository.delete(id);
  }
}
