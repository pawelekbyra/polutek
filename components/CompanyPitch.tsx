"use client";

import React, { useState } from 'react';
import { Box, Button, Flex, Heading, Text, VStack, HStack, Avatar } from '@chakra-ui/react';

const CompanyPitch: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'about' | 'mission' | 'team' | null>(null);

  const renderContent = () => {
    switch (activeSection) {
      case 'about':
        return (
          <VStack spacing={2} p={4} textAlign="center">
            <Heading size="lg">Who We Are?</Heading>
            <Text>We are innovators, creators, and dreamers. Our goal is to revolutionize the digital space with cutting-edge solutions that inspire and engage.</Text>
          </VStack>
        );
      case 'mission':
        return (
          <VStack spacing={4} p={4} textAlign="center">
            <Heading size="lg">Our Mission</Heading>
            <Text>Our mission is to build a connected world where technology serves humanity. We strive to create intuitive and powerful tools for everyone.</Text>
            <Flex w="full" h="64" bg="black" mt={4} align="center" justify="center">
              <Text color="white">Company Story Video</Text>
            </Flex>
          </VStack>
        );
      case 'team':
        return (
          <VStack spacing={4} p={4} textAlign="center">
            <Heading size="lg">The Team</Heading>
            <HStack justify="center" gap={4} mt={4}>
              <VStack>
                <Avatar size="xl" />
                <Text>Jules</Text>
              </VStack>
              <VStack>
                <Avatar size="xl" />
                <Text>Alex</Text>
              </VStack>
              <VStack>
                <Avatar size="xl" />
                <Text>Maria</Text>
              </VStack>
            </HStack>
          </VStack>
        );
      default:
        return <Heading size="2xl">Our Company</Heading>;
    }
  };

  return (
    <Flex
      h="full"
      w="full"
      direction="column"
      align="center"
      justify="center"
      bg="gray.800"
      color="white"
      p={8}
      position="relative"
    >
      <HStack position="absolute" top={5} spacing={4}>
        <Button onClick={() => setActiveSection('about')} colorScheme="indigo">Who We Are?</Button>
        <Button onClick={() => setActiveSection('mission')} colorScheme="indigo">Our Mission</Button>
        <Button onClick={() => setActiveSection('team')} colorScheme="indigo">The Team</Button>
      </HStack>
      <Box mt={16}>
        {renderContent()}
      </Box>
    </Flex>
  );
};

export default CompanyPitch;