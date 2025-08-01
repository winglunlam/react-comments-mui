import React from 'react';
import { Button } from '@mui/material';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import { CommentContext } from '../context/CommentContext';
import { Comment, User } from '../types';
import { styled } from '@mui/system';

const CommentSectionContainer = styled('div')(({ theme }) => ({
  maxWidth: '800px',
  margin: 'auto',
  padding: theme.spacing(2),
  backgroundColor: '#f9f9f9',
}));

const LoadMoreButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(2, 0),
}));

interface CommentSectionProps {
  comments: Comment[];
  onSubmit: (newComment: { text: string }, parentId?: string) => void;
  onLike: (commentId: string) => void;
  onDislike: (commentId: string) => void;
  currentUser: User | null;
  loadMore?: () => void;
  hasMore?: boolean;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  comments,
  onSubmit,
  onLike,
  onDislike,
  currentUser,
  loadMore,
  hasMore,
}) => {
  return (
    <CommentContext.Provider value={{ onSubmit, onLike, onDislike, currentUser }}>
      <CommentSectionContainer>
        <CommentList comments={comments} />
        {hasMore && <LoadMoreButton onClick={loadMore}>Show more</LoadMoreButton>}
        <CommentForm />
      </CommentSectionContainer>
    </CommentContext.Provider>
  );
};

export default CommentSection;