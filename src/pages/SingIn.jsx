import { useState } from "react";
import signInImg from "../assests/image01.png";
import { Link } from "react-router-dom";
import Loading from "../pages/Loading";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  signStart,
  signSuccess,
  signFailure,
} from "../redux/userSlice/userSlice";
import Oauth from "../components/Oauth";

const SingIn = () => {
  const [formData, setFormData] = useState({});
  // const [errorMessage, setErrorMessage] = useState(null);
  // const [loading, setLoading] = useState(false);
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signFailure("All Fields are Required"));
    }
    try {
      dispatch(signStart());
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);
      if (data.success == false) {
        dispatch(signFailure(data.message));
      }
      // dispatch(signStart());
      if (response.ok) {
        dispatch(signSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signFailure(error.message));
    }
  };

  return (
    <div className="flex flex-wrap items-center">
      <div>
        <img src={signInImg} alt="" className="w-[950px] h-[90vh]" />
      </div>
      <div className="w-[450px] border-4 border-gray-400 p-8 rounded-3xl">
        <h1 className="text-2xl uppercase mb-4 font-semibold text-center">Login To Your Account</h1>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label htmlFor="email" className="mb-2 font-serif text-xl text-gray-500 ">Email</label>
          <input
            type="email"
            id="email"
            placeholder="username@gmail.com"
            className="mb-2 p-2 rounded-md border-2 border-gray-400"
            onChange={handleChange}
          />
          <label htmlFor="password" className="mb-2 font-serif text-xl text-gray-500 ">Password</label>
          <input
            type="password"
            id="password"
            placeholder="*******"
            className="mb-2 p-2 rounded-md border-2 border-gray-400"
            onChange={handleChange}
          />
          <button
            className="mt-[10px] mb-2 p-2 border border-black rounded-md uppercase font-emibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
            disabled={loading}
          >
            {loading ? <Loading /> : "SignIn"}
          </button>
          <Oauth />
        </form>
        <div className="flex gap-2 justify-center mt-2">
          <span className="text-md font-semibold capitalize">Create an Account ?</span>
          <Link to="/sign-up"  className="text-blue-700 font-semibold uppercase">
            <span>Sign Up</span>
          </Link>
        </div>
      </div>
      {errorMessage && errorMessage ? <p>{errorMessage}</p> : null}
    </div>
  );
};

export default SingIn;
