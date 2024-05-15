import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const OnlyAdminPrivatePage = () => {
  const { currentUser } = useSelector((state) => state.user);
  // console.log(currentUser);
  return currentUser && currentUser.isAdmin ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default OnlyAdminPrivatePage;
