import {
  AlertDialog,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  DropdownMenu,
  Flex,
  Heading,
  Link,
  Text,
} from "@radix-ui/themes";
import { Post } from "../entities/Post";
import {
  DotsHorizontalIcon,
  HeartFilledIcon,
  HeartIcon,
} from "@radix-ui/react-icons";
import useAuthUser from "../store/useAuthUser";
import { EditPostModal } from "./EditPostModal";
import { CommentsContainer } from "./CommentsContainer";
import usePosts from "../store/usePosts";
import { Navigate } from "react-router-dom";

type Props = {
  post: Post;
};

export const PostCard = ({ post }: Props) => {
  const authUser = useAuthUser((state) => state.user);
  const { deletePost, likePost, unlikePost } = usePosts((state) => state);

  if (!authUser) return <Navigate to={"/login"} />;

  return (
    <Card key={post.id}>
      <Flex justify={"between"}>
        <Flex gap={"3"} mb={"3"}>
          <Avatar size="4" radius="full" fallback={post.owner.name[0]} />
          <Box>
            <Flex align={"center"} gap={"2"}>
              <Text as="div" size="3" weight="bold">
                <Link href="#" color="indigo">
                  {post.owner.name}
                </Link>
              </Text>
              {post.ownerId === authUser?.id ? (
                <Badge color="crimson">Você</Badge>
              ) : null}
              {post.createdAt !== post.updatedAt ? (
                <Badge color="lime">Editado</Badge>
              ) : null}
            </Flex>
            <Text as="div" size="3" color="gray">
              {post.owner.email}
            </Text>
          </Box>
        </Flex>
        {post.ownerId === authUser?.id ? (
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button style={{ background: "none", cursor: "pointer" }}>
                <DotsHorizontalIcon />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <EditPostModal post={post} />
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
                    Excluir a postagem?
                  </AlertDialog.Title>
                  <AlertDialog.Description size="2">
                    Tem certeza que deseja excluir a postagem?
                  </AlertDialog.Description>
                  <Flex gap="3" mt="4" justify="end">
                    <AlertDialog.Cancel>
                      <Button variant="soft" color="gray">
                        Cancelar
                      </Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                      <Button
                        onClick={() => deletePost(post.id)}
                        variant="solid"
                        color="red"
                      >
                        Excluir
                      </Button>
                    </AlertDialog.Action>
                  </Flex>
                </AlertDialog.Content>
              </AlertDialog.Root>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        ) : null}
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
              onClick={() => unlikePost(post.id, authUser)}
              variant="surface"
              color="ruby"
            >
              <Text>{post.likes.length}</Text>
              <HeartFilledIcon />
            </Button>
          ) : (
            <Button
              onClick={() => likePost(post.id, authUser)}
              variant="surface"
              color="ruby"
            >
              <Text>{post.likes.length}</Text>
              <HeartIcon />
            </Button>
          )}
        </Flex>
        <Flex gap={"1"} align={"center"}>
          <CommentsContainer post={post} />
        </Flex>
      </Flex>
    </Card>
  );
};
