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
  comments: PostComment[];
}

export interface PostComment {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: string;
  owner: {
    name: string;
  };
  likes: {
    name: string;
    id: string;
  }[];
}

export interface SearchPostsResponse {
  posts: Post[];
  meta: {
    page: number;
  };
}
