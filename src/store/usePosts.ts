import { create } from "zustand";
import { postsService } from "../services/cloudyApi";
import { Post } from "../entities/Post";
import { User } from "../entities/User";

interface UsePosts {
  posts: Post[];
  setPosts: () => Promise<void>;
  editPost: (postId: string, content: string) => Promise<void>;
  deletePost: (postId: string) => Promise<void>;
  likePost: (postId: string, authUser: User) => Promise<void>;
  unlikePost: (postId: string, authUser: User) => Promise<void>;
  createComment: (
    postId: string,
    content: string,
    authUser: User
  ) => Promise<void>;
}

const usePosts = create<UsePosts>((set) => ({
  posts: [],
  setPosts: async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const response = await postsService.getPosts(token);
      set({ posts: response });
    }
  },

  editPost: async (postId: string, content: string) => {
    const token = localStorage.getItem("token");
    if (token) {
      set((state) => ({
        posts: state.posts.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              content,
              updatedAt: Date(),
            };
          }
          return post;
        }),
      }));
      await postsService.updatePost(token, postId, content);
    }
  },

  deletePost: async (postId: string) => {
    const token = localStorage.getItem("token");

    if (token) {
      set((state) => ({
        posts: state.posts.filter((post) => post.id !== postId),
      }));
      await postsService.deletePost(token, postId);
    }
  },

  createComment: async (postId: string, content: string, authUser: User) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const response = await postsService.createComment(token, postId, content);
    if (response.status !== 201) return;

    set((state) => ({
      posts: state.posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [
              ...post.comments,
              { ...response.data, owner: { name: authUser.name } },
            ],
          };
        }
        return post;
      }),
    }));
  },

  likePost: async (postId: string, authUser: User) => {
    const token = localStorage.getItem("token");
    if (token) {
      set((state) => ({
        posts: state.posts.map((post) => {
          if (post.id === postId && authUser !== null) {
            return {
              ...post,
              likes: [
                ...post.likes,
                {
                  id: authUser.id,
                  name: authUser.name,
                },
              ],
            };
          }
          return post;
        }),
      }));
      await postsService.likePost(token, postId);
    }
  },

  unlikePost: async (postId: string, authUser: User) => {
    const token = localStorage.getItem("token");
    if (token) {
      set((state) => ({
        posts: state.posts.map((post) => {
          if (post.id === postId && authUser !== null) {
            return {
              ...post,
              likes: post.likes.filter((like) => like.id !== authUser.id),
            };
          }
          return post;
        }),
      }));
      await postsService.removeLike(token, postId);
    }
  },
}));

export default usePosts;
