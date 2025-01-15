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
}

const token = localStorage.getItem("token")?.split('"').join("");

const usePosts = create<UsePosts>((set) => ({
  posts: [],
  setPosts: async () => {
    if (token) {
      const response = await postsService.getPosts(token);
      set({ posts: response });
    }
  },

  editPost: async (postId: string, content: string) => {
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
    if (token) {
      set((state) => ({
        posts: state.posts.filter((post) => post.id !== postId),
      }));
      await postsService.deletePost(token, postId);
    }
  },

  likePost: async (postId: string, authUser: User) => {
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
