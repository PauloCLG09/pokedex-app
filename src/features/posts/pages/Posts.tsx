import { Link } from "react-router-dom";

import { usePosts, useDeletePost } from "../hooks/usePosts";

function Posts() {
  const { data, isLoading, isError } = usePosts();

  const deleteMutation = useDeletePost();

  if (isLoading) {
    return <p className="p-6 text-center text-xl">Loading posts...</p>;
  }

  if (isError) {
    return <p className="p-6 text-center text-red-500">Error loading posts</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 via-yellow-300 to-blue-600 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold">Posts</h1>

          <Link
            to="/posts/create"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Create Post
          </Link>
        </div>

        <div className="grid gap-4">
          {data?.slice(0, 10).map((post) => (
            <div
              key={post.id}
              className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:shadow-2xl transition hover:-translate-y-1"
            >
              <h2 className="text-xl font-bold mb-3 text-gray-800">
                {post.title}
              </h2>

              <p className="text-gray-600 mb-5 line-clamp-2">{post.body}</p>

              <div className="flex flex-wrap gap-3">
                <Link
                  to={`/posts/${post.id}`}
                  className="px-3 py-2 rounded-lg bg-blue-100 text-blue-600 font-medium hover:bg-blue-200 transition"
                >
                  View
                </Link>

                <Link
                  to={`/posts/edit/${post.id}`}
                  className="px-3 py-2 rounded-lg bg-green-100 text-green-600 font-medium hover:bg-green-200 transition"
                >
                  Edit
                </Link>

                <button
                  onClick={() => deleteMutation.mutate(post.id)}
                  className="px-3 py-2 rounded-lg bg-red-100 text-red-600 font-medium hover:bg-red-200 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Posts;
