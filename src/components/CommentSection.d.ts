import React from 'react';
import { Comment, User } from '../types';
interface CommentSectionProps {
    comments: Comment[];
    onSubmit: (newComment: {
        text: string;
    }, parentId?: string) => void;
    onLike: (commentId: string) => void;
    currentUser: User | null;
    loadMore?: () => void;
    hasMore?: boolean;
}
declare const CommentSection: React.FC<CommentSectionProps>;
export default CommentSection;
