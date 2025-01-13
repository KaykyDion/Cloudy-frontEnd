import { Button, Dialog, DropdownMenu, Flex, TextArea } from "@radix-ui/themes";
import { Post } from "../entities/Post";
import { useState } from "react";

type Props = {
  post: Post;
  editPost: (postId: string, content: string) => void;
};

export const EditPostModal = ({ post, editPost }: Props) => {
  const [content, setContent] = useState(post.content);
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <DropdownMenu.Item
          onSelect={(event) => event.preventDefault()}
          color="yellow"
          shortcut="🖊️"
        >
          Editar
        </DropdownMenu.Item>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title color="yellow">Editar postagem</Dialog.Title>
        <Dialog.Description mb={"2"}>
          Faça alterações na sua postagem
        </Dialog.Description>
        <form
          onSubmit={(ev) => {
            ev.preventDefault();
            editPost(post.id, content);
          }}
        >
          <TextArea
            name="content"
            id="content"
            value={content}
            onChange={(ev) => setContent(ev.currentTarget.value)}
            required
            minLength={1}
            size={"3"}
          />
          <Flex mt={"4"} gap={"3"} justify={"end"}>
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancelar
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button type="submit" color="grass">
                Confirmar
              </Button>
            </Dialog.Close>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};
