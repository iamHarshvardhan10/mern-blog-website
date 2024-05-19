import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../pages/Loading";
import CallToAction from "./CallToAction";

const PostPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [post, setPost] = useState([]);
  const { postSlug } = useParams();

  useEffect(() => {
    try {
      const fetchPost = async () => {
        setLoading(true);
        setError(false);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPost(data.posts[0]);
          setError(false);
          setLoading(false);
        }
      };
      fetchPost();
    } catch (error) {
      setError(false);
      setLoading(false);
    }
  }, [postSlug]);
  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading />
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen font-red-500">
        {error && <h1>Something Went Wrong</h1>}
      </div>
    );
  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
        {post && post.title}
      </h1>
      <Link
        to={`/search?category=${post && post.category}`}
        className="self-center mt-5"
      >
        <button className="bg-green-400 text-md  font-semibold rounded-full w-[120px]  uppercase self-center">
          {post && post.category}
        </button>
      </Link>
      <img
        src={post && post.image}
        alt={post && post.title}
        className="mt-10 p-3 max-h-[600px] w-full object-cover"
      />
      <div className="flex justify-between p-3 border-b border-slate-500">
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span>{post ? (post.content / 100).toFixed(0) : 0} mins read</span>
      </div>
      <div
        className="p-3 max-w-3xl mx-auto w-full post_content"
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      ></div>
      <div className="max-w-4xl mx-auto w-full">
        <CallToAction />
      </div>
    </main>
  );
};

export default PostPage;
