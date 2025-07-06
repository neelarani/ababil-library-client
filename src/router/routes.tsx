import { createBrowserRouter } from 'react-router';
import Home from '../pages/Home';
import AddBook from '../pages/AddBook';
import AllBook from '../pages/AllBook';
import BorrowSummary from '../pages/BorrowSummary';
import BookDetails from '../pages/BookDetails';
import AddBorrow from '../pages/AddBorrow';
import EditBook from '../pages/EditBook';
import Books from '../components/book/Books';
import '../utils/env';

const route = createBrowserRouter([
  {
    path: '/',
    element: <Home></Home>,
    children: [
      {
        path: '/',
        element: <Books></Books>,
      },
      {
        path: '/create-book',
        element: <AddBook></AddBook>,
      },
      {
        path: '/books',
        element: <AllBook></AllBook>,
      },

      {
        path: '/borrow-summary',
        element: <BorrowSummary></BorrowSummary>,
      },
      {
        path: '/books/:id',
        element: <BookDetails></BookDetails>,
      },
      {
        path: '/borrow/:bookId',
        element: <AddBorrow></AddBorrow>,
      },
      {
        path: '/edit-book/:id',
        element: <EditBook></EditBook>,
      },
    ],
  },
]);

export default route;
