const Header = () => {
  return (
    <div>
      <div>
        <span>Harsh Blog</span>
      </div>
      <form>
        <input type="text" placeholder="Search..." />
      </form>
      <div>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Projects</li>
        </ul>
      </div>
      <div>
        <button>Lights</button>
        <button>Sign in</button>
      </div>
    </div>
  );
};

export default Header;
