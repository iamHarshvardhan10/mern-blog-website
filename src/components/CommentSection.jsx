import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
const CommentSection = ({ postId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      return;
    }
    const res = await fetch("/api/comment/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: comment,
        postId,
        userId: currentUser._id,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      setCommentError(data.message);
    }
    if (res.ok) {
      setCommentError(false);
      setComment("");
    }
  };
  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      {currentUser ? (
        <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
          <p>Signed in as:</p>
          <img
            className="h-5 w-5 object-cover rounded-full"
            src={currentUser.imageUrl}
            alt=""
          />
          <Link
            to={"/dashboard?tab=profile"}
            className="text-xs text-cyan-600 hover:underline"
          >
            @{currentUser.userName}
          </Link>
        </div>
      ) : (
        <div className="text-sm text-teal-500 my-5 flex gap-1">
          You must be signed in to comment.
          <Link className="text-blue-500 hover:underline" to={"/sign-in"}>
            Sign In
          </Link>
        </div>
      )}
      {currentUser && (
        <form
          onSubmit={handleSubmit}
          className="border border-teal-500 rounded-md p-3"
        >
          <textarea
            placeholder="Add a comment..."
            rows="3"
            className="w-full"
            maxLength="200"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <div className="flex justify-center border border-black p-2 rounded-md items-center mt-5">
            <button type="submit">Submit</button>
          </div>
        </form>
      )}
      {commentError && <span className="text-red-400 mt-10 ">{commentError}</span>}
    </div>
  );
};

export default CommentSection;
