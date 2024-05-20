import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaThumbsUp } from "react-icons/fa";

const DashComments = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comment/getcomments`);
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchComments();
    }
  }, [currentUser._id]);

  const handleDelete = async (commentId) => {
    try {
      const res = await fetch(`/api/comment/deletecomment/${commentId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setComments((prev) =>
          prev.filter((comment) => comment._id !== commentId)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      {currentUser.isAdmin && comments.length > 0 ? (
        <>
          <table className="w-[1250px] mt-4 mb-4 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 text-lg">
                  comment Created
                </th>
                <th scope="col" className="px-6 py-3 text-lg">
                  comments
                </th>
                <th scope="col" className="px-6 py-3 text-lg">
                  no. likes
                </th>
                <th scope="col" className="px-6 py-3 text-lg">
                  userId
                </th>
                <th scope="col" className="px-6 py-3 text-lg">
                  delete
                </th>
              </tr>
            </thead>
            {comments.map((comment) => (
              <tbody
                key={comment._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    {new Date(comment.updatedAt).toLocaleDateString()}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    {comment.content}
                  </th>
                  <th
                    scope="row"
                    className="flex  gap-2 item-center px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    <FaThumbsUp /> {comment.numberOfLikes}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    {comment.userId}
                  </th>

                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-red-400 whitespace-nowrap cursor-pointer"
                    onClick={() => handleDelete(comment._id)}
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

export default DashComments;
