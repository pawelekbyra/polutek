"use client";

import { useEffect, useState } from 'react';
import { useUser } from '@/context/UserContext';
import NotificationPopup from './NotificationPopup';
import { useTranslation } from '@/context/LanguageContext';
import { useStore } from '@/store/useStore';
import LoginForm from './LoginForm';
import PwaDesktopModal from './PwaDesktopModal';
import {
  Box,
  Flex,
  IconButton,
  Text,
  Avatar,
  useDisclosure,
  Button,
  Collapse,
} from '@chakra-ui/react';
import { HamburgerIcon, BellIcon } from '@chakra-ui/icons';

const TopBar = () => {
  const { user } = useUser();
  const setActiveModal = useStore((state) => state.setActiveModal);
  const { t } = useTranslation();
  const { isOpen: isLoginPanelOpen, onToggle: toggleLoginPanel, onClose: closeLoginPanel } = useDisclosure();
  const { isOpen: showNotifPanel, onToggle: toggleNotifPanel, onClose: closeNotifPanel } = useDisclosure();
  const { isOpen: showPwaModal, onOpen: openPwaModal, onClose: closePwaModal } = useDisclosure();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkIsDesktop = () => setIsDesktop(window.innerWidth >= 768);
    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  const unreadCount = 0; // Replace with real data

  return (
    <>
      <Box
        position="fixed"
        top="0"
        left="0"
        right="0"
        zIndex="60"
        bg="black"
        color="white"
        borderBottom="1px solid"
        borderColor="whiteAlpha.200"
        h="var(--topbar-height)"
        pt="var(--safe-area-top)"
        px="1"
        transform="translateZ(0)"
      >
        <Flex align="center" justify="space-between" h="100%">
          <IconButton
            icon={<HamburgerIcon />}
            variant="ghost"
            aria-label={t('menuAriaLabel')}
            onClick={() => setActiveModal('account')}
          />

          <Text
            flex="1"
            textAlign="center"
            fontWeight="semibold"
            fontSize="lg"
            cursor="pointer"
            onClick={toggleLoginPanel}
          >
            Ting Tong
          </Text>

          <Flex align="center">
            {isDesktop && (
              <Button variant="ghost" size="sm" onClick={openPwaModal} aria-label={t('installPwaAriaLabel')}>
                <Text fontSize="sm" fontWeight="semibold">{t('installAppText')}</Text>
              </Button>
            )}
            <Box position="relative">
              <IconButton
                icon={<BellIcon />}
                variant="ghost"
                aria-label={t('notificationAriaLabel')}
                onClick={toggleNotifPanel}
              />
              {unreadCount > 0 && (
                <Box
                  position="absolute"
                  top="1"
                  right="1"
                  boxSize="2"
                  borderRadius="full"
                  bg="pink.500"
                  ring="2px"
                  ringColor="black"
                />
              )}
              <NotificationPopup
                isOpen={showNotifPanel}
                onClose={closeNotifPanel}
              />
            </Box>
            <IconButton
              variant="ghost"
              aria-label={t('accountMenuButton')}
              onClick={() => setActiveModal('account')}
              icon={
                user?.avatar ? (
                  <Avatar size="sm" src={user.avatar} />
                ) : (
                  <Avatar size="sm" />
                )
              }
            />
          </Flex>
        </Flex>
      </Box>

      <Collapse in={isLoginPanelOpen} animateOpacity>
        <Box
          position="absolute"
          left="0"
          w="full"
          zIndex="50"
          bg="blackAlpha.600"
          backdropFilter="blur(10px)"
          style={{ top: 'var(--topbar-height)' }}
        >
          <LoginForm onLoginSuccess={closeLoginPanel} />
        </Box>
      </Collapse>

      {showPwaModal && <PwaDesktopModal isOpen={showPwaModal} onClose={closePwaModal} />}
    </>
  );
};

export default TopBar;