import {
  Avatar,
  Button,
  Card,
  Flex,
  Heading,
  Skeleton,
  Text,
} from "@radix-ui/themes";
import { User } from "../entities/User";
import { PostCard } from "./PostCard";
import usePosts from "../store/usePosts";
import { useEffect, useState } from "react";
import { userService } from "../services/cloudyApi";
import useAuthUser from "../store/useAuthUser";
import { EditUserForm } from "./EditUserForm";

type Props = {
  user: User;
};

export const UserInfos = ({ user }: Props) => {
  const { setPosts, posts, clearPosts } = usePosts((state) => state);
  const [followers, setFollowers] = useState(user.followers);
  const token = localStorage.getItem("token");
  const authUser = useAuthUser((state) => state.user);

  useEffect(() => {
    clearPosts();
    setPosts(user.posts);
  }, [setPosts, user.posts, clearPosts]);

  if (!authUser?.id)
    return (
      <>
        <Skeleton height={"250px"}>
          <Card></Card>
        </Skeleton>
        <Skeleton height={"700px"}>
          <Card></Card>
        </Skeleton>
      </>
    );

  const handleFollowUser = async () => {
    setFollowers((current) => [
      ...current,
      { follower: { id: authUser!.id, name: authUser!.name } },
    ]);
    await userService.followUser(user.id, token!);
  };

  const handleUnfollowUser = async () => {
    setFollowers((current) =>
      current.filter((f) => f.follower.id !== authUser!.id)
    );
    await userService.unfollowUser(user.id, token!);
  };

  return (
    <>
      <Card>
        <Flex gap={"3"} align={"center"} direction={"column"}>
          <Avatar size="7" radius="full" fallback={user.name[0]} />
          <Heading size={"4"}>{user.name}</Heading>
          <Text align={"center"} color="pink">
            {user.bio}
          </Text>
          {user.id !== authUser!.id ? (
            <Flex justify={"end"}>
              {followers.find((f) => f.follower.id === authUser!.id) ? (
                <Button color="gray" onClick={() => handleUnfollowUser()}>
                  Deixar de seguir
                </Button>
              ) : (
                <Button onClick={() => handleFollowUser()}>Seguir</Button>
              )}
            </Flex>
          ) : (
            <EditUserForm />
          )}

          <Flex justify={"between"} gap={"3"}>
            <Text align={"center"} size={"3"} weight={"bold"}>
              {user.posts.length} posts
            </Text>
            <Text align={"center"} size={"3"} weight={"bold"}>
              {followers.length} seguidores
            </Text>
            <Text align={"center"} size={"3"} weight={"bold"}>
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
            <PostCard key={post.id} post={post} />
          ))}
        </Flex>
      </Card>
    </>
  );
};
