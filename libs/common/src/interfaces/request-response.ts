export interface RequestQuery {
  q: string;
  select: string;
}

export interface RequestPaginationQuery extends RequestQuery {
  orderBy: string;
  page: number;
  limit: number;
}

export interface QueryPaginationResponse<T> {
  totalRecords: number;
  totalPages: number;
  page: number;
  limit: number;
  data: Array<T>;
}
