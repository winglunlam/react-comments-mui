import React from 'react';
import { Comment as CommentType } from '../types';
interface CommentListProps {
    comments: CommentType[];
    parentAvatarUrl?: string;
    showReplyForm?: boolean;
    isReply?: boolean;
    parentContainerRef?: React.RefObject<HTMLDivElement>;
    parentAvatarWrapperRef?: React.RefObject<HTMLDivElement>;
    parentAvatarRef?: React.RefObject<HTMLDivElement>;
}
declare const CommentList: React.FC<CommentListProps>;
export default CommentList;
