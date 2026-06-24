import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  commentSchema,
  type CommentFormData,
} from "../schemas/commentSchema";

interface Props {
  postId: string;
}

function CommentForm({ postId }: Props) {
  const [comments, setComments] = useState<CommentFormData[]>(() => {
    return JSON.parse(localStorage.getItem(`comments-post-${postId}`) || "[]");
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
  });

  const onSubmit = (data: CommentFormData) => {
    const updatedComments = [data, ...comments];

    setComments(updatedComments);

    localStorage.setItem(
      `comments-post-${postId}`,
      JSON.stringify(updatedComments),
    );

    reset();
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3 mb-6">
        <input
          type="text"
          placeholder="Your name"
          {...register("name")}
          className="border p-3 rounded-lg"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        <input
          type="email"
          placeholder="Your email"
          {...register("email")}
          className="border p-3 rounded-lg"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <textarea
          placeholder="Write your comment"
          {...register("comment")}
          className="border p-3 rounded-lg h-28"
        />
        {errors.comment && (
          <p className="text-red-500">{errors.comment.message}</p>
        )}

        <button
          type="submit"
          className="bg-blue-500 text-white py-3 rounded-lg font-bold hover:bg-blue-600 transition"
        >
          Add Comment
        </button>
      </form>

      <div className="grid gap-3">
        {comments.map((comment, index) => (
          <div key={index} className="bg-gray-100 rounded-lg p-4">
            <h3 className="font-bold">{comment.name}</h3>
            <p className="text-sm text-gray-500">{comment.email}</p>
            <p className="mt-2">{comment.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentForm;
