import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSideBar from "../components/DashSideBar";
import DashProfile from "../components/DashProfile";
import DashPost from "../components/DashPost";
const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
    console.log(tabFromUrl);
  }, [location.search]);
  return (
    <div className="min-h-screen flex flex-col  md:flex-row bg-gray-300">
      <div>
        <DashSideBar />
      </div>
      <div className="w-full flex justify-center">
        {tab == "profile" && <DashProfile />}
        {tab == "posts" && <DashPost />}
      </div>
    </div>
  );
};

export default Dashboard;
