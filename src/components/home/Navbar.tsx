import { NavLink, Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="bg-slate-900 text-purple-100">
      <div className="flex justify-between mx-auto w-10/12 py-7">
        <Link to={'/'} className="text-xl font-bold ">
          Ababil Library
        </Link>
        <div className="space-x-6 font-medium">
          <NavLink to={'/books'} className="py-1 px-2 rounded-lg">
            All Books
          </NavLink>
          <NavLink to={'/create-book'} className="py-1 px-2 rounded-lg">
            Add Book
          </NavLink>
          <NavLink to={'/borrow-summary'} className="py-1 px-2 rounded-lg">
            Borrow Summary
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
