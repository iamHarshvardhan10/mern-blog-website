import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import SignUp from "./pages/SignUp";
import SingIn from "./pages/SingIn";
import Header from "./components/Header";
import PrivatePage from "./components/PrivatePage";
import Footer from "./components/Footer";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route element={<PrivatePage />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        <Route path="projects" element={<Projects />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="sign-in" element={<SingIn />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
};

export default App;
