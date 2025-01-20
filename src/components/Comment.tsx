import { Avatar, Box, Button, Card, Flex, Link, Text } from "@radix-ui/themes";
import { PostComment } from "../entities/Post";
import { HeartFilledIcon, HeartIcon } from "@radix-ui/react-icons";
import useAuthUser from "../store/useAuthUser";
import usePosts from "../store/usePosts";
import { Navigate } from "react-router-dom";

type Props = {
  comment: PostComment;
  postId: string;
};

export const Comment = ({ comment, postId }: Props) => {
  const authUser = useAuthUser((state) => state.user);
  const { likeComment } = usePosts((state) => state);

  if (!authUser) return <Navigate to={"/login"} />;

  return (
    <Card>
      <Flex gap={"3"} mb={"3"} align={"center"}>
        <Avatar size="4" radius="full" fallback={comment.owner.name[0]} />
        <Box>
          <Flex align={"center"} gap={"2"}>
            <Text as="div" size="3" weight="bold">
              <Link href="#" color="indigo">
                {comment.owner.name}
              </Link>
            </Text>
          </Flex>
        </Box>
      </Flex>
      <Text>{comment.content}</Text>
      <Flex justify={"end"}>
        {comment.likes.find((user) => user.id === authUser?.id) ? (
          <Button variant="surface" color="ruby">
            <Text>{comment.likes.length}</Text>
            <HeartFilledIcon />
          </Button>
        ) : (
          <Button
            onClick={() => likeComment(postId, comment.id, authUser)}
            variant="surface"
            color="ruby"
          >
            <Text>{comment.likes.length}</Text>
            <HeartIcon />
          </Button>
        )}
      </Flex>
    </Card>
  );
};
