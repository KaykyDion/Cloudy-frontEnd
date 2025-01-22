import { Button, Dialog, DropdownMenu, Flex, TextArea } from "@radix-ui/themes";
import { Post, PostComment } from "../entities/Post";
import { useState } from "react";
import usePosts from "../store/usePosts";

type Props = {
  post: Post;
  comment?: PostComment;
  itemToEdit: "post" | "comment";
};

export const EditPostModal = ({ post, comment, itemToEdit }: Props) => {
  const [content, setContent] = useState(
    comment ? comment.content : post.content
  );
  const { editPost, editComment } = usePosts((state) => state);
  const texts = {
    modalTitle:
      itemToEdit === "comment" ? "Editar comentário" : "Editar postagem",
    modalDescription:
      itemToEdit === "comment"
        ? "Faça alterações no seu comentário"
        : "Faça alterações na sua postagem",
  };

  const handleSubmit = () => {
    if (itemToEdit === "post") {
      editPost(post.id, content);
    }

    if (itemToEdit === "comment" && comment) {
      editComment(post.id, comment.id, content);
    }
  };

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
        <Dialog.Title color="yellow">{texts.modalTitle}</Dialog.Title>
        <Dialog.Description mb={"2"}>
          {texts.modalDescription}
        </Dialog.Description>
        <form
          onSubmit={(ev) => {
            ev.preventDefault();
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
              <Button onClick={handleSubmit} type="submit" color="grass">
                Confirmar
              </Button>
            </Dialog.Close>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};
