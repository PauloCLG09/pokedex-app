import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { postSchema, type PostFormData } from "../schemas/postSchema";

function CreatePost() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
  });

  const onSubmit = async (data: PostFormData) => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      const result = await response.json();

      console.log(result);

      alert("Post created successfully!");

      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-cyan-500 to-blue-700 p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">Create Post</h1>

        <input
          type="text"
          placeholder="Title"
          {...register("title")}
          className="w-full border p-3 rounded-lg mb-2"
        />

        {errors.title && (
          <p className="text-red-500 mb-4">{errors.title.message}</p>
        )}

        <textarea
          placeholder="Post body"
          {...register("body")}
          className="w-full border p-3 rounded-lg mb-2 h-32"
        />

        {errors.body && (
          <p className="text-red-500 mb-4">{errors.body.message}</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-bold hover:bg-blue-600 transition"
        >
          Create Post
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
