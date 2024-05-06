import { useState } from "react";
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
    <div>
      <div></div>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="username@gmail.com"
          className="border-2 border-black"
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="*******"
          className="border-2 border-black"
          onChange={handleChange}
        />
        <button
          className="mt-[20px] p-2 uppercase border-2 bg-slate-300"
          disabled={loading}
        >
          {loading ? <Loading /> : "SignIn"}
        </button>
        <Oauth/>
      </form>
      <div>
        <span>Create an Account ?</span>
        <Link to="/sign-up">
          <span>SignUp</span>
        </Link>
      </div>
      {errorMessage && errorMessage ? <p>{errorMessage}</p> : null}
    </div>
  );
};

export default SingIn;
