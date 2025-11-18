"use client";

import React, { useState } from 'react';
import { Input, Button, Box, Heading, Text, VStack, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';
import { useUser } from '@/context/UserContext';
import { useTranslation } from '@/context/LanguageContext';

const DeleteTab: React.FC = () => {
  const { t } = useTranslation();
  const DELETE_CONFIRM_TEXT = t('deleteAccountConfirmText');

  const [confirmation, setConfirmation] = useState('');
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const { logout } = useUser();

  const handleDeleteSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (confirmation !== DELETE_CONFIRM_TEXT) {
      setStatus({ type: 'error', message: t('deleteAccountConfirmError') });
      return;
    }

    setIsSaving(true);
    setStatus(null);

    try {
      const res = await fetch('/api/account/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ confirm_text: confirmation }),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        setStatus({ type: 'success', message: result.message });
        setTimeout(() => {
          logout();
        }, 2000);
      } else {
        throw new Error(result.message || t('deleteAccountError'));
      }
    } catch (error: any) {
      setStatus({ type: 'error', message: error.message });
      setIsSaving(false);
    }
  };

  return (
    <Box p={4}>
      <Box bg="whiteAlpha.50" borderWidth="1px" borderColor="whiteAlpha.10" borderRadius="xl" p={5}>
        <Heading size="md" mb={5}>{t('deleteAccountTitle')}</Heading>
        <Alert status="error" borderRadius="lg" mb={6}>
          <AlertIcon />
          <Box>
            <AlertTitle color="red.400">{t('warningTitle')}</AlertTitle>
            <AlertDescription color="whiteAlpha.800">{t('deleteAccountWarning')}</AlertDescription>
          </Box>
        </Alert>
        <VStack as="form" onSubmit={handleDeleteSubmit} spacing={4}>
          <Box w="full">
            <Text as="label" htmlFor="deleteConfirmation" fontSize="sm" fontWeight="medium" mb={2} display="block">
              {t('deleteAccountPrompt')} <strong>{DELETE_CONFIRM_TEXT}</strong>
            </Text>
            <Input
              id="deleteConfirmation"
              type="text"
              placeholder={DELETE_CONFIRM_TEXT}
              value={confirmation}
              onChange={(e) => setConfirmation(e.target.value)}
            />
            <Text fontSize="xs" color="whiteAlpha.600" mt={2}>{t('deleteAccountInfo')}</Text>
          </Box>
          <Button
            type="submit"
            colorScheme="red"
            w="full"
            mt={4}
            isLoading={isSaving}
            isDisabled={confirmation !== DELETE_CONFIRM_TEXT}
          >
            {t('deleteAccountButton')}
          </Button>
          {status && (
            <Alert status={status.type} mt={4} borderRadius="md">
              <AlertIcon />
              {status.message}
            </Alert>
          )}
        </VStack>
      </Box>
    </Box>
  );
};

export default DeleteTab;