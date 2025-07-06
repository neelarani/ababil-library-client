import { Link, useParams } from 'react-router';
import { useGetSingleBookQuery } from '../redux/features/books/book.api';

const BookDetails = () => {
  const params = useParams<{ id: string }>();
  const { data, isLoading, isError } = useGetSingleBookQuery(params.id!);

  if (isLoading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (isError) {
    return (
      <p className="text-center mt-10 text-red-500">
        Something went wrong while fetching the book details!
      </p>
    );
  }

  const book = data?.data;
  if (!book) {
    return <p>No Book Available</p>;
  }

  return (
    <div className="w-10/12 mx-auto mt-12  h-screen">
      <h2 className="text-2xl font-bold mb-4 text-white text-center">
        Book Details
      </h2>

      <div className="mt-10 p-10 space-y-3 text-left border-[1px] border-purple-950 rounded bg-white/5 shadow-2xl text-white w-full justify-center  items-center flex flex-col">
        <p>
          <span className="font-semibold">Title:</span> {book.title}
        </p>
        <p>
          <span className="font-semibold">Author:</span> {book.author}
        </p>
        <p>
          <span className="font-semibold">Genre:</span> {book.genre}
        </p>
        <p>
          <span className="font-semibold">ISBN:</span> {book.isbn}
        </p>
        <p>
          <span className="font-semibold">Description:</span> {book.description}
        </p>
        <p>
          <span className="font-semibold">Copies:</span> {book.copies}
        </p>
        <p>
          <span className="font-semibold">Available: </span>
          {book.available ? 'Yes' : 'No'}
        </p>
        <div>
          <Link
            to={`/borrow/${book._id}`}
            className="bg-purple-800 hover:bg-purple-900 text-white py-1 px-2 rounded-lg"
          >
            Borrow Book
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
