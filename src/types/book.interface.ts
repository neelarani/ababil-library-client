export interface IBook {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
}

export interface IGetBooksResponse {
  success: boolean;
  message: string;
  data: IBook[];
}
