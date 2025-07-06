import { FaFacebookF, FaLinkedinIn, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white/5 text-white py-6 mt-8">
      <div className="w-10/12 mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="text-md mb-4 md:mb-0">
          © 2025 Ababil Library 💖 All rights reserved.
        </p>
        <div className="flex space-x-4 text-xl">
          <a
            href="https://www.facebook.com/neelarani.1"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://www.linkedin.com/in/neelarani"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="https://github.com/neelarani"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition"
          >
            <FaGithub />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
