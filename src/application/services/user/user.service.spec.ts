import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { Repository } from 'typeorm';
import { UserEntity } from '../../../infra/data/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: getRepositoryToken(UserEntity), useClass: Repository },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should create an user', async () => {
    const mockUserData = {
      name: 'user',
      email: 'user@gmail.com',
      password: 'User@123pass',
    };

    const mockCreate = jest
      .spyOn(userRepository, 'create')
      .mockReturnValue(mockUserData as UserEntity);
    const mockSave = jest
      .spyOn(userRepository, 'save')
      .mockResolvedValue(mockUserData as UserEntity);

    const result = await userService.create(mockUserData);

    expect(mockCreate).toHaveBeenCalledWith(mockUserData);
    expect(mockSave).toHaveBeenCalledWith(mockUserData);
    expect(result).toEqual(mockUserData);
  });

  //should not create an user

  //should have a proper password
});
