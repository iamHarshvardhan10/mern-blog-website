import { Link } from "react-router-dom";
const DashSideBar = () => {
  return (
    <div className="w-full min-h-screen md:w-56  bg-blue-400 border-2">
      <ul className="p-4 text-center">
        <Link to="/profile">
          <li className="p-4  rounded-sm mb-4 bg-black text-white">Profile</li>
        </Link>

        <li className="p-4  rounded-sm mb-4 bg-black text-white">SignOut</li>
      </ul>
    </div>
  );
};

export default DashSideBar;
