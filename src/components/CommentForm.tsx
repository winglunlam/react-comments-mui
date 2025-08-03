import React, { useState, useEffect, useContext, useRef } from 'react';
import { TextField, Typography, IconButton } from '@mui/material';
import { Send, SentimentSatisfied } from '@mui/icons-material';
import { CommentContext } from '../context/CommentContext';
import Picker from 'emoji-picker-react';
import { styled } from '@mui/system';

const FormContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginTop: theme.spacing(2),
}));

const AvatarStyled = styled('div')(({ theme }) => ({
  marginRight: theme.spacing(1),
}));

const PickerContainer = styled('div')(({ theme }) => ({
  position: 'absolute',
  zIndex: 1,
  left: 0,
  top: '50px'
}));

interface CommentFormProps {
  onSubmit?: (newComment: { text: string }) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit: parentOnSubmit }) => {
  const { onSubmit, currentUser } = useContext(CommentContext);
  const [text, setText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const pickerIconRef = useRef<HTMLInputElement>(null);
  const pickerContainerRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    const submitFunction = parentOnSubmit || onSubmit;
    submitFunction({ text });
    setText('');
  };

  const onEmojiClick = (emojiData: any, event: MouseEvent) => {
    const cursor = inputRef.current?.selectionStart || 0;
    const newText = text.slice(0, cursor) + emojiData.emoji + text.slice(cursor);
    setText(newText);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleClickOutside = (event: any) => {
    if (
      (pickerIconRef.current && !pickerIconRef.current.contains(event.target)) &&
      (pickerContainerRef.current && !pickerContainerRef.current.contains(event.target)) && 
      (inputRef.current && !inputRef.current.contains(event.target))
    ) {
      setShowEmojiPicker(false);
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
      <div ref={pickerIconRef}>
        <IconButton
          color="primary"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          aria-label="emoji"
        >
          <SentimentSatisfied />
        </IconButton>
      </div>
      {showEmojiPicker && (
        <PickerContainer ref={pickerContainerRef}>
          <Picker onEmojiClick={onEmojiClick} />
        </PickerContainer>
      )}
    </FormContainer>
  );
};

export default CommentForm;