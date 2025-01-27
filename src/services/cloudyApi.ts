import axios from "axios";
import { RegisterUserData, User } from "../entities/User";
import { PostComment, SearchPostsResponse } from "../entities/Post";

const url = import.meta.env.VITE_CLOUDY_API_URL;

export const userService = {
  async registerUser({ name, email, password }: RegisterUserData) {
    const response = await axios
      .post(`${url}/users/register`, { name, email, password })
      .catch((err) => {
        if (err.response) {
          return { ...err.response.data, status: err.response.status };
        }
      });
    return response;
  },

  async login({
    email,
    password,
  }: Pick<RegisterUserData, "email" | "password">) {
    const response = await axios
      .post(`${url}/users/login`, { email, password })
      .catch((err) => {
        if (err.response) {
          return { ...err.response.data, status: err.response.status };
        }
      });
    return response;
  },

  async getUserById(id: string, token: string) {
    const response = await axios.get<User>(`${url}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  },

  async followUser(userId: string, token: string) {
    const response = await axios.post(
      `${url}/users/${userId}/followers`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  },

  async unfollowUser(userId: string, token: string) {
    const response = await axios.delete(`${url}/users/${userId}/followers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  },
};

export const postsService = {
  async getPosts(token: string) {
    const response = await axios.get<SearchPostsResponse>(
      `${url}/posts?text=&page=1`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.posts;
  },

  async createPost(token: string, content: string) {
    const response = await axios.post(
      `${url}/posts`,
      { content },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  },

  async deletePost(token: string, id: string) {
    const response = await axios.delete(`${url}/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  },

  async updatePost(token: string, id: string, content: string) {
    const response = await axios.put(
      `${url}/posts/${id}`,
      {
        content,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  },

  async likePost(token: string, postId: string) {
    const response = await axios.post(
      `${url}/posts/${postId}/likes`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  },

  async removeLike(token: string, postId: string) {
    const response = await axios.delete(`${url}/posts/${postId}/likes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  },

  async createComment(token: string, postId: string, content: string) {
    const response = await axios.post<PostComment>(
      `${url}/posts/${postId}/comments`,
      {
        content,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  },

  async editComment(
    token: string,
    postId: string,
    commentId: string,
    content: string
  ) {
    const response = await axios.put(
      `${url}/posts/${postId}/comments/${commentId}`,
      {
        content,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  },

  async deleteComment(token: string, postId: string, commentId: string) {
    const response = await axios.delete(
      `${url}/posts/${postId}/comments/${commentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  },

  async likeComment(token: string, postId: string, commentId: string) {
    const response = await axios.post(
      `${url}/posts/${postId}/comments/${commentId}/likes`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  },

  async unlikeComment(token: string, postId: string, commentId: string) {
    const response = await axios.delete(
      `${url}/posts/${postId}/comments/${commentId}/likes`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  },
};
