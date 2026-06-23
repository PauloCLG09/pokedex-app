import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

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
    queryFn: () => getPostById(id!),
  });

  if (isLoading) return <p className="p-6 text-center">Loading post...</p>;

  if (isError)
    return <p className="p-6 text-center text-red-500">Error loading post</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6">
        <Link to="/posts" className="text-blue-500">
          ← Back to posts
        </Link>

        <h1 className="text-3xl font-bold mt-6 mb-4">{data?.title}</h1>

        <p className="text-gray-700">{data?.body}</p>
      </div>
    </div>
  );
}

export default PostDetail;
