import { useDispatch } from "react-redux";
import { signSuccess } from "../redux/userSlice/userSlice";
import { app } from "../firebase";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
const Oauth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const googleAuth = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultFromGoogle = await signInWithPopup(auth, provider);
      // console.log(resultFromGoogle)
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: resultFromGoogle.user.displayName,
          email: resultFromGoogle.user.email,
          photoUrl: resultFromGoogle.user.photoURL,
        }),
      });
      const data = await res.json();
      console.log(data)
      if (res.ok) {
        dispatch(signSuccess(data));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="" onClick={googleAuth}>
      Continue To Google
    </div>
  );
};

export default Oauth;
