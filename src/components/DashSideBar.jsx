import { Link } from "react-router-dom";
import { signOutSuccess } from "../redux/userSlice/userSlice";
import { useDispatch } from "react-redux";
const DashSideBar = () => {
  const dispatch = useDispatch();
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
    <div className="w-full min-h-screen md:w-56  bg-blue-400 border-2">
      <ul className="p-4 text-center">
        <Link to="/profile">
          <li className="p-4  rounded-sm mb-4 bg-black text-white">Profile</li>
        </Link>

        <li
          className="p-4  rounded-sm mb-4 bg-black text-white"
          onClick={handleSignOut}
        >
          SignOut
        </li>
      </ul>
    </div>
  );
};

export default DashSideBar;
