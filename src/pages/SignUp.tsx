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
import { userService } from "../services/cloudyApi";
import { FormEventHandler, useState } from "react";
import { z } from "zod";

const RegisterUserSchema = z.object({
  name: z.string().min(3).max(30),
  email: z.string().email(),
  password: z.string().min(8),
});

export const SignUp: React.FC = () => {
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (ev) => {
    ev.preventDefault();

    const formData = new FormData(ev.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    const userData = RegisterUserSchema.parse({ name, email, password });

    const response = await userService.registerUser(userData);

    if (response?.status !== 201) return setErrorMsg(response.message);

    localStorage.setItem("token", JSON.stringify(response.data));
  };

  return (
    <form onSubmit={handleSubmit} onChange={() => setErrorMsg("")}>
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
              <TextField.Root
                name="email"
                id="email"
                required
                type="email"
                mb="1"
                color={errorMsg ? "red" : "indigo"}
              />
              <Text size="1" color="red">
                {errorMsg}
              </Text>
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
