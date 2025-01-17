import { Box, Button, Card, Flex, TextArea } from "@radix-ui/themes";
import { FormEventHandler } from "react";
import { postsService } from "../services/cloudyApi";
import { Navigate } from "react-router-dom";

export const CreatePostForm: React.FC = () => {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to={"/login"} />;

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (ev) => {
    ev.preventDefault();
    const formData = new FormData(ev.currentTarget);
    const content = formData.get("content") as string;
    await postsService.createPost(token, content);
    location.reload();
  };

  return (
    <Box>
      <Card>
        <form onSubmit={handleSubmit}>
          <TextArea
            name="content"
            id="content"
            required
            minLength={1}
            placeholder={"No que você está pensando?"}
            size={"3"}
          />
          <Flex mt={"2"} justify={"end"}>
            <Button color="grass">Publicar</Button>
          </Flex>
        </form>
      </Card>
    </Box>
  );
};
