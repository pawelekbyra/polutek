import { useContext } from 'react';
import { CommentSectionContext, CommentSectionContextValues } from '../../context/CommentSectionContext';

export const useCommentSection = (): CommentSectionContextValues => {
  const context = useContext(CommentSectionContext);
  if (!context) {
    throw new Error('useCommentSection must be used within a CommentSectionProvider');
  }
  return context as CommentSectionContextValues;
};
