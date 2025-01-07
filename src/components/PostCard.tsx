import {
  Avatar,
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Link,
  Text,
} from "@radix-ui/themes";
import { Post } from "../entities/Post";
import {
  ChatBubbleIcon,
  HeartFilledIcon,
  HeartIcon,
} from "@radix-ui/react-icons";
import useAuthUser from "../store/useAuthUser";

type Props = {
  post: Post;
  likePost: (postId: string) => void;
  unlikePost: (postId: string) => void;
};

export const PostCard = ({ post, likePost, unlikePost }: Props) => {
  const authUser = useAuthUser((state) => state.user);

  return (
    <Card key={post.id}>
      <Flex gap={"3"} mb={"3"}>
        <Avatar
          size="4"
          src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
          radius="full"
          fallback="T"
        />
        <Box>
          <Text as="div" size="3" weight="bold">
            <Link href="#" color="indigo">
              {post.owner.name}
            </Link>
          </Text>
          <Text as="div" size="3" color="gray">
            {post.owner.email}
          </Text>
        </Box>
      </Flex>
      <Box>
        <Heading size={"5"} mb={"3"} as="h3">
          {post.content}
        </Heading>
      </Box>
      <Flex gap={"3"} justify={"end"}>
        <Flex gap={"1"} align={"center"}>
          {post.likes.find((user) => user.id === authUser?.id) ? (
            <Button
              onClick={() => unlikePost(post.id)}
              variant="surface"
              color="ruby"
            >
              <Text>{post.likes.length}</Text>
              <HeartFilledIcon />
            </Button>
          ) : (
            <Button
              onClick={() => likePost(post.id)}
              variant="surface"
              color="ruby"
            >
              <Text>{post.likes.length}</Text>
              <HeartIcon />
            </Button>
          )}
        </Flex>

        <Flex gap={"1"} align={"center"}>
          <Button variant="surface">
            <Text>{post.comments.length}</Text>
            <ChatBubbleIcon />
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
};
