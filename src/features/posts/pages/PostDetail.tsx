import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import CommentForm from "../components/CommentForm";
import { getPostById } from "../services/post.service";

interface Post {
  id: number;
  title: string;
  body: string;
}

function PostDetail() {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery<Post>({
    queryKey: ["post", id],
    queryFn: async () => {
      const storedPosts = JSON.parse(
        localStorage.getItem("customPosts") || "[]",
      );

      const localPost = storedPosts.find(
        (post: Post) => post.id === Number(id),
      );

      if (localPost) {
        return localPost;
      }

      return getPostById(id!);
    },
  });

  if (isLoading) return <p className="p-6 text-center">Loading post...</p>;

  if (isError)
    return <p className="p-6 text-center text-red-500">Error loading post</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 via-yellow-300 to-blue-600 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6">
        <Link
          to="/posts"
          className="text-blue-500 font-medium hover:text-blue-700"
        >
          ← Back to posts
        </Link>

        <h1 className="text-4xl font-extrabold mt-6 mb-4 text-gray-800">
          {data?.title}
        </h1>

        <div className="max-w-3xl mx-auto bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/40">
          {data?.body}
        </div>
        <CommentForm postId={id!} />
      </div>
    </div>
  );
}

export default PostDetail;
