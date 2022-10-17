export interface CustomPagination {
  readonly count?: number;
  readonly num_pages?: number;
  readonly links?: links;
  results: Array<any>;
}

interface links {
  readonly next?: string;
  readonly previous?: string;
}
