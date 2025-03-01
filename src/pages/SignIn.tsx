import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Text,
  TextField,
} from "@radix-ui/themes";
import { FormEventHandler, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { userService } from "../services/cloudyApi";
import useAuthUser from "../store/useAuthUser";

const LoginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const SignIn: React.FC = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const setAuthUser = useAuthUser((state) => state.setUser);
  const navigate = useNavigate();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (ev) => {
    ev.preventDefault();

    const formData = new FormData(ev.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    const userData = LoginUserSchema.parse({ email, password });

    const response = await userService.login(userData);

    if (response?.status !== 200) return setErrorMsg(response.message);

    localStorage.setItem("token", response.data);

    await setAuthUser();

    navigate("/feed");
  };

  return (
    <form onSubmit={handleSubmit} onChange={() => setErrorMsg("")}>
      <Flex
        height={"80vh"}
        justify="center"
        align={"center"}
        direction={"column"}
      >
        <Heading as="h1" size="8" weight="light" mb="4">
          Cloudy
        </Heading>
        <Card>
          <Flex direction="column" gap="4" minWidth="16rem" maxWidth="36rem">
            <Heading as="h2" weight="light" mx="auto">
              Login
            </Heading>
            <Box>
              <Text as="label" htmlFor="email">
                Email:
              </Text>
              <TextField.Root
                name="email"
                id="email"
                required
                type="email"
                variant={errorMsg ? "soft" : "surface"}
                color={errorMsg ? "red" : "indigo"}
              />
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
                variant={errorMsg ? "soft" : "surface"}
                color={errorMsg ? "red" : "indigo"}
              />
            </Box>
            <Text size="1" color="red">
              {errorMsg}
            </Text>
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
