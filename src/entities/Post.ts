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
  comments: {
    id: string;
    content: string;
    owner: {
      name: string;
      email: string;
    };
    _count: {
      likes: number;
    };
  }[];
}

export interface PostComment {
  id: string;
  content: string;
  owner: {
    name: string;
    email: string;
  };
  _count: {
    likes: number;
  };
}

export interface SearchPostsResponse {
  posts: Post[];
  meta: {
    page: number;
  };
}
