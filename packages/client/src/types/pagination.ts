export interface Pagination {
  currentPage: number;
  lastPage: number;
  perPage: number;
  total: number;
}
export const EMPTY_PAGINATION: Pagination = {
  currentPage: 0,
  lastPage: 0,
  perPage: 0,
  total: 0,
};
