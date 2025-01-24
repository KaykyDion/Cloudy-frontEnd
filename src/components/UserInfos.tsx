import { Avatar, Button, Card, Flex, Heading, Text } from "@radix-ui/themes";
import { User } from "../entities/User";
import { PostCard } from "./PostCard";
import usePosts from "../store/usePosts";
import { useEffect } from "react";

type Props = {
  user: User;
};

export const UserInfos = ({ user }: Props) => {
  const { setPosts, posts, clearPosts } = usePosts((state) => state);

  useEffect(() => {
    clearPosts();
    setPosts(user.posts);
  }, [setPosts, user.posts, clearPosts]);

  return (
    <>
      <Card>
        <Flex gap={"3"} align={"center"} direction={"column"}>
          <Avatar size="7" radius="full" fallback={user.name[0]} />
          <Heading size={"4"}>{user.name}</Heading>
          <Text color="pink">{user.bio}</Text>
          <Flex justify={"end"}>
            <Button>Seguir+</Button>
          </Flex>
          <Flex justify={"between"} gap={"4"}>
            <Text size={"4"} weight={"bold"}>
              {user.posts.length} posts
            </Text>
            <Text size={"4"} weight={"bold"}>
              {user.followers.length} seguidores
            </Text>
            <Text size={"4"} weight={"bold"}>
              {user.following.length} seguindo
            </Text>
          </Flex>
        </Flex>
      </Card>
      <Card>
        <Flex justify={"center"}>
          <Heading>Postagens</Heading>
        </Flex>
        <Flex direction={"column"} mt={"3"} gap={"3"}>
          {posts.map((post) => (
            <PostCard post={post} />
          ))}
        </Flex>
      </Card>
    </>
  );
};
