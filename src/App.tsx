import { RouterProvider } from "react-router-dom";
import router from "./router";
import useAuthUser from "./store/useAuthUser";
import { useEffect } from "react";

function App() {
  const setUser = useAuthUser((state) => state.setUser);

  useEffect(() => {
    setUser();
  }, [setUser]);

  return <RouterProvider router={router} />;
}

export default App;
