import { Injectable } from '@nestjs/common';
import { isNil, isEmpty, map } from 'lodash';
import { RequestPaginationQuery, RequestQuery } from '../types/commons';

export interface Query {
  attributes?: Array<string>;
  where?: string;
}
export interface QueryPagination extends Query {
  order?: string;
  offset?: number;
  page?: number;
  limit?: number;
}

@Injectable()
export class QueryUtils {
  async getPaginationQueryParams(
    query: RequestPaginationQuery,
  ): Promise<QueryPagination> {
    return {
      attributes: await this.getAttributes(query.select),
      where: await this.getWhere(query.q),
      order: await this.getOrder(query.orderBy),
      offset: await this.getOffset(query.page, query.limit),
      page: await this.getPage(query.page),
      limit: await this.getLimit(query.limit),
    };
  }

  async getQueryParams(query: RequestQuery): Promise<Query> {
    return {
      attributes: await this.getAttributes(query.select),
      where: await this.getWhere(query.q),
    };
  }

  async getAttributes(attributes: string): Promise<Array<string>> {
    return !isEmpty(attributes) ? attributes.split(',') : undefined;
  }

  async getPage(page: any): Promise<number> {
    let result = 1;

    if (isEmpty(page)) return result;

    if (!isNil(page)) result = parseInt(page, 10);
    if (result < 1) result = 1;

    return result;
  }

  async getLimit(limit: any): Promise<number> {
    let result = 10;

    if (isEmpty(limit)) return result;

    if (!isNil(limit)) result = parseInt(limit, 10);
    if (result < 1) result = 1;

    return result;
  }

  async getOffset(page: any, limit: any): Promise<number> {
    const tmpPage = await this.getPage(page);
    const tmpLimit = await this.getLimit(limit);

    return (tmpPage - 1) * tmpLimit;
  }

  async getOrder(orderBy: string): Promise<string> {
    let result: Array<Array<string>> = [];

    if (!isEmpty(orderBy)) {
      const attributes: Array<string> = orderBy.split(',');

      result = map(attributes, (attribute) => {
        if (attribute.trim().charAt(0) === '-') {
          return [attribute.trim().substr(1), 'DESC'];
        }
        return [attribute.trim(), 'ASC'];
      });
    }

    return JSON.stringify(result);
  }

  async getWhere(where: string): Promise<any> {
    if (isEmpty(where)) return;
    const whereOptions = where.split(',');
    const result = {};
    whereOptions.forEach((option) => {
      const [key, value] = option.split(':');
      result[key] = value;
    });
    return JSON.stringify(result);
  }
}
