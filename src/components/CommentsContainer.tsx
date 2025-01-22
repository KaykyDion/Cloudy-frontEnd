import { Box, Button, Dialog, Flex, Text } from "@radix-ui/themes";
import { Post } from "../entities/Post";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import { Comment } from "./Comment";
import { CreateCommentForm } from "./CreateCommentForm";

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
      <Dialog.Content aria-describedby={undefined}>
        <Box maxHeight="80vh">
          <Dialog.Title size={"7"}>Comentários</Dialog.Title>
          <Flex gap={"3"} direction={"column"}>
            <CreateCommentForm post={post} />

            {post.comments.map((comment) => (
              <Comment key={comment.id} comment={comment} post={post} />
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
        </Box>
      </Dialog.Content>
    </Dialog.Root>
  );
};
