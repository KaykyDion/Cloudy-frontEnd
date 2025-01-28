import { Pencil1Icon } from "@radix-ui/react-icons";
import {
  Dialog,
  Box,
  Button,
  Flex,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import useAuthUser from "../store/useAuthUser";
import { FormEventHandler, useState } from "react";

export const EditUserForm = () => {
  const { user, updateUser } = useAuthUser((state) => state);
  const [name, setName] = useState(user?.name);
  const [bio, setBio] = useState(user?.bio);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (ev) => {
    ev.preventDefault();
    await updateUser({ name, bio });
    location.reload();
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button variant="surface" radius="full">
          <Pencil1Icon /> Editar
        </Button>
      </Dialog.Trigger>
      <Dialog.Content aria-describedby={undefined}>
        <form onSubmit={handleSubmit}>
          <Dialog.Title>Editar usuário</Dialog.Title>
          <Flex direction={"column"} gap={"3"}>
            <Box>
              <Text as="label" htmlFor="name">
                Nome:
              </Text>
              <TextField.Root
                id="name"
                name="name"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
              />
            </Box>
            <Box>
              <Text as="label" htmlFor="bio">
                Bio:
              </Text>
              <TextArea
                id="bio"
                name="bio"
                value={bio}
                onChange={(ev) => setBio(ev.target.value)}
              />
            </Box>
          </Flex>
          <Flex justify={"end"} mt={"3"} gap={"3"}>
            <Dialog.Close>
              <Button color="gray" variant="soft">
                Cancelar
              </Button>
            </Dialog.Close>
            <Button
              disabled={user!.name === name && user!.bio === bio ? true : false}
              color="grass"
              type="submit"
            >
              Confirmar
            </Button>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};
