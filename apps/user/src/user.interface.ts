import { Query, QueryAndCount } from '@app/common';
import { User } from './entities/user.entity';

export interface UserServices {
  findAll(query?: Query): Promise<QueryAndCount<User>>;
  findOne(query: Query): Promise<User>;
  create(user: User): Promise<User>;
  update(user: User): Promise<User>;
  remove(id: number): Promise<boolean>;
}
