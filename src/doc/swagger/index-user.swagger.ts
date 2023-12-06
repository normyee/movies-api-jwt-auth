import { UserEntity } from 'src/infra/data/user.entity';
import { PartialType, OmitType } from '@nestjs/swagger';

export class IndexUserSwagger extends PartialType(
  OmitType(UserEntity, ['password', 'createdAt', 'deletedAt', 'updatedAt']),
) {}
