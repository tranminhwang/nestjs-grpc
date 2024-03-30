/* eslint-disable */

export const protobufPackage = "commons";

export interface Empty {
}

export interface Query {
  attributes: string[];
  where: string;
}

export interface OrderByQuery {
  row: string[];
}

export interface QueryPagination {
  attributes: string[];
  where: string;
  orderBy: OrderByQuery[];
  offset: number;
  page: number;
  limit: number;
}

export interface RequestQuery {
  q: string;
  select: string;
}

export interface RequestPaginationQuery {
  q: string;
  select: string;
  orderBy: string;
  page: number;
  limit: number;
}

export const COMMONS_PACKAGE_NAME = "commons";
