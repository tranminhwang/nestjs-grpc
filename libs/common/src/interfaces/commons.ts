export interface Query {
  attributes?: Array<string>;
  where?: string;
  order?: string;
  offset?: number;
  limit?: number;
}

export interface Count {
  count: number;
}

export interface QueryAndCount<T> {
  rows: Array<T>;
  count: number;
}

export enum GrpcPackage {
  User = 'user',
}
