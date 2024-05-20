import { Link } from "react-router-dom";
import { signOutSuccess } from "../redux/userSlice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
const DashSideBar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  console.log(tab);

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
        <Link to="/dashboard?tab=profile">
          <li className="p-4  rounded-sm mb-4 bg-black text-white">Profile</li>
        </Link>
        {currentUser.isAdmin && (
          <Link to="/dashboard?tab=posts">
            <li className="p-4  rounded-sm mb-4 bg-black text-white">Posts</li>
          </Link>
        )}
        {currentUser.isAdmin && (
          <Link to="/dashboard?tab=users">
            <li className="p-4  rounded-sm mb-4 bg-black text-white">Users</li>
          </Link>
        )}
        {currentUser.isAdmin && (
          <Link to="/dashboard?tab=comments">
            <li className="p-4  rounded-sm mb-4 bg-black text-white">Comments</li>
          </Link>
        )}

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
