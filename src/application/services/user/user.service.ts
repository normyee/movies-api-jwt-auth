import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeleteResponse,
  UpdateResponse,
  UpdateUser,
  UserData,
} from 'src/common/types';
import { UserEntity } from '../../../infra/data/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(data: UserData) {
    const user = this.userRepository.create(data);
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find({ select: ['id', 'name', 'email'] });
  }

  async findById(id: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async updateById(id: string, data: UpdateUser): Promise<UpdateResponse> {
    return await this.userRepository.update(id, data);
  }

  async deleteById(id: string): Promise<DeleteResponse> {
    return await this.userRepository.delete(id);
  }
}
