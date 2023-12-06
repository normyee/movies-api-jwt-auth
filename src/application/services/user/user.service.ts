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
import { EmailAlreadyInUseException } from 'src/errors/email-already-in-use.error';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(data: UserData) {
    try {
      const { email } = data;
      if (await this.userRepository.findOne({ where: { email } })) {
        throw new EmailAlreadyInUseException('This email is already in use.');
      }
      const user = this.userRepository.create(data);
      return await this.userRepository.save(user);
    } catch (error) {
      console.error(error);
    }
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
