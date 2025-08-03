import React, { useState, useContext, useEffect, useRef } from 'react';
import { Avatar, Button, IconButton, Typography, Paper } from '@mui/material';
import { ThumbUp, Reply } from '@mui/icons-material';
import { CommentContext } from '../context/CommentContext';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import { Comment as CommentType } from '../types';
import { styled } from '@mui/system';

const CommentContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  marginBottom: theme.spacing(2),
  alignItems: 'stretch', // Ensure items stretch to full height
  position: 'relative',
  minHeight: 0, // Allow flex items to stretch properly
}));

const AvatarWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  marginRight: theme.spacing(1.5),
}));

const AvatarStyled = styled(Avatar)(({ theme }) => ({
  width: 32,
  height: 32,
}));

const CommentCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  borderRadius: 8,
  backgroundColor: theme.palette.background.paper,
  flexGrow: 1,
}));

const Actions = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: theme.spacing(1),
  gap: theme.spacing(1),
}));

interface CommentProps {
  comment: CommentType;
  isReply?: boolean;
  setReplyRef?: (ref: React.RefObject<HTMLDivElement>) => void;
}

const Comment: React.FC<CommentProps> = ({ 
  comment,
  isReply = false,
  setReplyRef = () => {},
}) => {
  const { onSubmit, onLike, currentUser } = useContext(CommentContext);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  const parentContainerRef = useRef<React.RefObject<HTMLDivElement>>(null) as any;
  const avatarWrapperRef = useRef<React.RefObject<HTMLDivElement>>(null) as any;
  const avatarRef = useRef<React.RefObject<HTMLDivElement>>(null) as any;

  useEffect(() => {
    if (isReply && setReplyRef && avatarRef.current) {
      setReplyRef(avatarRef);
    }
  }, [isReply, setReplyRef]);

  const handleReplySubmit = (newComment: { text: string }) => {
    onSubmit(newComment, comment.id);
    setShowReplyForm(false);
  };

  return (
    <CommentContainer ref={parentContainerRef} className="comment-container">
      <AvatarWrapper ref={avatarWrapperRef} className={isReply ? 'reply-avatar-wrapper' : 'avatar-wrapper'}>
        <AvatarStyled ref={avatarRef} src={comment.avatarUrl} className='avatar'/>
      </AvatarWrapper>
      <div>
        <CommentCard>
          <Typography variant="subtitle1" fontWeight="bold">
            {comment.username}
          </Typography>
          <Typography variant="body2">
            {comment.text}
          </Typography>
        </CommentCard>
        <Actions>
          <Typography variant="caption" color="text.secondary">
            {comment.timestamp}
          </Typography>
          <IconButton onClick={() => onLike(comment.id)} disabled={!currentUser} aria-label="like">
            <ThumbUp color={comment.currentUserLiked ? 'primary' : 'inherit'} />
          </IconButton>
          <Typography variant="body2">{comment.likes}</Typography>
          <IconButton onClick={() => setShowReplyForm(!showReplyForm)} disabled={!currentUser}>
            <Reply />
          </IconButton>
        </Actions>
        {showReplyForm && <CommentForm onSubmit={handleReplySubmit} />}
        {comment.replies && comment.replies.length > 0 && (
          <React.Fragment>
            <Button onClick={() => setShowReplies(!showReplies)}>
              {showReplies ? 'Hide replies' : `View ${comment.replies.length} replies`}
            </Button>
            {showReplies && 
              <CommentList
                comments={comment.replies}
                parentAvatarUrl={comment.avatarUrl}
                showReplyForm={showReplyForm}
                isReply={true}
                parentContainerRef={parentContainerRef}
                parentAvatarWrapperRef={avatarWrapperRef}
                parentAvatarRef={avatarRef}
              />}
          </React.Fragment>
        )}
      </div>
    </CommentContainer>
  );
};

export default Comment;