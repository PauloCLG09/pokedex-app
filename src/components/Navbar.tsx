import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <Link to="/" className="text-2xl font-extrabold text-red-500">
          Pokédex App
        </Link>

        <div className="flex gap-3 text-sm sm:text-base">
          <Link
            to="/"
            className="px-4 py-2 rounded-lg font-medium hover:bg-red-100 hover:text-red-500 transition"
          >
            Pokédex
          </Link>

          <Link
            to="/posts"
            className="px-4 py-2 rounded-lg font-medium hover:bg-blue-100 hover:text-blue-500 transition"
          >
            Posts
          </Link>

          <Link
            to="/posts/create"
            className="px-4 py-2 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition"
          >
            Create Post
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
