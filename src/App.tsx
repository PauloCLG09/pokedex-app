import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import PokemonDetail from "./pages/PokemonDetail";
import CreatePost from "./features/posts/pages/CreatePost";
import Posts from "./features/posts/pages/Posts";
import PostDetail from "./features/posts/pages/PostDetail";
import EditPost from "./features/posts/pages/EditPost";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:name" element={<PokemonDetail />} />

        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/create" element={<CreatePost />} />
        <Route path="/posts/edit/:id" element={<EditPost />} />
        <Route path="/posts/:id" element={<PostDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
