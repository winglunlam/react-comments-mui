/// <reference types="react" />
import { User } from '../types';
interface CommentContextType {
    onSubmit: (newComment: {
        text: string;
    }, parentId?: string) => void;
    onLike: (commentId: string) => void;
    currentUser: User | null;
}
export declare const CommentContext: import("react").Context<CommentContextType>;
export {};
