import { Inject, Injectable } from '@nestjs/common';
import { UserInfo } from '@root/database/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @Inject('USER_REPOSITORY') private repository: Repository<UserInfo>,
  ) {}

  upsert(user: UserInfo): Promise<UserInfo> {
    return this.repository.save(user).catch((err) => {
      throw err;
    });
  }

  findOne(address: string): Promise<UserInfo> {
    return this.repository.findOne({
      where: {
        address,
      },
    });
  }
}
