"use client";

import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
  Flex,
  Avatar,
  Text,
  IconButton,
  Input,
  Button,
  Spinner,
  Center,
  VStack,
  Collapse,
  useDisclosure,
  Icon,
} from '@chakra-ui/react';
import { FaHeart, FaCommentDots, FaPaperPlane } from 'react-icons/fa';
import { useTranslation } from '@/context/LanguageContext';
import { useUser } from '@/context/UserContext';

type Comment = {
  id: string;
  text: string;
  createdAt: string;
  likedBy: string[];
  user: {
    displayName: string;
    avatar: string;
  };
  parentId?: string | null;
  replies?: Comment[];
};

interface CommentItemProps {
  comment: Comment;
  onLike: (id: string) => void;
  onReplySubmit: (parentId: string, text: string) => Promise<void>;
  currentUserId?: string;
  isReply?: boolean;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, onLike, onReplySubmit, currentUserId, isReply = false }) => {
  const { t } = useTranslation();
  const { isOpen, onToggle } = useDisclosure();
  const [replyText, setReplyText] = useState('');
  const { user } = useUser();
  const isLiked = currentUserId ? comment.likedBy.includes(currentUserId) : false;

  const handleLocalReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    await onReplySubmit(comment.id, replyText);
    setReplyText('');
    onToggle();
  };

  return (
    <Box w="full" ml={isReply ? 8 : 0}>
      <Flex align="start" gap="3">
        <Avatar size="sm" src={comment.user.avatar} name={comment.user.displayName} mt="1" />
        <VStack align="start" spacing={1} flex="1">
          <Text fontSize="xs" fontWeight="bold" color="whiteAlpha.800">{comment.user.displayName}</Text>
          <Text fontSize="sm" color="white">{comment.text}</Text>
          <Flex align="center" gap="4" fontSize="xs" color="whiteAlpha.600">
            <Button
              variant="ghost"
              size="xs"
              leftIcon={<Icon as={FaHeart} color={isLiked ? 'red.500' : 'inherit'} />}
              onClick={() => onLike(comment.id)}
            >
              {comment.likedBy.length > 0 && comment.likedBy.length}
            </Button>
            {!isReply && (
              <Button variant="ghost" size="xs" leftIcon={<FaCommentDots />} onClick={onToggle}>
                {t('reply')}
              </Button>
            )}
          </Flex>
          <Collapse in={isOpen} animateOpacity>
            {user && (
              <Flex as="form" onSubmit={handleLocalReplySubmit} align="center" gap="2" mt="2" w="full">
                <Avatar size="xs" src={user.avatar || ''} name={user.displayName || user.username} />
                <Input
                  size="xs"
                  variant="filled"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={t('addCommentPlaceholder')}
                  _focus={{ bg: 'whiteAlpha.200' }}
                  autoFocus
                />
                <IconButton
                  type="submit"
                  aria-label="Send reply"
                  icon={<FaPaperPlane />}
                  size="xs"
                  colorScheme="pink"
                  isDisabled={!replyText.trim()}
                />
              </Flex>
            )}
          </Collapse>
          <VStack align="start" spacing="3" mt="2">
            {comment.replies?.map(reply => (
              <CommentItem
                key={reply.id}
                comment={reply}
                onLike={onLike}
                onReplySubmit={onReplySubmit}
                currentUserId={currentUserId}
                isReply={true}
              />
            ))}
          </VStack>
        </VStack>
      </Flex>
    </Box>
  );
};

interface CommentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  slideId?: string;
  initialCommentsCount: number;
}

const CommentsModal: React.FC<CommentsModalProps> = ({ isOpen, onClose, slideId, initialCommentsCount }) => {
  const { t } = useTranslation();
  const { user } = useUser();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen && slideId) {
      setIsLoading(true);
      setError(null);
      fetch(`/api/comments?slideId=${slideId}`)
        .then(res => res.ok ? res.json() : Promise.reject('Failed to fetch comments'))
        .then(data => data.success ? setComments(data.comments) : Promise.reject(data.message || 'Failed to fetch comments'))
        .catch(err => setError(err.message))
        .finally(() => setIsLoading(false));
    }
  }, [isOpen, slideId]);

    const handleLike = async (commentId: string) => {
    if (!user) return;
    const originalComments = JSON.parse(JSON.stringify(comments));
    const toggleLike = (comment: Comment): Comment => {
        if(comment.id === commentId) {
            const isLiked = comment.likedBy.includes(user.id);
            const newLikedBy = isLiked ? comment.likedBy.filter(id => id !== user.id) : [...comment.likedBy, user.id];
            return {...comment, likedBy: newLikedBy};
        }
        if(comment.replies) {
            return {...comment, replies: comment.replies.map(toggleLike)};
        }
        return comment;
    }
    setComments(comments.map(toggleLike));
    try {
      const res = await fetch(`/api/comments/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ commentId }),
      });
      if (!res.ok) setComments(originalComments);
    } catch (error) {
      setComments(originalComments);
    }
  };

  const addCommentOptimistically = (newComment: Comment) => {
    if (newComment.parentId) {
      setComments(prev => {
        const addReply = (comment: Comment): Comment => {
          if (comment.id === newComment.parentId) {
            return { ...comment, replies: [newComment, ...(comment.replies || [])] };
          }
          if (comment.replies) {
            return { ...comment, replies: comment.replies.map(addReply) };
          }
          return comment;
        };
        return prev.map(addReply);
      });
    } else {
      setComments(prev => [newComment, ...prev]);
    }
  };

    const removeCommentOptimistically = (commentId: string) => {
        const filterReplies = (comments: Comment[]): Comment[] => {
            return comments.filter(c => c.id !== commentId).map(c => ({
                ...c,
                replies: c.replies ? filterReplies(c.replies) : []
            }));
        };
        setComments(filterReplies);
    };

    const replaceTempComment = (tempId: string, realComment: Comment) => {
        const replaceInReplies = (comments: Comment[]): Comment[] => {
            return comments.map(c => {
                if (c.id === tempId) return realComment;
                return {
                    ...c,
                    replies: c.replies ? replaceInReplies(c.replies) : []
                };
            });
        };
        setComments(replaceInReplies);
    };


  const handleReplySubmit = async (parentId: string, text: string) => {
    if (!text.trim() || !user || !slideId) return;
    const tempId = `temp-${Date.now()}`;
    addCommentOptimistically({
      id: tempId, text, createdAt: new Date().toISOString(), likedBy: [],
      user: { displayName: user.displayName || user.username, avatar: user.avatar || '' }, parentId,
    });
    try {
      const res = await fetch('/api/comments', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slideId, text, parentId }),
      });
      if (!res.ok) throw new Error('Failed to post reply');
      const data = await res.json();
      replaceTempComment(tempId, data.comment);
    } catch (err: any) {
      setError(err.message);
      removeCommentOptimistically(tempId);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedComment = newComment.trim();
    if (!trimmedComment || !user || !slideId) return;
    setIsSubmitting(true);
    setError(null);
    setNewComment('');
    const tempId = `temp-${Date.now()}`;
    addCommentOptimistically({
      id: tempId, text: trimmedComment, createdAt: new Date().toISOString(), likedBy: [],
      user: { displayName: user.displayName || user.username, avatar: user.avatar || '' }, parentId: null,
    });
    try {
      const res = await fetch('/api/comments', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slideId, text: trimmedComment }),
      });
      if (!res.ok) throw new Error('Failed to post comment');
      const data = await res.json();
      replaceTempComment(tempId, data.comment);
    } catch (err: any) {
      setError(err.message);
      removeCommentOptimistically(tempId);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderContent = () => {
    if (isLoading) return <Center flex="1"><Spinner color="whiteAlpha.400" /></Center>;
    if (error) return <Center flex="1" color="red.400" p="4">{error}</Center>;
    if (comments.length === 0) return <Center flex="1" color="whiteAlpha.600" p="4">{t('noCommentsYet')}</Center>;
    return (
      <VStack spacing={4} p={4} overflowY="auto" flex="1">
        {comments.map(comment => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onLike={handleLike}
            onReplySubmit={handleReplySubmit}
            currentUserId={user?.id}
          />
        ))}
      </VStack>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full" motionPreset="slideInBottom">
      <ModalOverlay bg="blackAlpha.600" />
      <ModalContent bg="blackAlpha.800" backdropFilter="blur(10px)" roundedTop="2xl" mt="auto" mb="0" h="75dvh">
        <ModalHeader textAlign="center" color="white" borderBottomWidth="1px" borderColor="whiteAlpha.200">
          {t('commentsTitle', { count: (comments.length || initialCommentsCount).toString() })}
        </ModalHeader>
        <ModalCloseButton color="whiteAlpha.600" _hover={{ color: 'white' }} />
        <ModalBody p={0} display="flex" flexDirection="column">
          {renderContent()}
        </ModalBody>
        {user && (
          <ModalFooter borderTopWidth="1px" borderColor="whiteAlpha.200" bg="blackAlpha.500">
            <Flex as="form" onSubmit={handleSubmit} w="full" align="center" gap="2">
              <Avatar size="sm" src={user.avatar || ''} name={user.displayName || user.username} />
              <Input
                variant="filled"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder={t('addCommentPlaceholder')}
                _focus={{ bg: 'whiteAlpha.200' }}
                isDisabled={isSubmitting}
              />
              <IconButton
                type="submit"
                aria-label="Send comment"
                icon={<FaPaperPlane />}
                colorScheme="pink"
                isLoading={isSubmitting}
                isDisabled={!newComment.trim()}
              />
            </Flex>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CommentsModal;