export interface Comment {
  id: string;
  username: string;
  avatarUrl?: string;
  timestamp: Date;
  text: string;
  likes: number;
  currentUserLiked: boolean;
  replies: Comment[];
}

export interface User {
  username: string;
  avatarUrl?: string;
}