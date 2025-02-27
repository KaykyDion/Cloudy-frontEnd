import {
  AlertDialog,
  Avatar,
  Button,
  DropdownMenu,
  Flex,
  Heading,
  Text,
} from "@radix-ui/themes";
import { Link } from "react-router-dom";
import useAuthUser from "../store/useAuthUser";
import { ExitIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";

export const Header = () => {
  const authUser = useAuthUser((state) => state.user);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <header>
      <Flex maxWidth="80rem" mx="auto" align={"center"} justify={"between"}>
        <Heading as="h1" size="8" weight="light" mb="4">
          <Link to={"/feed"} style={{ textDecoration: "none", color: "#fff" }}>
            Cloudy
          </Link>
        </Heading>
        {authUser && (
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button style={{ background: "none", cursor: "pointer" }}>
                <HamburgerMenuIcon width="28" height="28" />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Item>
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/users/${authUser?.id}`}
                >
                  <Flex align={"center"} gap={"2"}>
                    <Avatar
                      size="2"
                      radius="full"
                      fallback={authUser!.name[0]}
                    />
                    <Text size={"2"} weight={"bold"}>
                      {authUser?.name}
                    </Text>
                  </Flex>
                </Link>
              </DropdownMenu.Item>
              <AlertDialog.Root>
                <AlertDialog.Trigger>
                  <DropdownMenu.Item
                    onSelect={(event) => event.preventDefault()}
                    color="red"
                    style={{ marginTop: "10px", paddingLeft: "20px" }}
                  >
                    <ExitIcon />
                    <Text color="gray" size={"2"} weight={"bold"}>
                      Sair
                    </Text>
                  </DropdownMenu.Item>
                </AlertDialog.Trigger>
                <AlertDialog.Content>
                  <AlertDialog.Title color="red">
                    Tem certeza que deseja sair?
                  </AlertDialog.Title>
                  <AlertDialog.Description size="2">
                    deseja sair da conta?
                  </AlertDialog.Description>
                  <Flex gap="3" mt="4" justify="end">
                    <AlertDialog.Cancel>
                      <Button variant="soft" color="gray">
                        Cancelar
                      </Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                      <Button onClick={logout} variant="solid" color="red">
                        Sair
                      </Button>
                    </AlertDialog.Action>
                  </Flex>
                </AlertDialog.Content>
              </AlertDialog.Root>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        )}
      </Flex>
    </header>
  );
};
