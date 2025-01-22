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
  deleteComment: (postId: string, commentId: string) => Promise<void>;
  editComment: (
    postId: string,
    commentId: string,
    content: string
  ) => Promise<void>;
  likeComment: (
    postId: string,
    commentId: string,
    authUser: User
  ) => Promise<void>;
  unlikeComment: (
    postId: string,
    commentId: string,
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
              { ...response.data, owner: { name: authUser.name }, likes: [] },
            ],
          };
        }
        return post;
      }),
    }));
  },

  editComment: async (postId: string, commentId: string, content: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    set((state) => ({
      posts: state.posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: post.comments.map((comment) => {
              if (commentId === comment.id) {
                return { ...comment, content, updatedAt: Date() };
              }
              return comment;
            }),
          };
        }
        return post;
      }),
    }));
    await postsService.editComment(token, postId, commentId, content);
  },

  deleteComment: async (postId: string, commentId: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    set((state) => ({
      posts: state.posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: post.comments.filter(
              (comment) => comment.id !== commentId
            ),
          };
        }
        return post;
      }),
    }));
    await postsService.deleteComment(token, postId, commentId);
  },

  likeComment: async (postId: string, commentId: string, authUser: User) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    set((state) => ({
      posts: state.posts.map((post) => {
        if (post.id === postId) {
          const updatedComments = post.comments.map((comment) => {
            if (comment.id === commentId) {
              return {
                ...comment,
                likes: [
                  ...comment.likes,
                  { name: authUser.name, id: authUser.id },
                ],
              };
            }
            return comment;
          });
          return { ...post, comments: updatedComments };
        }
        return post;
      }),
    }));
    await postsService.likeComment(token, postId, commentId);
  },

  unlikeComment: async (postId: string, commentId: string, authUser: User) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    set((state) => ({
      posts: state.posts.map((post) => {
        if (post.id === postId) {
          const updatedComment = post.comments.map((comment) => {
            if (comment.id === commentId) {
              const updatedLikes = comment.likes.filter(
                (like) => like.id !== authUser.id
              );
              return { ...comment, likes: updatedLikes };
            }
            return comment;
          });
          return { ...post, comments: updatedComment };
        }
        return post;
      }),
    }));
    await postsService.unlikeComment(token, postId, commentId);
  },
}));

export default usePosts;
