import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

export const getPosts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getPostById = async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createPost = async (data: { title: string; body: string }) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

export const updatePost = async (
  id: string,
  data: {
    title: string;
    body: string;
  },
) => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
};

export const deletePost = async (id: number) => {
  const response = await axios.delete(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
  );

  return response.data;
};
