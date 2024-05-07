import { useSelector } from "react-redux";

// eslint-disable-next-line react/prop-types
const ThemeProvider = ({ children }) => {
  const { theme } = useSelector((state) => state.theme);
  return (
    <div className={theme}>
      <div>
        {children}
      </div>
    </div>
  );
};

export default ThemeProvider;
