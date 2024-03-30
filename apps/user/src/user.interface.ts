import { Query, QueryPagination } from '@app/common';
import { User } from '@app/common/types/user';

export interface UserServices {
  findAll(query?: QueryPagination): Promise<Array<User>>;
  findOne(query: Query): Promise<User>;
  create(user: User): Promise<User>;
  update(user: User): Promise<User>;
  remove(id: number): Promise<boolean>;
}
