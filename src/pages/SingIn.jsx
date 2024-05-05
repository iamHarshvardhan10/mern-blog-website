import { useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../pages/Loading";

const SingIn = () => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return setErrorMessage("All Fields Required");
    }
    try {
      setErrorMessage(null);
      setLoading(true);
      const response = await fetch("/api/v1/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
