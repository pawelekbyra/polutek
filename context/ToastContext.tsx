"use client";

import React, { createContext, useContext, ReactNode } from 'react';
import { useToast as useChakraToast, ToastPosition, UseToastOptions } from '@chakra-ui/react';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastContextType {
  addToast: (message: string, type: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const chakraToast = useChakraToast();

  const addToast = (message: string, type: ToastType) => {
    const options: UseToastOptions = {
      title: message,
      status: type,
      duration: 2000,
      isClosable: true,
      position: 'bottom' as ToastPosition,
    };
    chakraToast(options);
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
    </ToastContext.Provider>
  );
};