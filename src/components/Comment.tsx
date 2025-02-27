import {
  AlertDialog,
  Avatar,
  Box,
  Button,
  Card,
  DropdownMenu,
  Flex,
  Link,
  Text,
} from "@radix-ui/themes";
import { Post, PostComment } from "../entities/Post";
import {
  DotsHorizontalIcon,
  HeartFilledIcon,
  HeartIcon,
} from "@radix-ui/react-icons";
import useAuthUser from "../store/useAuthUser";
import usePosts from "../store/usePosts";
import { EditPostModal } from "./EditPostModal";

type Props = {
  comment: PostComment;
  post: Post;
};

export const Comment = ({ comment, post }: Props) => {
  const authUser = useAuthUser((state) => state.user);
  const { likeComment, unlikeComment, deleteComment } = usePosts(
    (state) => state
  );

  return (
    <Card>
      <Flex gap={"3"} mb={"3"} justify={"between"}>
        <Flex gap={"3"} align={"center"}>
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
        {authUser!.id === comment.ownerId && (
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button style={{ background: "none", cursor: "pointer" }}>
                <DotsHorizontalIcon />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <EditPostModal
                itemToEdit="comment"
                comment={comment}
                post={post}
              />
              <AlertDialog.Root>
                <AlertDialog.Trigger>
                  <DropdownMenu.Item
                    onSelect={(event) => event.preventDefault()}
                    shortcut="⌫"
                    color="red"
                  >
                    Excluir
                  </DropdownMenu.Item>
                </AlertDialog.Trigger>
                <AlertDialog.Content>
                  <AlertDialog.Title color="red">
                    Excluir o comentário?
                  </AlertDialog.Title>
                  <AlertDialog.Description size="2">
                    Tem certeza que deseja excluir o comentário?
                  </AlertDialog.Description>
                  <Flex gap="3" mt="4" justify="end">
                    <AlertDialog.Cancel>
                      <Button variant="soft" color="gray">
                        Cancelar
                      </Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                      <Button
                        variant="solid"
                        color="red"
                        onClick={() => deleteComment(post.id, comment.id)}
                      >
                        Excluir
                      </Button>
                    </AlertDialog.Action>
                  </Flex>
                </AlertDialog.Content>
              </AlertDialog.Root>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        )}
      </Flex>
      <Text>{comment.content}</Text>
      <Flex mt={"3"} justify={"end"}>
        {comment.likes.find((user) => user.id === authUser?.id) ? (
          <Button
            onClick={() => unlikeComment(post.id, comment.id, authUser!)}
            variant="surface"
            color="ruby"
          >
            <Text>{comment.likes.length}</Text>
            <HeartFilledIcon />
          </Button>
        ) : (
          <Button
            onClick={() => likeComment(post.id, comment.id, authUser!)}
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
