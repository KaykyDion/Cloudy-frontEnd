export interface Post {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  ownerId: string;
  owner: {
    name: string;
    email: string;
  };
  likes: { id: string; name: string }[];
  comments: { id: string; name: string }[];
}

export interface SearchPostsResponse {
  posts: Post[];
  meta: {
    page: number;
  };
}
