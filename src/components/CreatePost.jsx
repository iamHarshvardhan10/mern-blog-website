import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'

const CreatePost = () => {
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a Post</h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <input
            type="text"
            placeholder="Title"
            required
            id="title"
            className="border flex-1"
          />
          <select id="" className="border">
            <option value="uncategorized">Select a category</option>
            <option value="javascript">JavaScript</option>
            <option value="ReactJs">Reactjs</option>
            <option value="NextJs">NextJs</option>
          </select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <input type="file" accept="image/*" />
          <button type="button" className="border">Upload Image</button>
        </div>
        <ReactQuill theme="snow" className="h-72 mb-12" required/>
        <button type="submit" className="gradient-to-r bg-slate-300 p-2 rounded-md text-xl font-semibold">Publish</button>
      </form>
    </div>
  );
};

export default CreatePost;
