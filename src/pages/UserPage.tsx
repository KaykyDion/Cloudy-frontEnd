import { Navigate, useParams } from "react-router-dom";
import { userService } from "../services/cloudyApi";
import { useEffect, useState } from "react";
import { User } from "../entities/User";
import { UserInfos } from "../components/UserInfos";
import { Flex } from "@radix-ui/themes";

export const UserPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User>();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      const fetchUser = async () => {
        const { data } = await userService.getUserById(id!, token);
        setUser(data);
      };
      fetchUser();
    }
  }, [id, token]);

  if (!token) return <Navigate to={"/login"} />;

  return (
    <section>
      <Flex maxWidth="80rem" mx="auto" direction={"column"} gap={"3"}>
        {user && <UserInfos user={user} />}
      </Flex>
    </section>
  );
};
