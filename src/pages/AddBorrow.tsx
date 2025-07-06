import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import {
  useBorrowBookMutation,
  useGetSingleBookQuery,
} from '../redux/features/books/book.api';
import type { IBorrowForm } from '../types/borrow.interface';
import Swal from 'sweetalert2';

const AddBorrow = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetSingleBookQuery(bookId!);
  const [createBorrow] = useBorrowBookMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IBorrowForm>({
    defaultValues: {
      bookId: bookId,
      quantity: 1,
      dueDate: new Date().toISOString().split('T')[0],
    },
  });

  const onSubmit = async (formData: IBorrowForm) => {
    console.log('Borrow Submitted:', formData);
    const { error, data } = await createBorrow(formData);
    if (error) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Opps ',
        text: 'Failed Borrow Book!',
        showConfirmButton: false,
        timer: 1500,
      });
    } else if (data) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'WOW',
        text: 'Borrow Book Successfully!',
        showConfirmButton: false,
        timer: 1500,
      });
      navigate('/borrow-summary');
    }
  };

  if (isLoading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (isError || !data?.data) {
    return (
      <p className="text-center mt-10 text-red-500">
        Book data not found or something went wrong!
      </p>
    );
  }

  const book = data.data;
  if (!book) {
    return <p>No Book Available</p>;
  }

  return (
    <div className="w-10/12 mx-auto mt-10 h-screen">
      <div className="p-6 border-[1px] border-purple-950 rounded bg-purple-900 dark:bg-[#14111f] text-white">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Borrow the Book
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col">
            <label>Book ID</label>
            <input
              type="text"
              className="px-3 py-2 rounded  border-purple-400 dark:border-purple-700 bg-gray-100 dark:bg-[#1f1b2e] text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900"
              disabled
              {...register('bookId')}
            />
          </div>

          <div className="flex flex-col">
            <label>Quantity</label>
            <input
              type="number"
              className="px-3 py-2 rounded border-purple-400 dark:border-purple-700 bg-gray-100 dark:bg-[#1f1b2e] text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900"
              {...register('quantity', { required: true, min: 1 })}
            />
            {errors.quantity && (
              <span className="text-red-500">Minimum 1 quantity required</span>
            )}
          </div>

          <div className="flex flex-col">
            <label>Due Date</label>
            <input
              type="date"
              className="px-3 py-2 rounded border-purple-400 dark:border-purple-700 bg-gray-100 dark:bg-[#1f1b2e] text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900"
              {...register('dueDate', { required: true })}
            />
            {errors.dueDate && (
              <span className="text-red-500">Due date is required</span>
            )}
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded"
            >
              Borrow
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              &lt;-Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBorrow;
