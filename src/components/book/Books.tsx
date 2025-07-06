import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetBooksQuery } from '../../redux/features/books/book.api';

const Books = () => {
  const { data, isLoading, isError } = useGetBooksQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10;

  const totalBooks = data?.data?.length || 0;
  const totalPages = Math.ceil(totalBooks / booksPerPage);

  const startIndex = (currentPage - 1) * booksPerPage;
  const endIndex = startIndex + booksPerPage;
  const currentBooks = data?.data?.slice(startIndex, endIndex);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">Something went wrong!</p>
    );

  return (
    <div className="p-6 w-10/12 mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-purple-50">All Books</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentBooks?.map(book => (
          <div
            key={book._id}
            className="border border-purple-700/30 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 backdrop-blur-sm bg-white/5 text-white"
          >
            <h3 className="text-xl font-bold mb-2">{book.title}</h3>
            <p className="font-medium">
              Author: <span className="font-normal">{book.author}</span>
            </p>
            <p>
              <span className="font-medium">Genre:</span> {book.genre}
            </p>
            <p>
              <span className="font-medium">ISBN:</span> {book.isbn}
            </p>
            <p className="mb-4">
              <span className="font-medium">Available:</span>{' '}
              {book.available ? 'Yes' : 'No'}
            </p>

            <Link to={`/books/${book._id}`}>
              <button className="px-2 py-1 bg-purple-800 hover:bg-purple-900 text-white rounded-lg transition text-sm">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-18 gap-4 items-center text-white">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-5 py-1 border-purple-700 text-purple-300 hover:text-purple-100 border-[1px] cursor-pointer rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-5 py-1 border-purple-700 border-[1px] cursor-pointer rounded disabled:opacity-50 text-purple-300 hover:text-purple-100"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Books;
