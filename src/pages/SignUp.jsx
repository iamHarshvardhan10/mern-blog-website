import { useState } from "react";
import { Link } from "react-router-dom";
import Loading from '../pages/Loading'
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
    <div>
      <div></div>

      <form onSubmit={handleSubmit} className="flex flex-col">
        <label htmlFor="userName">Name</label>
        <input
          type="text"
          id="userName"
          placeholder="username"
          className="border-2 border-black"
          onChange={handleChange}
        />
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
        <button className="mt-[20px] p-2 uppercase border-2 bg-slate-300" disabled={loading}>
          {loading ? (<Loading/>)  : 'Sign Up'}
        </button>
        <Oauth/>
      </form>
      <div>
        <span>Have an Account ?</span>
        <Link to="/sign-in">
          <span>SignIn</span>
        </Link>
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
