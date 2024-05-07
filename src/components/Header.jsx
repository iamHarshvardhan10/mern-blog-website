import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [toggle, setToggle] = useState(false);
  const [isdropMenu, setIsDropMenu] = useState(false);
  // console.log(toggle);

  const handleToggle = () => {
    setToggle(!toggle);
  };
  const handleDropClick = () => {
    setIsDropMenu(!isdropMenu);
  };
  return (
    <nav className="p-4  flex justify-around items-center border-b-2">
      <div className="flex self-center">
        <Link to="/">
          <span className="text-md bg-gradient-to-r from-purple-500 to-pink-500 pl-[5px] pr-[5px] text-[22px] rounded-md text-white">
            Harsh
          </span>
          <span className="text-md p-1 text-[20px] font-semibold">Blog</span>
        </Link>
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
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/about">
          <li>About</li>
        </Link>
        <Link to="/projects">
          <li>Projects</li>
        </Link>
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
        {currentUser && currentUser ? (
          <div>
            <img
              src={currentUser.imageUrl}
              alt=""
              className="w-[40px] h-[40px] rounded-full"
              onClick={handleDropClick}
            />
            {isdropMenu ? (
              <div>
                <p>{currentUser?.userName}</p>
                <p>{currentUser?.email}</p>
                <Link to="/dashboard?tab=profile">Profile</Link>
                <Link to="/">Logout</Link>
              </div>
            ) : null}
          </div>
        ) : (
          <Link
            to="/sign-up"
            className="pt-[5px] pb-[5px] pl-[15px] pr-[15px] rounded-md border-2 border-gray-500"
          >
            SignIn
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
