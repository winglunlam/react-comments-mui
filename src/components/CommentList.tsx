import React, { useState, useEffect, useRef, useCallback } from 'react';
import Comment from './Comment';
import { Comment as CommentType } from '../types';
import { styled } from '@mui/system';

interface CommentListProps {
  comments: CommentType[];
  parentAvatarUrl?: string;
  showReplyForm?: boolean;
  isReply?: boolean;
  parentContainerRef?: React.RefObject<HTMLDivElement>;
  parentAvatarWrapperRef?: React.RefObject<HTMLDivElement>;
  parentAvatarRef?: React.RefObject<HTMLDivElement>;
}

const ReplyList = styled('div')(({ theme }) => ({
  position: 'relative',
}));

const CommentList: React.FC<CommentListProps> = ({ 
  comments,
  parentAvatarUrl,
  showReplyForm,
  isReply,
  parentContainerRef,
  parentAvatarWrapperRef,
  parentAvatarRef,
}) => {
  const listRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const resizeObserver = useRef<ResizeObserver | null>(null);
  const [replyRefs, setReplyRefs] = useState<React.RefObject<HTMLDivElement>[]>([]);

  const handleSetReplyRef = useCallback((ref: React.RefObject<HTMLDivElement>) => {
    if (ref) {
      setReplyRefs((prevRefs) => {
        const newRefs = [...prevRefs];
        const index = newRefs.findIndex((newRef) => newRef === ref);
        if (index >= 0) {
          newRefs[index] = ref;
        } else {
          newRefs.push(ref);
        }
        return newRefs;
      });
    }
  }, [comments]);

  const drawPaths = () => {
    const parentContainer = parentContainerRef?.current;
    const parentAvatarWrapper = parentAvatarWrapperRef?.current;
    const parentAvatar = parentAvatarRef?.current;
    
    if (listRef.current && parentContainer && parentAvatarWrapper && parentAvatar) {
      const parentRect = parentAvatar.getBoundingClientRect();
      const parentContainerRect = parentContainer.getBoundingClientRect();
      const startX = parentRect.left + parentRect.width / 2 - parentContainerRect.left; // Center of parent avatar
      const startY = parentRect.bottom - parentContainerRect.top; // Bottom of parent avatar
  
      const svg = svgRef.current || document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('style', 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none');
  
      const paths = replyRefs.map((ref, index) => {
        const avatarRoot = ref.current;
        if (!avatarRoot || !ref.current || !listRef.current) return null;
  
        const avatarRect = avatarRoot.getBoundingClientRect();
        const endX = avatarRect.left - parentContainerRect.left; // Left edge of replier avatar
        const endY = avatarRect.top + avatarRect.height / 2 - parentContainerRect.top; // Midpoint of replier avatar
  
        const controlX1 = startX;
        const controlY1 = endY - 10;

        const arcEndX = startX + 10;
        const arcEndY = endY;
  
        const rx = 10;
        const ry = 10;
  
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', `M ${startX},${startY} L ${controlX1},${controlY1} A ${rx} ${ry} 0 0 0 ${arcEndX},${arcEndY} L ${endX},${endY}`);
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', '#B0B0B0');
        path.setAttribute('stroke-width', '2');
        return path;
      }).filter((path) => path !== null) as SVGPathElement[];
  
      // Clear existing paths and append new ones
      while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
      }

      if (paths.length > 0) {
        paths.forEach((path) => svg.appendChild(path));
        if (!svgRef.current) {
          parentAvatarWrapper.appendChild(svg);
          svgRef.current = svg;
        }
      } else if (svgRef.current) {
        parentAvatarWrapper.removeChild(svg);
        svgRef.current = null;
      }
    }
  };

  useEffect(() => {
    const parentAvatarWrapper = parentAvatarWrapperRef?.current;

    if (listRef.current && comments.length > 0) {
      drawPaths();

      resizeObserver.current = new ResizeObserver(() => {
        drawPaths();
      });

      if (listRef.current) {
        resizeObserver.current.observe(listRef.current);
      }

      return () => {
        if (resizeObserver.current && listRef.current) {
          resizeObserver.current.unobserve(listRef.current);
        }
        if (parentAvatarWrapper && svgRef.current) {
          parentAvatarWrapper.removeChild(svgRef.current);
          svgRef.current = null;
        }
      };
    }
  }, [comments, parentAvatarUrl, showReplyForm, replyRefs]);

  return (
    <ReplyList ref={listRef} className="ReplyList">
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          isReply={isReply}
          setReplyRef={handleSetReplyRef}
        />
      ))}
    </ReplyList>
  );
};

export default CommentList;