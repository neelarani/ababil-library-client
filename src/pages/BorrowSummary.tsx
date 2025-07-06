import { useGetBorrowSummaryQuery } from '../redux/features/books/book.api';

const BorrowSummary = () => {
  const { data, isLoading, isError } = useGetBorrowSummaryQuery({});

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong!</p>;

  return (
    <div className="bg-gradient-to-br from-[#1e0e4b] via-[#0f0f1a] to-slate-950 h-screen">
      <div className="p-6 w-10/12 mx-auto ">
        <h2 className="text-xl font-bold mb-4 text-purple-50">
          Borrowed Books Summary
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.data?.map((item, index) => (
            <li
              key={index}
              className="border border-purple-700/30 rounded-2xl p-5 shadow-md hover:shadow-xl transition duration-300 backdrop-blur-sm bg-white/5"
            >
              <p className="text-purple-200">
                <span className="font-semibold ">Title:</span> {item.book.title}
              </p>
              <p className="text-purple-200">
                <span className="font-semibold ">ISBN:</span> {item.book.isbn}
              </p>
              <p className="text-purple-200">
                <span className="font-semibold ">Total Quantity: </span>
                {item.totalQuantity}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BorrowSummary;
