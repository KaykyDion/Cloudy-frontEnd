import { Box, Button, Card, Flex, TextArea } from "@radix-ui/themes";
import usePosts from "../store/usePosts";
import { FormEventHandler, useState } from "react";
import { Post } from "../entities/Post";
import useAuthUser from "../store/useAuthUser";

type Props = {
  post: Post;
};

export const CreateCommentForm = ({ post }: Props) => {
  const { createComment } = usePosts((state) => state);
  const { user } = useAuthUser((state) => state);
  const [content, setContent] = useState("");

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (ev) => {
    ev.preventDefault();
    await createComment(post.id, content, user!);
    setContent("");
  };

  return (
    <Box>
      <Card>
        <form onSubmit={handleSubmit}>
          <TextArea
            name="commentContent"
            id="commentContent"
            required
            minLength={1}
            placeholder={"Adicione um comentário a publicação"}
            value={content}
            onChange={(ev) => setContent(ev.currentTarget.value)}
          />
          <Flex mt={"2"} justify={"end"}>
            <Button color="grass">Comentar</Button>
          </Flex>
        </form>
      </Card>
    </Box>
  );
};
