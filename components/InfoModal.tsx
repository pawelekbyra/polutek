"use client";

import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  VStack,
  Box,
  Button,
  Icon,
} from '@chakra-ui/react';
import { FaCoffee } from 'react-icons/fa';
import { useTranslation } from '@/context/LanguageContext';
import { useUser } from '@/context/UserContext';
import { useToast } from '@/context/ToastContext';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const { login } = useUser();
  const { addToast } = useToast();

  const handleShowTipJar = async () => {
    const bmcButton = document.querySelector('#bmc-wbtn') as HTMLElement;
    if (bmcButton) {
      bmcButton.click();
    }
    setTimeout(async () => {
      const mockEmail = 'patron@example.com';
      const mockPassword = 'password123';
      try {
        const res = await fetch('/api/create-patron', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: mockEmail, password: mockPassword }),
        });
        const data = await res.json();
        if (data.success) {
          addToast(`Twoje konto zostało utworzone! Login: ${mockEmail}`, 'success');
          await login({ email: mockEmail, password: mockPassword });
          onClose();
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        console.error('Błąd tworzenia konta po wpłacie:', error);
        addToast('Wystąpił błąd podczas tworzenia konta.', 'error');
        onClose();
      }
    }, 3000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay bg="blackAlpha.700" />
      <ModalContent
        bg="blackAlpha.800"
        backdropFilter="blur(10px)"
        color="white"
        borderRadius="xl"
        borderWidth="1px"
        borderColor="whiteAlpha.200"
        maxW="md"
        maxH="80vh"
      >
        <ModalHeader borderBottomWidth="1px" borderColor="whiteAlpha.200">
          {t('infoModalTitle') || 'Information'}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody overflowY="auto" p={6}>
          <VStack spacing={4} fontSize="sm" color="whiteAlpha.800">
            <Text>{t('infoModalBodyP1') || 'Lorem ipsum dolor sit amet...'}</Text>
            <Text>{t('infoModalBodyP2') || 'Ut in nulla enim...'}</Text>
            <Box
              bg="whiteAlpha.50"
              borderWidth="1px"
              borderColor="whiteAlpha.10"
              borderRadius="lg"
              p={4}
              textAlign="center"
              w="full"
            >
              <Icon as={FaCoffee} w={10} h={10} color="pink.500" mb={2} />
              <Text>{t('infoModalBodyTip') || 'Enjoying the app? Leave a tip...'}</Text>
              <Button
                mt={3}
                colorScheme="pink"
                onClick={handleShowTipJar}
              >
                {t('tipText') || 'Tip'}
              </Button>
            </Box>
            <Text>{t('infoModalBodyP3') || 'Donec id elit non mi porta...'}</Text>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default InfoModal;