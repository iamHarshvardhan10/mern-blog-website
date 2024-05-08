import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-[#1f2937] h-[40vh] ring-8 ring-purple-600 ring-offset-0 ring-offset-slate-500 rounded-t-[15px]">
      <div className="max-w-[1200px] mx-auto p-8">
        <div className="flex justify-between items-center mt-8">
          <div>
            <span className="bg-gradient-to-r from-purple-600 to-pink-700 pl-[15px] pr-[15px] pt-[5px] pb-[5px] text-[24px] rounded-md text-white">
              Harsh
            </span>
            <span className="text-2xl text-white font-semibold">Blog</span>
          </div>
          <div>
            <p className="text-xl text-white font-bold ">Links</p>
            <ul className="flex gap-4">
              <Link to='/'>
              <li className="text-gray-300 text-md font-medium mt-2">Home</li>
              </Link>
              <Link to='/about'>
              <li className="text-gray-300 text-md font-medium mt-2">About</li>
              </Link>
              <Link to='/projects'>
              <li className="text-gray-300 text-md font-medium mt-2">Projects</li>
              </Link>
            </ul>
          </div>
          <div>
            <p className="text-xl text-white font-bold ">Follows Us</p>
            <ul className="flex gap-4">
              <li className="text-gray-300 text-md font-medium mt-2">Instagram</li>
              <li className="text-gray-300 text-md font-medium mt-2">Github</li>
              <li className="text-gray-300 text-md font-medium mt-2">LinkendIn</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-wrap  justify-between mt-8  text-gray-500 border-t p-4">
          <div>
            <p className="text-md">© 2024 Harsh blog</p>
          </div>
          <div className="flex items-center gap-8">
            <span>
              <FaInstagram className="text-2xl text-gray-500"/>
            </span>
            <span>
              <FaGithub className="text-2xl text-gray-500"/>
            </span>
            <span>
              <FaLinkedin className="text-2xl text-gray-500"/>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
