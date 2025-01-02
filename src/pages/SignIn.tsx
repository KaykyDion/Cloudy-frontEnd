import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Text,
  TextField,
} from "@radix-ui/themes";
import { Link } from "react-router-dom";

export const SignIn: React.FC = () => {
  return (
    <form action="">
      <Flex justify="center">
        <Card>
          <Flex direction="column" gap="4" minWidth="16rem" maxWidth="36rem">
            <Heading as="h2" weight="light" mx="auto">
              Login
            </Heading>
            <Box>
              <Text as="label" htmlFor="email">
                Email:
              </Text>
              <TextField.Root name="email" id="email" required type="email" />
            </Box>
            <Box>
              <Text as="label" htmlFor="password">
                Senha:
              </Text>
              <TextField.Root
                name="password"
                id="password"
                required
                type="password"
              />
            </Box>
            <Flex gap="4" direction="column">
              <Button color="green" type="submit">
                Entrar
              </Button>
            </Flex>
            <Flex gap="4" direction="column" align="end">
              <Link to="/register">
                <Text size="2">Ainda não possui uma conta?</Text>
              </Link>
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </form>
  );
};
