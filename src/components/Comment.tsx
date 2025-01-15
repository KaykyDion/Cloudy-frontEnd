import { Avatar, Box, Card, Flex, Link, Text } from "@radix-ui/themes";
import { PostComment } from "../entities/Post";

type Props = {
  comment: PostComment;
};

export const Comment = ({ comment }: Props) => {
  return (
    <Card>
      <Flex gap={"3"} mb={"3"} align={"center"}>
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
      <Text>{comment.content}</Text>
    </Card>
  );
};
