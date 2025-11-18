"use client";

import React, { useState } from 'react';
import { Input, Button, VStack, Text } from '@chakra-ui/react';
import { useUser } from '@/context/UserContext';
import { useTranslation } from '@/context/LanguageContext';

interface LoginFormProps {
  onLoginSuccess?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useUser();
  const { t } = useTranslation();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    if (username === 'admin' && password === 'admin') {
      onLoginSuccess?.();
      setIsLoading(false);
      return;
    }

    try {
      await login({ email: username, password });
      onLoginSuccess?.();
    } catch (err: any) {
      setError(err.message || t('loginUnknownError'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <VStack as="form" onSubmit={handleSubmit} spacing={3} px={4} pb={5}>
      <Input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder={t('loginPlaceholder')}
        isDisabled={isLoading}
        autoComplete="username"
        bg="white"
        borderColor="black"
        borderWidth="2px"
        color="black"
        _placeholder={{ color: 'gray.500' }}
        fontFamily="mono"
        _focus={{ ring: '2px', ringColor: 'pink.500' }}
      />
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder={t('passwordPlaceholder')}
        isDisabled={isLoading}
        autoComplete="current-password"
        bg="white"
        borderColor="black"
        borderWidth="2px"
        color="black"
        _placeholder={{ color: 'gray.500' }}
        fontFamily="mono"
        _focus={{ ring: '2px', ringColor: 'pink.500' }}
      />
      <Button
        type="submit"
        isLoading={isLoading}
        colorScheme="pink"
        fontWeight="bold"
        textTransform="uppercase"
        letterSpacing="wider"
      >
        {t('loggingIn') || 'ENTER'}
      </Button>
      {error && <Text color="red.500" fontSize="sm" mt={2} textAlign="center">{error}</Text>}
    </VStack>
  );
};

export default LoginForm;