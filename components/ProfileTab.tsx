"use client";

import React, { useState, useRef } from 'react';
import {
  Box,
  Button,
  VStack,
  HStack,
  Text,
  Heading,
  Avatar,
  FormControl,
  FormLabel,
  Input,
  Grid,
  GridItem,
  Switch,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import CropModal from './CropModal';
import { FaCrown } from 'react-icons/fa';
import { useUser } from '@/context/UserContext';
import { useTranslation } from '@/context/LanguageContext';
import { useToast } from '@/context/ToastContext';
import { uploadAvatar } from '@/lib/actions';

interface ProfileTabProps {
    onClose: () => void;
}

const ProfileTab: React.FC<ProfileTabProps> = ({ onClose }) => {
  const { user: profile, checkUserStatus, logout } = useUser();
  const { t, setLanguage, lang } = useTranslation();
  const { addToast } = useToast();
  const [emailConsent, setEmailConsent] = useState(true);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleProfileSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus(null);
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    try {
      const res = await fetch('/api/profile/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || t('profileUpdateError'));
      setStatus({ type: 'success', message: t('profileUpdateSuccess') });
      await checkUserStatus();
    } catch (error: any) {
      setStatus({ type: 'error', message: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAvatarEditClick = () => fileInputRef.current?.click();
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageToCrop(e.target?.result as string);
      setIsCropModalOpen(true);
    };
    reader.readAsDataURL(file);
    event.target.value = '';
  };

  const handleCropComplete = async (avatarBlob: Blob | null) => {
    if (!avatarBlob) {
      setIsCropModalOpen(false);
      setImageToCrop(null);
      return;
    }
    const formData = new FormData();
    formData.append('avatar', avatarBlob, 'avatar.png');
    setStatus(null);
    try {
      const result = await uploadAvatar(formData);
      if (!result.success) throw new Error(result.message || t('avatarUploadError'));
      setStatus({ type: 'success', message: t('avatarUploadSuccess') });
      await checkUserStatus();
    } catch (error: any) {
      setStatus({ type: 'error', message: error.message });
    } finally {
      setIsCropModalOpen(false);
      setImageToCrop(null);
    }
  };

  const handleLogout = async () => {
    await logout();
    addToast(t('logoutSuccess'), 'success');
    onClose();
  };

  if (!profile) {
    return <Box p={5} textAlign="center">{t('loadingProfile')}</Box>;
  }

  return (
    <>
      <VStack p={4} spacing={4}>
        {status && (
          <Alert status={status.type} borderRadius="md">
            <AlertIcon />
            {status.message}
          </Alert>
        )}
        <Box bg="whiteAlpha.50" borderWidth="1px" borderColor="whiteAlpha.10" borderRadius="xl" p={5} w="full" textAlign="center">
          <VStack spacing={3}>
            <Box position="relative">
              <Avatar size="xl" src={profile.avatar} name={profile.displayName} />
              <Button size="xs" position="absolute" bottom="-2" left="50%" transform="translateX(-50%)" colorScheme="pink" borderRadius="full" onClick={handleAvatarEditClick}>+</Button>
              <Input type="file" ref={fileInputRef} onChange={handleFileSelect} hidden accept="image/png, image/jpeg, image/webp" />
            </Box>
            <VStack spacing={1}>
              <Heading size="lg">{profile.displayName}</Heading>
              <Text fontSize="sm" color="whiteAlpha.600">{profile.email}</Text>
              <HStack bgGradient="linear(to-r, yellow.400, orange.400)" color="black" px={3} py={1} borderRadius="full" fontSize="xs" fontWeight="bold" mt={1}>
                <FaCrown />
                <Text>{t('patronTier')}</Text>
              </HStack>
            </VStack>
          </VStack>
        </Box>
        <Box bg="whiteAlpha.50" borderWidth="1px" borderColor="whiteAlpha.10" borderRadius="xl" p={5} w="full">
          <Heading size="md" mb={5}>{t('personalData')}</Heading>
          <VStack as="form" onSubmit={handleProfileSubmit} spacing={4}>
            <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4} w="full">
              <GridItem>
                <FormControl>
                  <FormLabel fontSize="sm">{t('firstName')}</FormLabel>
                  <Input type="text" name="firstName" defaultValue={profile.displayName?.split(' ')[0] || ''} placeholder={t('firstNamePlaceholder')} isDisabled={isSubmitting} />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl>
                  <FormLabel fontSize="sm">{t('lastName')}</FormLabel>
                  <Input type="text" name="lastName" defaultValue={profile.displayName?.split(' ').slice(1).join(' ') || ''} placeholder={t('lastNamePlaceholder')} isDisabled={isSubmitting} />
                </FormControl>
              </GridItem>
            </Grid>
            <FormControl>
              <FormLabel fontSize="sm">{t('email')}</FormLabel>
              <Input type="email" name="email" defaultValue={profile.email} placeholder={t('emailPlaceholder')} isDisabled={isSubmitting} />
            </FormControl>
            <Button type="submit" colorScheme="pink" w="full" isLoading={isSubmitting}>{t('saveChanges')}</Button>
          </VStack>
        </Box>
        <Box bg="whiteAlpha.50" borderWidth="1px" borderColor="whiteAlpha.10" borderRadius="xl" p={5} w="full">
          <Heading size="md" mb={5}>{t('settings')}</Heading>
          <VStack as="form" onSubmit={(e) => { e.preventDefault(); /* ... */ }} spacing={4}>
            <FormControl display="flex" alignItems="center" justifyContent="space-between">
              <FormLabel htmlFor="email-consent" mb="0">{t('emailConsent')}</FormLabel>
              <Switch id="email-consent" isChecked={emailConsent} onChange={() => setEmailConsent(p => !p)} />
            </FormControl>
            <FormControl>
              <FormLabel fontSize="sm">{t('emailLanguage')}</FormLabel>
              <HStack>
                <Button variant={lang === 'pl' ? 'solid' : 'outline'} colorScheme="pink" onClick={() => setLanguage('pl')} flex="1">{t('polish')}</Button>
                <Button variant={lang === 'en' ? 'solid' : 'outline'} colorScheme="pink" onClick={() => setLanguage('en')} flex="1">{t('english')}</Button>
              </HStack>
            </FormControl>
            <Button type="submit" colorScheme="pink" w="full" isLoading={isSubmitting}>{t('saveSettings')}</Button>
          </VStack>
        </Box>
        <Button onClick={handleLogout} w="full" variant="outline">{t('logoutLink')}</Button>
      </VStack>
      {isCropModalOpen && (
        <CropModal isOpen={isCropModalOpen} onClose={() => setIsCropModalOpen(false)} imageSrc={imageToCrop} onCropComplete={handleCropComplete} />
      )}
    </>
  );
};

export default ProfileTab;