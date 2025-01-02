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

export const SignUp: React.FC = () => {
  return (
    <form action="">
      <Flex justify="center">
        <Card>
          <Flex direction="column" gap="4" minWidth="16rem" maxWidth="36rem">
            <Heading as="h2" weight="light" mx="auto">
              Registrar
            </Heading>
            <Box>
              <Text as="label" htmlFor="name">
                Nome de usuário:
              </Text>
              <TextField.Root
                minLength={3}
                maxLength={30}
                name="name"
                id="name"
                required
                type="text"
              />
            </Box>
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
                minLength={8}
              />
            </Box>
            <Flex gap="4" direction="column">
              <Button color="blue" type="submit">
                Criar conta
              </Button>
            </Flex>
            <Flex gap="4" direction="column" align="end">
              <Link to="/login">
                <Text size="2">Já possui uma conta?</Text>
              </Link>
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </form>
  );
};
