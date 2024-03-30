/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { RequestPaginationQuery, RequestQuery } from "./commons";

export const protobufPackage = "user";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserList {
  data: User[];
}

export const USER_PACKAGE_NAME = "user";

export interface UserServicesClient {
  findOneUser(request: RequestQuery): Observable<User>;

  findAllUsers(request: RequestPaginationQuery): Observable<UserList>;

  queryUsers(request: Observable<RequestPaginationQuery>): Observable<UserList>;
}

export interface UserServicesController {
  findOneUser(request: RequestQuery): Promise<User> | Observable<User> | User;

  findAllUsers(request: RequestPaginationQuery): Promise<UserList> | Observable<UserList> | UserList;

  queryUsers(request: Observable<RequestPaginationQuery>): Observable<UserList>;
}

export function UserServicesControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["findOneUser", "findAllUsers"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UserServices", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = ["queryUsers"];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UserServices", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const USER_SERVICES_SERVICE_NAME = "UserServices";
