export interface Comment {
  id: string;
  username: string;
  avatarUrl?: string;
  timestamp: Date;
  text: string;
  likes: number;
  dislikes: number;
  currentUserLiked: boolean;
  currentUserDisliked: boolean;
  replies: Comment[];
}

export interface User {
  username: string;
  avatarUrl?: string;
}