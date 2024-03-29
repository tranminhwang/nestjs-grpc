import { Controller, Inject } from '@nestjs/common';
import { QueryAndCount } from '@app/common';
import { UserServices } from './user.interface';
import { User } from './entities';

@Controller()
export class UserController {
  constructor(
    @Inject('UserServices') private readonly userService: UserServices,
  ) {}

  async findAll(query: any): Promise<QueryAndCount<User>> {
    return this.userService.findAll(query);
  }
}
