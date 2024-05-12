import { useSelector } from "react-redux"


const DashProfile = () => {
  const {currentUser} = useSelector(state => state.user)
  return (
    <div className="flex flex-col  mx-auto p-3">
      <h1 className="my-7 text-center font-semibold text-3xl uppercase">Profile</h1>
      <form className="flex flex-col gap-2">
        <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full mb-4">

        <img src={currentUser.imageUrl} alt="User Profile" className="w-full h-full border-4 rounded-full"/>
        </div>
        <input type="text" id="userName" placeholder="userName" className="p-2  w-[500px] rounded-md border-2 border-gray-500 font-bold" value={currentUser.userName}/>
        <input type="email" id="email" placeholder="email" className="p-2  w-[500px] rounded-md border-2 border-gray-500 font-bold" value={currentUser.email}/>
        <input type="password" id="password" placeholder="password" className="p-2  w-[500px] rounded-md border-2 border-gray-500 font-bold" value={currentUser.password}/>
        <button className="border-2 border-gray-500 p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-xl font-semibold uppercase">Update</button>
      </form>
      <div className="text-red-500 flex justify-between gap-2 mt-5">
        <span className="cursor-pointer text-md font-semibold uppercase border-black border p-2 rounded-md">Delete Account</span>
        <span className="cursor-pointer text-md font-semibold uppercase border-black border p-2 rounded-md">Sign Out</span>
      </div>
    </div>
  )
}

export default DashProfile