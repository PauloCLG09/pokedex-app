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
    queryFn: () => getPostById(id!),
  });

  const mutation = useMutation({
    mutationFn: (formData: PostFormData) => updatePost(id!, formData),
    onSuccess: () => {
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md"
      >
        <Link to="/posts" className="text-blue-500">
          ← Back to posts
        </Link>

        <h1 className="text-3xl font-bold my-6 text-center">Edit Post</h1>

        <input
          type="text"
          {...register("title")}
          className="w-full border p-3 rounded-lg mb-2"
        />

        {errors.title && (
          <p className="text-red-500 mb-4">{errors.title.message}</p>
        )}

        <textarea
          {...register("body")}
          className="w-full border p-3 rounded-lg mb-2 h-32"
        />

        {errors.body && (
          <p className="text-red-500 mb-4">{errors.body.message}</p>
        )}

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-3 rounded-lg font-bold hover:bg-green-600 transition"
        >
          Update Post
        </button>
      </form>
    </div>
  );
}

export default EditPost;