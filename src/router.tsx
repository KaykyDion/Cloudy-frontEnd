import { createBrowserRouter, Navigate } from "react-router-dom";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Feed } from "./pages/Feed";
import { UserPage } from "./pages/UserPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/feed" />,
  },
  {
    path: "/login",
    element: <SignIn />,
  },
  {
    path: "/register",
    element: <SignUp />,
  },
  {
    path: "/feed",
    element: <Feed />,
  },
  {
    path: "/users/:id",
    element: <UserPage />,
  },
]);

export default router;
