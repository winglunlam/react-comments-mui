import React, { useState, useContext, useRef } from 'react';
import { TextField, Typography, IconButton } from '@mui/material';
import { Send, SentimentSatisfied } from '@mui/icons-material';
import { CommentContext } from '../context/CommentContext';
import Picker from 'emoji-picker-react';
import { styled } from '@mui/system';

const FormContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginTop: theme.spacing(2),
}));

const AvatarStyled = styled('div')(({ theme }) => ({
  marginRight: theme.spacing(1),
}));

interface CommentFormProps {
  onSubmit?: (newComment: { text: string }) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit: parentOnSubmit }) => {
  const { onSubmit, currentUser } = useContext(CommentContext);
  const [text, setText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    const submitFunction = parentOnSubmit || onSubmit;
    submitFunction({ text });
    setText('');
  };

  const onEmojiClick = (event: React.MouseEvent, emojiObject: { emoji: string }) => {
    const cursor = inputRef.current?.selectionStart || 0;
    const newText = text.slice(0, cursor) + emojiObject.emoji + text.slice(cursor);
    setText(newText);
    setShowEmojiPicker(false);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  if (!currentUser) {
    return <Typography>Please log in to comment.</Typography>;
  }

  return (
    <FormContainer>
      <AvatarStyled>
        <img src={currentUser.avatarUrl || 'https://via.placeholder.com/32'} alt="User Avatar" style={{ width: '32px', height: '32px', borderRadius: '50%' }} className="reply-avatar-wrapper" />
      </AvatarStyled>
      <TextField
        variant="standard"
        fullWidth
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a comment..."
        inputProps={{ inputMode: 'text' }}
        inputRef={inputRef}
        sx={{
          '& .MuiInput-root': {
            borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
            paddingBottom: '4px',
          },
          '& .MuiInput-input': {
            padding: '8px 0',
          },
        }}
      />
      <IconButton
        color="primary"
        onClick={handleSubmit}
        disabled={!text.trim()}
        aria-label="send"
      >
        <Send />
      </IconButton>
      <IconButton
        color="primary"
        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        aria-label="emoji"
      >
        <SentimentSatisfied />
      </IconButton>
      {showEmojiPicker && (
        <div style={{ position: 'absolute', zIndex: 1, marginTop: '40px' }}>
          {/* <Picker onEmojiClick={onEmojiClick} /> */}
        </div>
      )}
    </FormContainer>
  );
};

export default CommentForm;