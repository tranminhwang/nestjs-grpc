import { Inject, Injectable, Logger } from '@nestjs/common';
import { isEmpty } from 'lodash';
import { Query, QueryPagination } from '@app/common';
import { UserServices } from './user.interface';
import { User } from '@app/common/types/user';
import { UserEntity } from './entities';

@Injectable()
export class UserServicesImpl implements UserServices {
  private readonly logger = new Logger(UserServicesImpl.name);

  constructor(
    @Inject('UserRepository')
    private readonly userRepository: typeof UserEntity,
  ) {}

  async findAll(query?: QueryPagination): Promise<Array<User>> {
    const userEntities = await this.userRepository.findAll<UserEntity>({
      ...(!isEmpty(query.attributes) && { attributes: query.attributes }),
      ...(!isEmpty(query.where) && { where: JSON.parse(query.where) }),
      ...(!isEmpty(query.order) && { order: JSON.parse(query.order) }),
      ...(query.offset && { offset: query.offset }),
      ...(query.limit && { limit: query.limit }),
    });
    return userEntities.map(this.toUser.bind(this));
  }

  async findOne(query: Query): Promise<User> {
    return this.userRepository
      .findOne({
        ...(!isEmpty(query.attributes) && { attributes: query.attributes }),
        where: JSON.parse(query.where),
      })
      .then(this.toUser.bind(this));
  }

  async create(user: User): Promise<User> {
    return this.userRepository.create(user).then(this.toUser.bind(this));
  }

  async update(user: User): Promise<User> {
    this.logger.debug('update', user);
    throw new Error('Method not implemented.');
  }

  async remove(id: number): Promise<boolean> {
    this.logger.debug('remove', id);
    throw new Error('Method not implemented.');
  }

  private toUser(userEntity: UserEntity): User {
    return userEntity.toJSON<User>();
  }
}
