import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const DashPost = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [userpost, setUserPost] = useState([]);
  const [showMore, setShowMore] = useState(false);
  console.log(userpost);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserPost(data.posts);
        }
        if (data.posts.length  < 9) {
          setShowMore(true);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchPost();
    }
  }, [currentUser._id, currentUser.isAdmin]);
  return (
    <div>
      {currentUser.isAdmin && userpost.length > 0 ? (
        <>
          <table className="w-[1250px] mt-4 mb-4 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 text-lg">
                  updateAt
                </th>
                <th scope="col" className="px-6 py-3 text-lg">
                  Post Image
                </th>
                <th scope="col" className="px-6 py-3 text-lg">
                  Post Title
                </th>
                <th scope="col" className="px-6 py-3 text-lg">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-lg">
                  Delete
                </th>
                <th scope="col" className="px-6 py-3 text-lg">
                  Edit
                </th>
              </tr>
            </thead>
            {userpost.map((item, index) => (
              <tbody key={index}>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {new Date(item.updatedAt).toLocaleDateString()}
                  </th>
                  <td className="px-6 py-4">
                    <Link to={`/post/${item.slug}`}>
                      <img
                        src={item.image}
                        alt=""
                        className="w-[100px] h-[100px] rounded-full"
                      />
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <Link to={`/post/${item.slug}`}>{item.title}</Link>
                  </td>
                  <td className="px-6 py-4">{item.category}</td>
                  <td className="px-6 py-4">
                    <span className="text-red-400 font-semibold">Delete</span>
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      to={`/update-post/${item._id}`}
                      className="text-teal-400 text-md font-semibold"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </>
      ) : (
        <p>No Post Yet</p>
      )}
      {showMore && <button className="w-full self-center  py-7 text-teal-500 text-xl font-semibold mt-4">Show More</button>}
    </div>
  );
};

export default DashPost;
