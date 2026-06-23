import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createPost } from "../services/post.service";
import { postSchema, type PostFormData } from "../schemas/postSchema";
import { useState } from "react";
import Alert from "../../../components/Alert";

function CreatePost() {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">(
    "success",
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
  });

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      setMessage("Post created successfully!");
      setMessageType("success");
      reset();
    },
    onError: () => {
      setMessage("Error creating post");
      setMessageType("error");
    },
  });

  const onSubmit = (data: PostFormData) => {
    mutation.mutate(data);
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-500 via-yellow-300 to-blue-600 p-6">
      {" "}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 w-full max-w-md border border-white/40"
      >
        <div className="text-center mb-6">
          <span className="inline-block bg-blue-100 text-blue-600 font-bold px-3 py-1 rounded-full mb-3">
            JSONPlaceholder
          </span>

          <h1 className="text-3xl font-extrabold text-gray-800">Create Post</h1>

          <p className="text-gray-500 mt-2">
            Agrega un nuevo post con validación usando React Hook Form y Zod.
          </p>
        </div>
        {message && <Alert type={messageType} message={message} />}

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
          disabled={mutation.isPending}
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-bold hover:bg-blue-600 transition disabled:bg-gray-400"
        >
          {mutation.isPending ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
