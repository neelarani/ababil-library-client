import { Outlet, useLocation } from 'react-router';
import Navbar from '../components/home/Navbar';
import Footer from '../components/Footer';

const Home = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  return (
    <div className="bg-gradient-to-br from-[#1e0e4b] via-[#0f0f1a] to-slate-950">
      <Navbar></Navbar>

      <Outlet></Outlet>
      {isHomePage && <Footer></Footer>}
    </div>
  );
};

export default Home;
