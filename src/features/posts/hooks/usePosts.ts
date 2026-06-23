import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from "../services/post.service";

import type { PostFormData } from "../schemas/postSchema";

export interface Post {
  id: number;
  title: string;
  body: string;
}

export const usePosts = () => {
  return useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: getPosts,
  });
};

export const usePost = (id: string | undefined) => {
  return useQuery<Post>({
    queryKey: ["post", id],
    queryFn: () => getPostById(id!),
    enabled: !!id,
  });
};

export const useCreatePost = () => {
  return useMutation({
    mutationFn: createPost,
  });
};

export const useUpdatePost = (id: string | undefined) => {
  return useMutation({
    mutationFn: (data: PostFormData) => updatePost(id!, data),
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData<Post[]>(["posts"], (oldPosts) =>
        oldPosts?.filter((post) => post.id !== deletedId),
      );
    },
  });
};
