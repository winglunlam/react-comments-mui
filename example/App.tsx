import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import { CommentSection, createCommentTheme } from '../src';

// Example 1: Use default theme
// const theme = createCommentTheme();

// Example 2: Customize comment plugin styles
const theme = createCommentTheme({
  reactCommentsMui: {
    containerBackgroundColor: '#ffffff',  // White background instead of light gray
    containerMaxWidth: '1000px',          // Wider container
    avatarSize: 40,                       // Larger avatars
    cardBorderRadius: 12,                 // More rounded cards
  },
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});


const App = () => {
  const currentUser = {
    id: '1',
    username: 'Alan Lam',
    avatarUrl: 'https://ui-avatars.com/api/name=Alan&background=FFFF00'
  }

  const [comments, setComments] = useState([
    {
      id: '1',
      username: 'Alan Lam',
      avatarUrl: 'https://ui-avatars.com/api/name=Alan&background=FFFF00',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      text: 'Great video!',
      likes: 5,
      currentUserLiked: false,
      replies: [
        {
          id: '2',
          username: 'Yasmine',
          avatarUrl: 'https://ui-avatars.com/api/name=Yasmine&background=00FF00',
          timestamp: new Date(Date.now() - 5 * 60 * 1000),
          text: 'Thanks for the comment! 🎉',
          likes: 0,
          currentUserLiked: false,
          replies: [],
        },
        {
          id: '3',
          username: 'Yasmine',
          avatarUrl: 'https://ui-avatars.com/api/name=Yasmine&background=00FF00',
          timestamp: new Date(),
          text: 'Great! 🎉',
          likes: 0,
          currentUserLiked: false,
          replies: [],
        }
      ],
    },
  ]);

  const handleSubmit = (newComment: { text: string }, parentId?: string) => {
    const comment = {
      ...currentUser,
      timestamp: new Date(),
      text: newComment.text,
      likes: 0,
      currentUserLiked: false,
      replies: [],
    };

    if (parentId) {
      const addReply = (comments: any[]): any[] =>
        comments.map((c) => ({
          ...c,
          replies: c.id === parentId ? [...c.replies, comment] : addReply(c.replies),
        }));
      setComments(addReply(comments));
    } else {
      setComments([...comments, comment]);
    }
  };

  const handleLike = (id: string) => {
    const toggleLike = (comments: any[]): any[] =>
      comments.map((c) => ({
        ...c,
        likes: c.id === id ? (c.currentUserLiked ? c.likes - 1 : c.likes + 1) : c.likes,
        currentUserLiked: c.id === id ? !c.currentUserLiked : c.currentUserLiked,
        replies: toggleLike(c.replies),
      }));
    setComments(toggleLike(comments));
  };

  return (
    <ThemeProvider theme={theme}>
      <CommentSection
        comments={comments}
        onSubmit={handleSubmit}
        onLike={handleLike}
        currentUser={{ username: currentUser.username, avatarUrl: currentUser.avatarUrl }}
        hasMore={false}
      />
    </ThemeProvider>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);