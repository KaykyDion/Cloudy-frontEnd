import { Post } from "./Post";

export interface RegisterUserData {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserData {
  name?: string;
  bio?: string;
  profilePhoto?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  bio?: string;
  profilePhoto?: string;
  createdAt: Date;
  updatedAt: Date;
  posts: Post[];
  followers: { follower: { name: string; id: string } }[];
  following: { following: { name: string; id: string } }[];
}
