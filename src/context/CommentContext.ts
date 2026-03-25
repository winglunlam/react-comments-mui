import { createContext } from 'react';
import { User } from '../types';

interface CommentContextType {
  onSubmit: (newComment: { text: string }, parentId?: string) => void;
  onLike: (commentId: string) => void;
  currentUser: User | null;
}

export const CommentContext = createContext<CommentContextType>({
  onSubmit: () => {},
  onLike: () => {},
  currentUser: null,
});