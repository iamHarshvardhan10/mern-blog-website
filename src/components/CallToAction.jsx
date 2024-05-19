const CallToAction = () => {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
      <div className="flex-1 justify-center flex flex-col">
        <h2 className="text-2xl">Want to learn more about JavaScript?</h2>
        <p className="text-gray-500 my-2">
          Checkout these resources with  JavaScript Tutorial
        </p>
        <button className="bg-red-500 p-2 uppercase text-md font-semibold mt-10 rounded-xl">
          <a
            href="https://www.github.com/iamHarshvardhan10"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get GitHub Profile
          </a>
        </button>
      </div>
      <div className="p-7 flex-1">
        <img src="https://bairesdev.mo.cloudinary.net/blog/2023/08/What-Is-JavaScript-Used-For.jpg" />
      </div>
    </div>
  );
};

export default CallToAction;
