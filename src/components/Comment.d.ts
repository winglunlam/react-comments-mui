import React from 'react';
import { Comment as CommentType } from '../types';
interface CommentProps {
    comment: CommentType;
    isReply?: boolean;
    setReplyRef?: (ref: React.RefObject<HTMLDivElement>) => void;
}
declare const Comment: React.FC<CommentProps>;
export default Comment;
