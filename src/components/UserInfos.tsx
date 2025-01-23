import {
  Avatar,
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Text,
} from "@radix-ui/themes";
import { User } from "../entities/User";

type Props = {
  user: User;
};

export const UserInfos = ({ user }: Props) => {
  return (
    <>
      <Card>
        <Flex gap={"3"} align={"center"} direction={"column"}>
          <Avatar size="7" radius="full" fallback={user.name[0]} />
          <Heading size={"4"}>{user.name}</Heading>
          <Text color="pink">{user.bio}</Text>

          <Flex justify={"end"}>
            <Button>Seguir+</Button>
          </Flex>
          <Flex justify={"between"} gap={"4"}>
            <Text size={"4"} weight={"bold"}>
              {user.posts.length} posts
            </Text>
            <Text size={"4"} weight={"bold"}>
              {user.followers.length} seguidores
            </Text>
            <Text size={"4"} weight={"bold"}>
              {user.following.length} seguindo
            </Text>
          </Flex>
        </Flex>
      </Card>
      <Card>
        <Flex justify={"center"}>
          <Heading>Postagens</Heading>
        </Flex>
        <Flex direction={"column"} mt={"3"} gap={"3"}>
          {user.posts.map((post) => (
            <Card key={post.id}>
              <Flex justify={"between"}>
                <Flex gap={"3"} mb={"3"}>
                  <Avatar size="4" radius="full" fallback={user.name[0]} />
                  <Box>
                    <Flex align={"center"} gap={"2"}>
                      <Text as="div" size="3" weight="bold">
                        <Text>{user.name}</Text>
                      </Text>
                    </Flex>
                    <Text as="div" size="3" color="gray">
                      {post.createdAt.toLocaleString()}
                    </Text>
                  </Box>
                </Flex>
              </Flex>
              <Heading>{post.content}</Heading>
            </Card>
          ))}
        </Flex>
      </Card>
    </>
  );
};
