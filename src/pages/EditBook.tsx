import { useForm, type SubmitHandler } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import type { IBook } from '../types/book.interface';
import {
  useGetSingleBookQuery,
  useUpdateBookMutation,
} from '../redux/features/books/book.api';
import Swal from 'sweetalert2';

const EditBook = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetSingleBookQuery(id!);
  const [updateBook] = useUpdateBookMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IBook>();

  const onSubmit: SubmitHandler<IBook> = async updatedData => {
    try {
      const formattedData = {
        ...updatedData,
        _id: id,
        copies: Number(updatedData.copies),
      };

      const res = await updateBook(formattedData);
      if (res.data) {
        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: 'Book information updated successfully.',
          timer: 1000,
        });
        navigate('/books');
      } else if (res.error) {
        throw new Error();
      }
    } catch (err: unknown) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: (err instanceof Error && err.message) || 'Failed to update book.',
      });
    }
  };

  // Loading or error UI
  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError || !data?.data)
    return <p className="text-red-500 text-center mt-10">Book not found!</p>;

  const book = data.data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#280d5a] via-[#1e0e4b] to-slate-950 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white dark:bg-[#0f0f1a] shadow-2xl rounded-3xl p-10">
        <h2 className="text-4xl font-bold text-center text-purple-800 dark:text-purple-300 mb-8">
          Edit Book
        </h2>

        <form
          className="space-y-6"
          onSubmit={handleSubmit(onSubmit)}
          onReset={() => reset(book)}
        >
          {/* Title */}
          <div>
            <label className="block mb-1 text-gray-300">Title</label>
            <input
              type="text"
              defaultValue={book.title}
              {...register('title', { required: 'Title is required' })}
              className="w-full px-4 py-2 rounded-lg border bg-gray-100 dark:bg-[#1f1b2e] text-gray-800 dark:text-gray-200 border-purple-400"
            />
            {errors.title && (
              <p className="text-red-500">{errors.title.message}</p>
            )}
          </div>

          {/* Author */}
          <div>
            <label className="block mb-1 text-gray-300">Author</label>
            <input
              type="text"
              defaultValue={book.author}
              {...register('author', { required: 'Author is required' })}
              className="w-full px-4 py-2 rounded-lg border bg-gray-100 dark:bg-[#1f1b2e] text-gray-800 dark:text-gray-200 border-purple-400"
            />
            {errors.author && (
              <p className="text-red-500">{errors.author.message}</p>
            )}
          </div>

          {/* Genre */}
          <div>
            <label className="block mb-1 text-gray-300">Genre</label>
            <select
              defaultValue={book.genre}
              {...register('genre', { required: 'Genre is required' })}
              className="w-full px-4 py-2 rounded-lg border bg-gray-100 dark:bg-[#1f1b2e] text-gray-800 dark:text-gray-200 border-purple-400"
            >
              <option value="FICTION">Fiction</option>
              <option value="NON_FICTION">Non-Fiction</option>
              <option value="SCIENCE">Science</option>
              <option value="HISTORY">History</option>
              <option value="BIOGRAPHY">Biography</option>
              <option value="FANTASY">Fantasy</option>
            </select>
            {errors.genre && (
              <p className="text-red-500">{errors.genre.message}</p>
            )}
          </div>

          {/* ISBN */}
          <div>
            <label className="block mb-1 text-gray-300">ISBN</label>
            <input
              type="text"
              defaultValue={book.isbn}
              {...register('isbn', { required: 'ISBN is required' })}
              className="w-full px-4 py-2 rounded-lg border bg-gray-100 dark:bg-[#1f1b2e] text-gray-800 dark:text-gray-200 border-purple-400"
            />
            {errors.isbn && (
              <p className="text-red-500">{errors.isbn.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 text-gray-300">Description</label>
            <textarea
              rows={4}
              defaultValue={book.description}
              {...register('description', {
                required: 'Description is required',
              })}
              className="w-full px-4 py-2 rounded-lg border bg-gray-100 dark:bg-[#1f1b2e] text-gray-800 dark:text-gray-200 border-purple-400"
            ></textarea>
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>

          {/* Copies */}
          <div>
            <label className="block mb-1 text-gray-300">Copies</label>
            <input
              type="number"
              defaultValue={book.copies}
              {...register('copies', {
                required: 'Copies is required',
                min: { value: 0, message: 'Copies cannot be negative' },
              })}
              className="w-full px-4 py-2 rounded-lg border bg-gray-100 dark:bg-[#1f1b2e] text-gray-800 dark:text-gray-200 border-purple-400"
            />
            {errors.copies && (
              <p className="text-red-500">{errors.copies.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center pt-4">
            <button
              type="submit"
              className="px-8 py-2 bg-purple-800 hover:bg-purple-900 text-white rounded-xl shadow-lg transition duration-300 cursor-pointer"
            >
              Update Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBook;
