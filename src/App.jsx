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
import OnlyAdminPrivatePage from "./components/OnlyAdminPrivatePage";
import CreatePost from "./components/CreatePost";
import UpdatePost from "./components/UpdatePost";
import PostPage from "./components/PostPage";
import ScrollToTop from "./components/ScrollToTop";
import Search from "./pages/Search";

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search />} />
        <Route element={<PrivatePage />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<OnlyAdminPrivatePage />}>
          <Route path="create-post" element={<CreatePost />} />
          <Route path="update-post/:postId" element={<UpdatePost />} />
        </Route>
        <Route path="projects" element={<Projects />} />
        <Route path="post/:postSlug" element={<PostPage />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="sign-in" element={<SingIn />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
