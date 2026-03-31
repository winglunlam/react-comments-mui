import React from 'react';
interface CommentFormProps {
    onSubmit?: (newComment: {
        text: string;
    }) => void;
}
declare const CommentForm: React.FC<CommentFormProps>;
export default CommentForm;
