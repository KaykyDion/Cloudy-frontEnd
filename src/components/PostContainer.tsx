import { useEffect, useState } from "react";
import { postsService } from "../services/cloudyApi";
import { Post } from "../entities/Post";
import { Flex } from "@radix-ui/themes";
import { PostCard } from "../components/PostCard";
import { Navigate } from "react-router-dom";
import useAuthUser from "../store/useAuthUser";

export const PostContainer: React.FC = () => {
  const [feedPosts, setFeedPosts] = useState<Post[]>([]);
  const token = localStorage.getItem("token")?.split(`"`).join("");
  const authUser = useAuthUser((state) => state.user);

  useEffect(() => {
    const fetchPosts = async () => {
      if (token) {
        const posts = await postsService.getPosts(token);
        setFeedPosts(posts);
      }
    };
    fetchPosts();
  }, [token]);

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
  return (
    <Flex maxWidth="80rem" mx="auto" direction="column" gap={"3"}>
      {feedPosts.map((post) => (
        <PostCard
          unlikePost={handleUnlikePost}
          likePost={handleLikePost}
          post={post}
          key={post.id}
        />
      ))}
    </Flex>
  );
};
