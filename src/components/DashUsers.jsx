import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaCheck, FaTimes } from "react-icons/fa";

const DashUsers = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchAllUser = async () => {
      const res = await fetch("/api/user/getUser");
      const data = await res.json();
      console.log(data.users);
      if (res.ok) {
        setUsers(data.users);
      }
    };
    fetchAllUser();
  }, [currentUser._id]);

  const handleDelete = async (userId) => {
    try {
      const res = await fetch(`/api/user/delete/${userId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUsers((prev) => prev.filter((user) => user._id !== userId));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      {currentUser.isAdmin && users.length > 0 ? (
        <>
          <table className="w-[1250px] mt-4 mb-4 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 text-lg">
                  user Created
                </th>
                <th scope="col" className="px-6 py-3 text-lg">
                  user Image
                </th>
                <th scope="col" className="px-6 py-3 text-lg">
                  userName
                </th>
                <th scope="col" className="px-6 py-3 text-lg">
                  userEmail
                </th>
                <th scope="col" className="px-6 py-3 text-lg">
                  Admin
                </th>
                <th scope="col" className="px-6 py-3 text-lg">
                  Delete
                </th>
              </tr>
            </thead>
            {users.map((user) => (
              <tbody
                key={user._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    {new Date(user.createdAt).toLocaleDateString()}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    <img
                      src={user.imageUrl}
                      alt="image"
                      className="w-[50px] h-[50px] rounded-full"
                    />
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    {user.userName}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    {user.email}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    <span>
                      {user.isAdmin ? (
                        <FaCheck className="text-green-500" />
                      ) : (
                        <FaTimes className="text-red-500" />
                      )}
                    </span>
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-red-400 whitespace-nowrap cursor-pointer"
                    onClick={() => handleDelete(user._id)}
                  >
                    delete
                  </th>
                </tr>
              </tbody>
            ))}
          </table>
        </>
      ) : (
        <p>No Post Yet</p>
      )}
    </div>
  );
};

export default DashUsers;
