import { Inject, Injectable, Logger } from '@nestjs/common';
import { isEmpty } from 'lodash';
import { Query, QueryAndCount } from '@app/common';
import { UserServices } from './user.interface';
import { User } from './entities/user.entity';

@Injectable()
export class UserServicesImpl implements UserServices {
  private readonly logger = new Logger(UserServicesImpl.name);

  constructor(
    @Inject('UserRepository') private readonly userRepository: typeof User,
  ) {}

  async findAll(query?: Query): Promise<QueryAndCount<User>> {
    return this.userRepository.findAndCountAll<User>({
      ...(!isEmpty(query.attributes) && { attributes: query.attributes }),
      ...(!isEmpty(query.where) && { where: JSON.parse(query.where) }),
      ...(!isEmpty(query.order) && { order: JSON.parse(query.order) }),
      ...(query.offset && { offset: query.offset }),
      ...(query.limit && { limit: query.limit }),
    });
  }

  async findOne(query: Query): Promise<User> {
    return this.userRepository.findOne({
      ...(!isEmpty(query.attributes) && { attributes: query.attributes }),
      where: JSON.parse(query.where),
    });
  }

  async create(user: User): Promise<User> {
    return this.userRepository.create(user);
  }

  async update(user: User): Promise<User> {
    this.logger.debug('update', user);
    throw new Error('Method not implemented.');
  }

  async remove(id: number): Promise<boolean> {
    this.logger.debug('remove', id);
    throw new Error('Method not implemented.');
  }
}
