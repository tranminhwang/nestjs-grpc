import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { RequestQuery } from '@app/common/types/commons';
import {
  USER_SERVICES_SERVICE_NAME,
  UserServicesClient,
} from '@app/common/types/user';

@Injectable()
export class AuthService implements OnModuleInit {
  private userServices: UserServicesClient;

  constructor(
    @Inject('UserServicesClient')
    private readonly userServicesClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.userServices = this.userServicesClient.getService<UserServicesClient>(
      USER_SERVICES_SERVICE_NAME,
    );
  }

  async validateUser(email: string, password: string): Promise<any> {
    const findOptions: RequestQuery = {
      q: `email:${email},password:${password}`,
      select: ['id', 'email'].join(','),
    };
    const observable = this.userServices.findOneUser(findOptions);
    return firstValueFrom(observable);
  }
}
