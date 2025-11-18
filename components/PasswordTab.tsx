"use client";

import React, { useState } from 'react';
import { Input, Button, Box, Heading, Text, VStack, FormControl, FormLabel, FormHelperText, Alert, AlertIcon } from '@chakra-ui/react';
import { useTranslation } from '@/context/LanguageContext';

const PasswordTab: React.FC = () => {
  const { t } = useTranslation();
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handlePasswordSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSaving(true);
    setStatus(null);

    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('/api/password/change', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        setStatus({ type: 'success', message: result.message || t('passwordChangeSuccess') });
        (event.target as HTMLFormElement).reset();
      } else {
        throw new Error(result.message || t('passwordChangeError'));
      }
    } catch (error: any) {
      setStatus({ type: 'error', message: error.message });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Box p={4}>
      <Box bg="whiteAlpha.50" borderWidth="1px" borderColor="whiteAlpha.10" borderRadius="xl" p={5}>
        <Heading size="md" mb={5}>{t('changePasswordTitle')}</Heading>
        <VStack as="form" onSubmit={handlePasswordSubmit} spacing={4}>
          <FormControl isRequired>
            <FormLabel fontSize="sm">{t('currentPasswordLabel')}</FormLabel>
            <Input type="password" name="currentPassword" placeholder={t('currentPasswordPlaceholder')} autoComplete="current-password" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel fontSize="sm">{t('newPasswordLabel')}</FormLabel>
            <Input type="password" name="newPassword" placeholder={t('newPasswordPlaceholder')} autoComplete="new-password" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel fontSize="sm">{t('confirmPasswordLabel')}</FormLabel>
            <Input type="password" name="confirmPassword" placeholder={t('confirmPasswordPlaceholder')} autoComplete="new-password" />
            <FormHelperText fontSize="xs" color="whiteAlpha.600">{t('passwordMinLength')}</FormHelperText>
          </FormControl>
          <Button type="submit" colorScheme="pink" w="full" isLoading={isSaving}>
            {t('changePasswordButton')}
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

export default PasswordTab;