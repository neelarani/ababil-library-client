import {
  useDeleteBookMutation,
  useGetBooksQuery,
} from '../../redux/features/books/book.api';
import Swal from 'sweetalert2';
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { VscBook } from 'react-icons/vsc';
import { useState } from 'react';

const BookTable = () => {
  const { data: books, error, isLoading } = useGetBooksQuery();
  const [deleteBook] = useDeleteBookMutation();

  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10;

  // pagination এর জন্য হিসাব
  const totalBooks = books?.data?.length || 0;
  const totalPages = Math.ceil(totalBooks / booksPerPage);

  const startIndex = (currentPage - 1) * booksPerPage;
  const endIndex = startIndex + booksPerPage;
  const currentBooks = books?.data?.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e0e4b] via-[#0f0f1a] to-slate-950 p-10">
      <div className="max-w-10/12 mx-auto bg-white dark:bg-[#0f0f1a] shadow-2xl rounded-3xl p-8 overflow-x-auto">
        <h2 className="text-3xl font-bold text-center text-purple-800 dark:text-purple-300 mb-6">
          Books List
        </h2>

        {isLoading && <p className="text-center text-white">Loading...</p>}
        {error && (
          <p className="text-center text-red-500">Something went wrong!</p>
        )}

        {currentBooks && (
          <>
            <table className="min-w-full text-left border border-purple-700 rounded-lg">
              <thead className="bg-purple-800 text-white">
                <tr>
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Author</th>
                  <th className="py-3 px-4">Genre</th>
                  <th className="py-3 px-4">ISBN</th>
                  <th className="py-3 px-4">Copies</th>
                  <th className="py-3 px-4">Available</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-gray-100 dark:bg-[#1f1b2e] text-gray-800 dark:text-gray-200">
                {currentBooks.map(book => (
                  <tr key={book._id} className="border-b border-purple-300">
                    <td className="py-3 px-4">{book.title}</td>
                    <td className="py-3 px-4">{book.author}</td>
                    <td className="py-3 px-4">{book.genre}</td>
                    <td className="py-3 px-4">{book.isbn}</td>
                    <td className="py-3 px-4">{book.copies}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-1 text-sm font-medium rounded ${
                          book.available
                            ? 'bg-green-600 text-white'
                            : 'bg-red-500 text-white'
                        }`}
                      >
                        {book.available ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="py-3 px-4 flex items-center justify-center gap-3">
                      <Link to={`/edit-book/${book._id}`}>
                        <button
                          title="Edit the Book"
                          className="text-blue-500 hover:text-blue-700 cursor-pointer"
                        >
                          <FaRegEdit size={25} />
                        </button>
                      </Link>
                      <button
                        title="Delete the Book"
                        className="text-red-500 hover:text-red-700 cursor-pointer"
                      >
                        <RiDeleteBin5Line
                          onClick={() => {
                            Swal.fire({
                              title: 'Are you sure?',
                              text: "You won't be able to revert this!",
                              icon: 'warning',
                              showCancelButton: true,
                              confirmButtonColor: '#3085d6',
                              cancelButtonColor: '#d33',
                              confirmButtonText: 'Yes, delete it!',
                            }).then(result => {
                              if (result.isConfirmed) {
                                deleteBook(book._id);
                                Swal.fire(
                                  'Deleted!',
                                  'Your book has been deleted.',
                                  'success'
                                );
                              }
                            });
                          }}
                          size={25}
                        />
                      </button>

                      <Link to={`/borrow/${book._id}`}>
                        <button title="Borrow the Book">
                          <VscBook size={25} />
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Buttons */}
            <div className="flex justify-center mt-6 gap-4">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-purple-700 text-white rounded disabled:opacity-50"
              >
                Prev
              </button>
              <span className="text-white mt-2">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-purple-700 text-white rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BookTable;
