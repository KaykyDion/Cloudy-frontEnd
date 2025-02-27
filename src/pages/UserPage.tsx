import { Navigate, useNavigate, useParams } from "react-router-dom";
import { userService } from "../services/cloudyApi";
import { useEffect, useState } from "react";
import { User } from "../entities/User";
import { UserInfos } from "../components/UserInfos";
import { Card, Flex, Skeleton } from "@radix-ui/themes";

export const UserPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User>();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const fetchUser = async () => {
        try {
          const { data } = await userService.getUserById(id!, token);
          setUser(data);
        } catch (error) {
          if (error) navigate("/login");
        }
      };
      fetchUser();
    }
  }, [id, token]);

  if (!token) return <Navigate to={"/login"} />;

  return (
    <section>
      <Flex maxWidth="80rem" mx="auto" direction={"column"} gap={"3"}>
        {user ? (
          <UserInfos user={user} />
        ) : (
          <>
            <Skeleton height={"250px"}>
              <Card></Card>
            </Skeleton>
            <Skeleton height={"700px"}>
              <Card></Card>
            </Skeleton>
          </>
        )}
      </Flex>
    </section>
  );
};
