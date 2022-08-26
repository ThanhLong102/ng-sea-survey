export class QueryParamsModel2 {
  // fields
  filter: any;
  sortOrder: string; // asc || desc
  sortField: string;
  pageNumber: number;
  pageSize: number;
  statusLoad : boolean;

  // constructor overrides
  constructor(filter, sortOrder = '', sortField = '', pageNumber = 0, pageSize = 100000) {
    this.filter = filter;
    this.sortOrder = sortOrder;
    this.sortField = sortField;
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
  }
}
