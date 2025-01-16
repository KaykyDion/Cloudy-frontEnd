import { useEffect } from "react";
import { Card, Flex, Skeleton } from "@radix-ui/themes";
import { PostCard } from "../components/PostCard";
import { Navigate, useNavigate } from "react-router-dom";
import usePosts from "../store/usePosts";

export const PostContainer: React.FC = () => {
  const { posts, setPosts } = usePosts((state) => state);
  const token = localStorage.getItem("token")?.split(`"`).join("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      if (token) {
        try {
          await setPosts();
        } catch (error) {
          if (error) navigate("/login");
        }
      }
    };
    fetchPosts();
  }, [token, navigate, setPosts]);

  if (!token) return <Navigate to={"/login"} />;

  if (posts.length === 0) {
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
      {posts.map((post) => (
        <PostCard post={post} key={post.id} />
      ))}
    </Flex>
  );
};
