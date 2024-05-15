import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOutSuccess } from "../redux/userSlice/userSlice";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch()
  const [toggle, setToggle] = useState(false);
  const [isdropMenu, setIsDropMenu] = useState(false);
  // console.log(toggle);

  const handleToggle = () => {
    setToggle(!toggle);
  };
  const handleDropClick = () => {
    setIsDropMenu(!isdropMenu);
  };

  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/user/signOut", {
        method: "POST",
      });
      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess(data.message));
      }
    } catch (error) {
      console.log(error);
    }
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

      <div className="flex items-center gap-[2rem] relative">
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
              className="w-[40px] h-[40px] rounded-full cursor-pointer"
              onClick={handleDropClick}
            />
            {isdropMenu ? (
              <div className="flex flex-col absolute top-[50px] right-0  bg-[#010A43] rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-80 border-4 border-gray-400">
                <p className="text-md border-b-2 border-white  text-white  p-4 font-bold cursor-pointer hover:bg-[#010A43]">
                  {currentUser?.userName}
                </p>
                <p className="text-md  border-b-2 border-white  text-white  p-4  font-bold cursor-pointer  hover:bg-[#010A43]">
                  {currentUser?.email}
                </p>
                <Link
                  to="/dashboard?tab=profile"
                  className="flex items-center gap-4 text-md font-bold border-b-2 border-white  text-white  p-4 hover:bg-[#010A43]"
                >
                  Profile <FaRegUserCircle className="text-2xl" />
                </Link>
                <Link
                  to="/"
                  className="flex items-center gap-4 text-md font-bold  text-white  p-4 hover:bg-[#010A43]"
                  onClick={handleSignOut}
                >
                  Logout <IoIosLogOut className="text-2xl" />
                </Link>
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
