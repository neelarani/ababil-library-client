export interface Response<T> {
  success: boolean;
  message: string;
  data: T;
}

export type TBorrowSummary = {
  totalQuantity: number;
  book: {
    title: string;
    isbn: string;
  };
};

export interface IBorrowForm {
  bookId: string;
  dueDate: string;
  quantity: number;
}
