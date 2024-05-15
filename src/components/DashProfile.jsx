import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { app } from "../firebase";
import {
  updateStart,
  updateFailure,
  updateSuccess,
  deleteStart,
  deleteFailure,
  deleteSuccess,
  signOutSuccess,
} from "../redux/userSlice/userSlice";
import { Link } from "react-router-dom";

const DashProfile = () => {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(false);
  const [showModal, setShowModel] = useState(false);
  const filePicker = useRef();
  const dispatch = useDispatch();

  // console.log(imageFileUploadProgress, imageFileUploadError);
  const handleFileImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = () => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const proress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(proress.toFixed(0));
      },

      (error) => {
        setImageFileUploadError(`Image Should be less than than 2Mb ${error} `);
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setImageFileUrl(downloadUrl);
          setFormData({ ...formData, imageUrl: downloadUrl });
          setImageFileUploading(false);
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      return;
    }
    if (imageFileUploading) {
      setUpdateUserError("Please Wait For Image to Upload");
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User Profile Uploaded Successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };

  const handleDeleteUser = async () => {
    setShowModel(false);
    try {
      dispatch(deleteStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteFailure(data.message));
      } else {
        dispatch(deleteSuccess(data));
      }
    } catch (error) {
      dispatch(deleteFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/user/signOut", {
        method: "POST",
      });
      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess(data.message));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col  mx-auto p-3">
      <h1 className="my-7 text-center font-semibold text-3xl uppercase">
        Profile
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileImage}
          ref={filePicker}
          hidden
        />
        <div
          className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full mb-4"
          onClick={() => filePicker.current.click()}
        >
          <img
            src={imageFileUrl || currentUser.imageUrl}
            alt="User Profile"
            className="w-full h-full border-4 rounded-full"
          />
        </div>
        {imageFileUploadProgress && (
          <div className="text-green-600 text-xl self-center">{`Image Uploading ${imageFileUploadProgress}%`}</div>
        )}
        <input
          type="text"
          id="userName"
          placeholder="userName"
          className="p-2  w-[500px] rounded-md border-2 border-gray-500 font-bold"
          defaultValue={currentUser.userName}
          onChange={handleChange}
        />
        <input
          type="email"
          id="email"
          placeholder="email"
          className="p-2  w-[500px] rounded-md border-2 border-gray-500 font-bold"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="password"
          className="p-2  w-[500px] rounded-md border-2 border-gray-500 font-bold"
          onChange={handleChange}
        />
        <button
          className="border-2 border-gray-500 p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-xl font-semibold uppercase"
          disabled={loading || imageFileUploading}
        >
          {loading ? "Loading..." : "Upload"}
        </button>
        {currentUser.isAdmin && (
          <Link to={"/create-post"} className="text-center">
            <button
              type="button"
              className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-xl font-semibold "
            >
              Create Post
            </button>
          </Link>
        )}
      </form>
      <div className="text-red-500 flex justify-between gap-2 mt-5">
        <span
          onClick={handleDeleteUser}
          className="cursor-pointer text-md font-semibold uppercase border-black border p-2 rounded-md"
        >
          Delete Account
        </span>
        <span
          onClick={handleSignOut}
          className="cursor-pointer text-md font-semibold uppercase border-black border p-2 rounded-md"
        >
          Sign Out
        </span>
      </div>
      {imageFileUploadError && (
        <div className="text-red-500">{imageFileUploadError}</div>
      )}
      {updateUserSuccess && (
        <div className="text-green-500 mt-5">{updateUserSuccess}</div>
      )}
      {updateUserError && (
        <div className="text-red-500 mt-5">{updateUserError}</div>
      )}
      {showModal && <div className="text-red-500 mt-5">{showModal}</div>}
      {error && <div className="text-red-600">{error}</div>}
    </div>
  );
};

export default DashProfile;
