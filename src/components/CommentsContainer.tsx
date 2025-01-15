import { Button, Dialog, Flex, Text } from "@radix-ui/themes";
import { Post } from "../entities/Post";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import { Comment } from "./Comment";

type Props = {
  post: Post;
};

export const CommentsContainer = ({ post }: Props) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button variant="surface">
          <Text>{post.comments.length}</Text>
          <ChatBubbleIcon />
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title size={"7"}>Comentários</Dialog.Title>
        <Flex gap={"3"} direction={"column"}>
          {post.comments.map((comment) => (
            <Comment comment={comment} />
          ))}
        </Flex>
        {post.comments.length === 0 && (
          <Flex justify={"center"} align={"center"} height={"168px"}>
            <Text color="gray">
              Ainda nao há comentários nesta postagem. Seja o primeiro a
              comentar!
            </Text>
          </Flex>
        )}
      </Dialog.Content>
    </Dialog.Root>
  );
};
