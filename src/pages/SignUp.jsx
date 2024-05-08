import { useState } from "react";

// Images Link
import signInImg from "../assests/image02.png";

import { Link } from "react-router-dom";
import Loading from "../pages/Loading";
import Oauth from "../components/Oauth";

const SingUp = () => {
  const [formData, setFormData] = useState({});
  const [erroMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.userName || !formData.email || !formData.password) {
      return setErrorMessage("All Fields Are Required");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);
      if (data.success == false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-wrap items-center">
      <div>
        <img src={signInImg} alt="" className="w-[950px] h-[90vh]" />
      </div>
      <div className="w-[450px] border-4 border-gray-400 p-8 rounded-3xl">
        <h1 className="text-2xl uppercase mb-4 font-semibold">
          Create an Account{" "}
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label
            htmlFor="userName"
            className="mb-2 font-serif text-xl text-gray-500 "
          >
            Name
          </label>
          <input
            type="text"
            id="userName"
            placeholder="username"
            className="mb-2 p-2 rounded-md border-2 border-gray-400"
            onChange={handleChange}
          />
          <label
            htmlFor="email"
            className="mb-2 font-serif text-xl text-gray-500 "
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="username@gmail.com"
            className="mb-2 p-2 rounded-md border-2 border-gray-400"
            onChange={handleChange}
          />
          <label
            htmlFor="password"
            className="mb-2 font-serif text-xl text-gray-500 "
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="*******"
            className="mb-2 p-2 rounded-md border-2 border-gray-400"
            onChange={handleChange}
          />
          <button
            className="mt-[10px] mb-2 p-2 border border-black rounded-md uppercase font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
            disabled={loading}
          >
            {loading ? <Loading /> : "Sign Up"}
          </button>
          <Oauth />
        </form>
        <div className="flex gap-2">
          <span className="text-md font-semibold capitalize">Have an Account ?</span>
          <Link to="/sign-in" className="text-blue-700 font-semibold uppercase">
            <span>Sign In</span>
          </Link>
        </div>
      </div>
      {erroMessage && erroMessage ? (
        <span className="p-2 rounded-md text-xl bg-red-500 text-red-800">
          {erroMessage}
        </span>
      ) : null}
    </div>
  );
};

export default SingUp;
