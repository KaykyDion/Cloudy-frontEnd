import { Box, Heading } from "@radix-ui/themes";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import useAuthUser from "./store/useAuthUser";
import { useEffect } from "react";

function App() {
  const setUser = useAuthUser((state) => state.setUser);

  useEffect(() => {
    setUser();
  }, [setUser]);

  return (
    <>
      <header>
        <Box maxWidth="80rem" mx="auto">
          <Box>
            <Heading as="h1" size="8" weight="light" mb="4">
              Cloudy
            </Heading>
          </Box>
        </Box>
      </header>
      <main>
        <RouterProvider router={router} />
      </main>
    </>
  );
}

export default App;
