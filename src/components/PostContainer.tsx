import { useEffect, useState } from "react";
import { postsService } from "../services/cloudyApi";
import { Post } from "../entities/Post";
import { Card, Flex, Skeleton } from "@radix-ui/themes";
import { PostCard } from "../components/PostCard";
import { Navigate, useNavigate } from "react-router-dom";
import useAuthUser from "../store/useAuthUser";

export const PostContainer: React.FC = () => {
  const [feedPosts, setFeedPosts] = useState<Post[]>([]);
  const token = localStorage.getItem("token")?.split(`"`).join("");
  const authUser = useAuthUser((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      if (token) {
        try {
          const posts = await postsService.getPosts(token);
          setFeedPosts(posts);
        } catch (error) {
          if (error) navigate("/login");
        }
      }
    };
    fetchPosts();
  }, [token, navigate]);

  if (!token) return <Navigate to={"/login"} />;

  const handleLikePost = async (postId: string) => {
    setFeedPosts((currentState) => {
      return currentState.map((post) => {
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
      });
    });
    await postsService.likePost(token, postId);
  };

  const handleUnlikePost = async (postId: string) => {
    setFeedPosts((currentState) => {
      return currentState.map((post) => {
        if (post.id === postId && authUser !== null) {
          return {
            ...post,
            likes: post.likes.filter((like) => like.name !== authUser.name),
          };
        }
        return post;
      });
    });
    await postsService.removeLike(token, postId);
  };

  const handleEditPost = async (postId: string, content: string) => {
    setFeedPosts((currentState) => {
      return currentState.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            content,
            updatedAt: Date(),
          };
        }
        return post;
      });
    });
    await postsService.updatePost(token, postId, content);
  };

  const handleDeletePost = async (postId: string) => {
    setFeedPosts((currentState) => {
      return currentState.filter((post) => post.id !== postId);
    });
    await postsService.deletePost(token, postId);
  };

  if (feedPosts.length === 0) {
    const loadingArray = [1, 2, 3, 4, 5];
    return (
      <Flex direction={"column"} gap={"3"}>
        {loadingArray.map((i) => (
          <Skeleton key={i} height={"154px"}>
            <Card></Card>
          </Skeleton>
        ))}
      </Flex>
    );
  }

  return (
    <Flex maxWidth="100%" mx="auto" direction="column" gap={"3"}>
      {feedPosts.map((post) => (
        <PostCard
          editPost={handleEditPost}
          deletePost={handleDeletePost}
          unlikePost={handleUnlikePost}
          likePost={handleLikePost}
          post={post}
          key={post.id}
        />
      ))}
    </Flex>
  );
};
