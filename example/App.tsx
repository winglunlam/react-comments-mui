import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CommentSection } from '../src';

const theme = createTheme();

const App = () => {
  const [comments, setComments] = useState([
    {
      id: '1',
      username: 'Alan Lam',
      avatarUrl: 'https://ui-avatars.com/api/name=Alan&background=FFFF00',
      timestamp: '2 hours ago',
      text: 'Great video!',
      likes: 5,
      dislikes: 1,
      currentUserLiked: false,
      currentUserDisliked: false,
      replies: [
        {
          id: '2',
          username: 'Yasmine',
          avatarUrl: 'https://ui-avatars.com/api/name=Yasmine&background=00FF00',
          timestamp: 'Just now',
          text: 'Thanks for the comment! 🎉',
          likes: 0,
          dislikes: 0,
          currentUserLiked: false,
          currentUserDisliked: false,
          replies: [],
        },
        {
          id: '3',
          username: 'Yasmine',
          avatarUrl: 'https://ui-avatars.com/api/name=Yasmine&background=00FF00',
          timestamp: 'Just now',
          text: 'Great! 🎉',
          likes: 0,
          dislikes: 0,
          currentUserLiked: false,
          currentUserDisliked: false,
          replies: [],
        }
      ],
    },
  ]);

  const handleSubmit = (newComment: { text: string }, parentId?: string) => {
    const comment = {
      id: Date.now().toString(),
      username: 'Yasmine',
      avatarUrl: 'https://ui-avatars.com/api/name=Yasmine&background=00FF00',
      timestamp: 'Just now',
      text: newComment.text,
      likes: 0,
      dislikes: 0,
      currentUserLiked: false,
      currentUserDisliked: false,
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

  const handleDislike = (id: string) => {
    const toggleDislike = (comments: any[]): any[] =>
      comments.map((c) => ({
        ...c,
        dislikes: c.id === id ? (c.currentUserDisliked ? c.dislikes - 1 : c.dislikes + 1) : c.dislikes,
        currentUserDisliked: c.id === id ? !c.currentUserDisliked : c.currentUserDisliked,
        replies: toggleDislike(c.replies),
      }));
    setComments(toggleDislike(comments));
  };

  return (
    <ThemeProvider theme={theme}>
      <CommentSection
        comments={comments}
        onSubmit={handleSubmit}
        onLike={handleLike}
        onDislike={handleDislike}
        currentUser={{ username: 'Yasmine', avatarUrl: 'https://ui-avatars.com/api/name=Yasmine&background=00FF00' }}
        hasMore={false}
      />
    </ThemeProvider>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);