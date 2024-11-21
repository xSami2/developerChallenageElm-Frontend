interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

interface Pageable {
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  sort: Sort;
  unpaged: boolean;
}

export class pagebleObject<T> {
  content: T[] | any;
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: Pageable;
  size: number;
  sort: Sort;
  totalElements: number;
  totalPages: number;

  constructor() {
    this.content = [];
    this.empty = true;
    this.first = true;
    this.last = false;
    this.number = 0;
    this.numberOfElements = 0;
    this.pageable = {
      offset: 0,
      pageNumber: 0,
      pageSize: 30,
      paged: true,
      sort: {
        empty: true,
        sorted: false,
        unsorted: true
      },
      unpaged: false
    };
    this.size = 30;
    this.sort = {
      empty: true,
      sorted: false,
      unsorted: true
    };
    this.totalElements = 0;
    this.totalPages = 0;
  }
}

