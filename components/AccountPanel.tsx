"use client";

import React, { useState, useEffect } from 'react';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerCloseButton,
  DrawerBody,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Box,
} from '@chakra-ui/react';
import { useUser } from '@/context/UserContext';
import ProfileTab from './ProfileTab';
import PasswordTab from './PasswordTab';
import DeleteTab from './DeleteTab';
import { useTranslation } from '@/context/LanguageContext';

interface AccountPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

type Tab = 'profile' | 'password' | 'delete';

const AccountPanel: React.FC<AccountPanelProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const { t } = useTranslation();
  const { user } = useUser();

  useEffect(() => {
    if (!user) {
      onClose();
    }
  }, [user, onClose]);

  const handleTabChange = (index: number) => {
    const tabs: Tab[] = ['profile', 'password', 'delete'];
    setActiveTab(tabs[index]);
  };

  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent bg="gray.900" color="white">
        <DrawerHeader
          borderBottomWidth="1px"
          borderColor="whiteAlpha.200"
          pt="var(--safe-area-top)"
        >
          {t(`${activeTab}Tab`)}
        </DrawerHeader>
        <DrawerCloseButton />
        <DrawerBody p={0}>
          <Tabs isFitted variant="enclosed" onChange={handleTabChange}>
            <TabList>
              <Tab _selected={{ color: 'white', bg: 'pink.500' }}>{t('profileTab')}</Tab>
              <Tab _selected={{ color: 'white', bg: 'pink.500' }}>{t('passwordTab')}</Tab>
              <Tab _selected={{ color: 'white', bg: 'pink.500' }}>{t('deleteTab')}</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <ProfileTab onClose={onClose} />
              </TabPanel>
              <TabPanel>
                <PasswordTab />
              </TabPanel>
              <TabPanel>
                <DeleteTab />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default AccountPanel;