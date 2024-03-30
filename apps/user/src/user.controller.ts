import { Controller, Inject } from '@nestjs/common';
import { QueryUtils } from '@app/common';
import { UserServices } from './user.interface';
import {
  User,
  UserList,
  UserServicesController,
  UserServicesControllerMethods,
} from '@app/common/types/user';
import {
  RequestPaginationQuery,
  RequestQuery,
} from '@app/common/types/commons';
import { Observable } from 'rxjs';

@Controller()
@UserServicesControllerMethods()
export class UserController implements UserServicesController {
  constructor(
    @Inject('UserServices') private readonly userServices: UserServices,
    private readonly queryUtils: QueryUtils,
  ) {}

  async findAllUsers(query: RequestPaginationQuery): Promise<UserList> {
    const args = await this.queryUtils.getPaginationQueryParams(query);
    const users = await this.userServices.findAll(args);
    return { data: users };
  }

  async findOneUser(query: RequestQuery): Promise<User> {
    const args = await this.queryUtils.getQueryParams(query);
    return this.userServices.findOne(args);
  }

  queryUsers(
    request: Observable<RequestPaginationQuery>,
  ): Observable<UserList> {
    return new Observable((observer) => {
      request.subscribe(async (query) => {
        const args = await this.queryUtils.getPaginationQueryParams(query);
        const users = await this.userServices.findAll(args);
        observer.next({ data: users });
        observer.complete();
      });
    });
  }
}
