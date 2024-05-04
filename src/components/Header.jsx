import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";

const Header = () => {
  const [toggle, setToggle] = useState(false);
  console.log(toggle);

  const handleToggle = () => {
    setToggle(!toggle);
  };
  return (
    <nav className="p-4  flex justify-around items-center border-b-2">
      <div className="flex self-center">
        <span className="text-md bg-gradient-to-r from-purple-500 to-pink-500 pl-[5px] pr-[5px] text-[22px] rounded-md text-white">
          Harsh
        </span>
        <span className="text-md p-1 text-[20px] font-semibold">Blog</span>
      </div>
      <form className="flex items-center border border-black pt-[5px] pb-[5px] pl-[10px] pr-[10px] rounded-md">
        <input
          type="text"
          placeholder="Search..."
          className="outline-none w-[250px] text-black-700"
        />
        <span>
          <FaSearch />
        </span>
      </form>

      <ul className="flex gap-4 text-md">
        <li>Home</li>
        <li>About</li>
        <li>Projects</li>
      </ul>

      <div className="flex items-center gap-[2rem]">
        <button
          className="border p-2 rounded-full border-black"
          onClick={handleToggle}
        >
          {toggle ? (
            <MdLightMode className="text-xl" />
          ) : (
            <MdDarkMode className="text-xl" />
          )}
        </button>
        <button className="pt-[5px] pb-[5px] pl-[15px] pr-[15px] rounded-md border-2 border-gray-500">
          SignIn
        </button>
      </div>
    </nav>
  );
};

export default Header;
