import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { getPostById, updatePost } from "../services/post.service";
import { postSchema, type PostFormData } from "../schemas/postSchema";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const storedPosts = JSON.parse(
        localStorage.getItem("customPosts") || "[]",
      );

      const localPost = storedPosts.find(
        (post: { id: number }) => post.id === Number(id),
      );

      if (localPost) {
        return localPost;
      }

      return getPostById(id!);
    },
  });
  const mutation = useMutation({
    mutationFn: async (formData: PostFormData) => {
      const storedPosts = JSON.parse(
        localStorage.getItem("customPosts") || "[]",
      );

      const localPost = storedPosts.find(
        (post: { id: number }) => post.id === Number(id),
      );

      if (localPost) {
        return {
          id: Number(id),
          ...formData,
        };
      }

      return updatePost(id!, formData);
    },

    onSuccess: (_data, formData) => {
      const storedPosts = JSON.parse(
        localStorage.getItem("customPosts") || "[]",
      );

      const updatedPosts = storedPosts.map(
        (post: { id: number; title: string; body: string }) =>
          post.id === Number(id) ? { ...post, ...formData } : post,
      );

      localStorage.setItem("customPosts", JSON.stringify(updatedPosts));

      alert("Post updated successfully!");
      navigate("/posts");
    },
  });
  useEffect(() => {
    if (data) {
      reset({
        title: data.title,
        body: data.body,
      });
    }
  }, [data, reset]);

  const onSubmit = (formData: PostFormData) => {
    mutation.mutate(formData);
  };

  if (isLoading) return <p className="p-6 text-center">Loading post...</p>;

  if (isError) {
    return <p className="p-6 text-center text-red-500">Error loading post</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-500 via-yellow-300 to-blue-600 p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 w-full max-w-md border border-white/40"
      >
        <Link to="/posts" className="text-blue-500">
          ← Back to posts
        </Link>

        <h1 className="text-3xl font-bold my-6 text-center">Edit Post</h1>

        <input
          type="text"
          {...register("title")}
          className="w-full border border-gray-300 p-3 rounded-xl mb-2 focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        {errors.title && (
          <p className="text-red-500 mb-4">{errors.title.message}</p>
        )}

        <textarea
          {...register("body")}
          className="w-full border border-gray-300 p-3 rounded-xl mb-2 h-32 focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        {errors.body && (
          <p className="text-red-500 mb-4">{errors.body.message}</p>
        )}

        <button className="w-full bg-green-500 text-white py-3 rounded-xl font-bold hover:bg-green-600 hover:scale-[1.02] transition">
          Update Post
        </button>
      </form>
    </div>
  );
}

export default EditPost;
