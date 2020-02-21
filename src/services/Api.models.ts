export interface ApiGetBooksParams {
  q?: string;
  startIndex?: number;
  maxResults?: number;
  filter?: ApiBooksFilter;
  printType?: ApiBooksPrintType;
  projection?: ApiBooksProjection;
  orderBy?: ApiBooksSort;
}

export interface ApiGetBooksResponse {
  kind?: string;
  items?: ApiGetBooksResponseItem[];
}

export interface ApiGetBooksResponseItem {
  id: string;
  kind: string;
  etag: string;
  selfLink: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    publisher?: string;
    publishedDate?: string;
    pageCount?: number;
    printType?: string;
    categories?: string[];
    maturityRating?: string;
    contentVersion?: string;
    language?: string;
    previewLink?: string;
    infoLink?: string;
    canonicalVolumeLink?: string;
    averageRating?: string;
  },
  saleInfo: {
    country?: string;
    saleability?: string;
    buyLink?: string;
  },
  accessInfo: {
    country?: string;
    viewability?: string;
    epub?: { downloadLink?: string; };
    pdf?: { downloadLink?: string; };
    webReaderLink?: string;
    accessViewStatus?: string;
  }
}

export enum ApiBooksFilter {
  PARTIAL = "partial",
  FULL = "full",
  E_BOOKS = "ebooks",
  FREE_E_BOOKS = "free-ebooks",
  PAID_E_BOOKS = "paid-ebooks",
}

export enum ApiBooksPrintType {
  ALL = "all",
  BOOKS = "books",
  MAGAZINES = "magazines",
}

export enum ApiBooksProjection {
  FULL = "full",
  LITE = "lite",
}

export enum ApiBooksSort {
  RELEVANCE = "relevance",
  NEWEST = "newest",
}