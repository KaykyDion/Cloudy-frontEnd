import { Flex } from "@radix-ui/themes";
import { CreatePostForm } from "../components/CreatePostForm";
import { PostContainer } from "../components/PostContainer";

export const Feed: React.FC = () => {
  return (
    <section>
      <Flex maxWidth="80rem" mx="auto" direction={"column"} gap={"3"}>
        <CreatePostForm />
        <PostContainer />
      </Flex>
    </section>
  );
};
