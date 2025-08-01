import React, { useEffect, useRef } from 'react';
import Comment from './Comment';
import { Comment as CommentType } from '../types';
import { styled } from '@mui/system';

interface CommentListProps {
  comments: CommentType[];
  parentAvatarUrl?: string;
  showReplyForm?: boolean;
  isReply?: boolean;
}

const ReplyList = styled('div')(({ theme }) => ({
  position: 'relative',
}));

const CommentList: React.FC<CommentListProps> = ({ comments, parentAvatarUrl, showReplyForm, isReply }) => {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listRef.current && parentAvatarUrl && comments.length > 0) {
      const parentContainer = listRef.current.closest('.comment-container') as HTMLElement;
      const parentAvatarWrapper = parentContainer?.querySelector('.avatar-wrapper') as HTMLElement;
      const parentAvatar = parentContainer?.querySelector('.avatar') as HTMLElement;
      const replyAvatars = listRef.current.querySelectorAll('.reply-avatar-wrapper');
      let formAvatar: HTMLElement | null = null;

      console.log({ parentAvatarWrapper });
      console.log({ parentAvatar });
      console.log({ replyAvatars });

      // Find the comment form avatar if showReplyForm is true
      if (showReplyForm) {
        const formContainer = listRef.current.querySelector('div > div:last-child .reply-avatar-wrapper');
        if (formContainer) formAvatar = formContainer as HTMLElement;
      }

      if (parentAvatarWrapper && (replyAvatars.length > 0 || formAvatar)) {
        const parentAvatarHeight = parentAvatar.offsetHeight;
        // const startX = parentAvatarWrapper.offsetLeft + parentAvatarWrapper.offsetWidth / 2;
        // const startY = (parentAvatarWrapper.offsetTop + parentAvatarWrapper.offsetHeight);
        const parentAvatarX = parentAvatarWrapper.offsetLeft + parentAvatarWrapper.offsetWidth / 2;
        const parentAvatarY = parentAvatarWrapper.offsetTop + parentAvatarWrapper.offsetHeight;

        console.log("parentAvatarWrapper.offset-left: ", parentAvatarWrapper.offsetLeft);
        console.log("parentAvatarWrapper.offset-top: ", parentAvatarWrapper.offsetTop);
        console.log("");
        console.log("parentAvatarWrapper.offset-width: ", parentAvatarWrapper.offsetWidth);
        console.log("parentAvatarWrapper.offset-height: ", parentAvatarWrapper.offsetHeight);
        console.log("");

        const avatars = Array.from(replyAvatars);
        if (formAvatar) avatars.push(formAvatar);

        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('style', 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none');

        const paths = avatars.map((avatar: any, index) => {
          console.log({ avatar });
          // const endX = avatar.offsetLeft; // Left edge of replier avatar
          // const endY = avatar.offsetTop + avatar.offsetHeight / 2; // Midpoint of replier avatar
          // const controlX = startX + (endX - startX) * 0.7; // Adjust control point to curve rightward
          // const controlY = startY + 30 + index * 20; // Increased spacing for clarity

          const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          // path.setAttribute('d', `M${startX},${parentAvatarHeight} L${startX},${startY}`);
          // path.setAttribute('fill', 'none');
          // path.setAttribute('stroke', '#B0B0B0');
          // path.setAttribute('stroke-width', '2');

          // const offsetX = avatar.offsetLeft;
          // const offsetY = avatar.offsetTop;
          // console.log(`offsetX: ${offsetX}, offsetY: ${offsetY}`);

          const rect = avatar.getBoundingClientRect();
          const midX = rect.left;
          const midY = rect.top;
          console.log(`parentAvatar midpoint: (${midX}, ${midY})`);
          // console.log("");

          const startX = parentAvatarX;
          const startY = midY;

          path.setAttribute('d', `M${startX},${startY} L${startX + 100},${startY}`);
          path.setAttribute('fill', 'none');
          path.setAttribute('stroke', '#B0B0B0');
          path.setAttribute('stroke-width', '2');


          // const startX = parentAvatarX;
          // const startY = parentAvatarHeight;

          // const controlX1 = startX;
          // const controlY1 = y;

          // const controlX2 = startX;
          // const controlY2 = y;

          // const endX = x;
          // const endY = y;

          // const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          // path.setAttribute('d', `M ${startX} ${startY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${endX} ${endY}`);
          // path.setAttribute('fill', 'none');
          // path.setAttribute('stroke', '#B0B0B0');
          // path.setAttribute('stroke-width', '2');

          return path;
        });

        paths.forEach((path) => svg.appendChild(path));
        parentAvatarWrapper.appendChild(svg);

        console.log({ svg }); // For debugging

        return () => {
          parentAvatarWrapper?.removeChild(svg);
        };
      }
    }
  }, [comments, parentAvatarUrl, showReplyForm]);

  return (
    <ReplyList ref={listRef} className="ReplyList">
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} isReply={isReply}/>
      ))}
    </ReplyList>
  );
};

export default CommentList;