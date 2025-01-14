import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivatePage = () => {
  const { currentUser } = useSelector((state) => state.user);
  // console.log(currentUser);
  return currentUser ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivatePage;
