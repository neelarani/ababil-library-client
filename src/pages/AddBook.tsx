import { useForm, type SubmitHandler } from 'react-hook-form';
import type { IBook } from '../types/book.interface';
import {
  useAddBookMutation,
  useGetBooksQuery,
} from '../redux/features/books/book.api';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const AddBook = () => {
  const [addBook] = useAddBookMutation();
  const book = useGetBooksQuery();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IBook>();

  const onSubmit: SubmitHandler<IBook> = async formData => {
    const formattedData = {
      ...formData,
      copies: Number(formData.copies),
      available: true,
    };
    const { data, error } = await addBook(formattedData);
    if (error) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Oppss...',
        text: 'Failed to add book!',
        showConfirmButton: false,
        timer: 1500,
      });
    } else if (data) {
      reset();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'WOW',
        text: 'Book Added successully!',
        showConfirmButton: false,
        timer: 1500,
      });
      book.refetch();
      navigate('/books');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e0e4b] via-[#0f0f1a] to-slate-950 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white dark:bg-[#0f0f1a] shadow-2xl rounded-3xl p-10">
        <h2 className="text-4xl font-bold text-center text-purple-800 dark:text-purple-300 mb-8">
          Add New Book
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Title */}
          <div>
            <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1">
              Title
            </label>
            <input
              type="text"
              {...register('title', { required: 'Title is required' })}
              placeholder="Enter book title"
              className="w-full px-4 py-2 rounded-lg border border-purple-400 dark:border-purple-700 bg-gray-100 dark:bg-[#1f1b2e] text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          {/* Author */}
          <div>
            <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1">
              Author
            </label>
            <input
              type="text"
              {...register('author', { required: 'Author is required' })}
              placeholder="Enter author name"
              className="w-full px-4 py-2 rounded-lg border border-purple-400 dark:border-purple-700 bg-gray-100 dark:bg-[#1f1b2e] text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            {errors.author && (
              <p className="text-red-500 text-sm">{errors.author.message}</p>
            )}
          </div>

          {/* Genre */}
          <div>
            <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1">
              Genre
            </label>
            <select
              {...register('genre', { required: 'Genre is required' })}
              className="w-full px-4 py-2 rounded-lg border border-purple-400 dark:border-purple-700 bg-gray-100 dark:bg-[#1f1b2e] text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-600"
              defaultValue=""
            >
              <option value="" disabled>
                Select genre
              </option>
              <option value="FICTION">Fiction</option>
              <option value="NON_FICTION">Non-Fiction</option>
              <option value="SCIENCE">Science</option>
              <option value="HISTORY">History</option>
              <option value="BIOGRAPHY">Biography</option>
              <option value="FANTASY">Fantasy</option>
            </select>
            {errors.genre && (
              <p className="text-red-500 text-sm">{errors.genre.message}</p>
            )}
          </div>

          {/* ISBN */}
          <div>
            <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1">
              ISBN
            </label>
            <input
              type="text"
              {...register('isbn', { required: 'ISBN is required' })}
              placeholder="Enter ISBN"
              className="w-full px-4 py-2 rounded-lg border border-purple-400 dark:border-purple-700 bg-gray-100 dark:bg-[#1f1b2e] text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            {errors.isbn && (
              <p className="text-red-500 text-sm">{errors.isbn.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              {...register('description', {
                required: 'Description is required',
              })}
              placeholder="Short description"
              rows={4}
              className="w-full px-4 py-2 rounded-lg border border-purple-400 dark:border-purple-700 bg-gray-100 dark:bg-[#1f1b2e] text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-600"
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Copies */}
          <div>
            <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1">
              Copies
            </label>
            <input
              type="number"
              {...register('copies', {
                required: 'Copies is required',
                min: { value: 0, message: 'Copies cannot be negative' },
              })}
              placeholder="Available copies"
              className="w-full px-4 py-2 rounded-lg border border-purple-400 dark:border-purple-700 bg-gray-100 dark:bg-[#1f1b2e] text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            {errors.copies && (
              <p className="text-red-500 text-sm">{errors.copies.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center pt-4">
            <button
              type="submit"
              className="px-8 py-2 bg-purple-800 hover:bg-purple-900 text-white rounded-xl shadow-lg transition duration-300 cursor-pointer"
            >
              + Add Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
