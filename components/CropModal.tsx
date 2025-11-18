"use client";

import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  IconButton,
  HStack,
  Box,
} from '@chakra-ui/react';
import { FaCheck } from 'react-icons/fa';
import { FaMagnifyingGlassPlus, FaMagnifyingGlassMinus } from "react-icons/fa6";
import { useTranslation } from '@/context/LanguageContext';

interface CropModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string | null;
  onCropComplete: (blob: Blob | null) => void;
}

const CROP_AREA_SIZE = 200;

const CropModal: React.FC<CropModalProps> = ({ isOpen, onClose, imageSrc, onCropComplete }) => {
  const { t } = useTranslation();
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const imageRef = React.useRef<HTMLImageElement>(new Image());
  const [scale, setScale] = React.useState(1);
  const [offset, setOffset] = React.useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const lastMousePos = React.useRef({ x: 0, y: 0 });

  React.useEffect(() => {
    if (imageSrc) {
      const img = imageRef.current;
      img.src = imageSrc;
      img.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const canvasRect = canvas.getBoundingClientRect();
        const minScale = Math.max(canvasRect.width / img.width, canvasRect.height / img.height);
        setScale(minScale);
        setOffset({ x: 0, y: 0 });
        drawCanvas(ctx, img, minScale, { x: 0, y: 0 });
      };
    }
  }, [imageSrc]);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img.src) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    drawCanvas(ctx, img, scale, offset);
  }, [scale, offset]);

  const drawCanvas = (ctx: CanvasRenderingContext2D, img: HTMLImageElement, currentScale: number, currentOffset: { x: number, y: number }) => {
    const canvas = ctx.canvas;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const imgWidth = img.width * currentScale;
    const imgHeight = img.height * currentScale;
    const x = (canvas.width - imgWidth) / 2 + currentOffset.x;
    const y = (canvas.height - imgHeight) / 2 + currentOffset.y;
    ctx.drawImage(img, x, y, imgWidth, imgHeight);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - lastMousePos.current.x;
    const deltaY = e.clientY - lastMousePos.current.y;
    lastMousePos.current = { x: e.clientX, y: e.clientY };
    setOffset(prev => ({ x: prev.x + deltaX, y: prev.y + deltaY }));
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleSave = async () => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img.src) return;
    setIsSaving(true);
    const outputCanvas = document.createElement('canvas');
    const finalSize = Math.min(img.width, img.height, 256);
    outputCanvas.width = finalSize;
    outputCanvas.height = finalSize;
    const ctx = outputCanvas.getContext('2d');
    if (!ctx) return;
    const imgWidth = img.width * scale;
    const imgHeight = img.height * scale;
    const canvasCenterX = canvas.width / 2;
    const canvasCenterY = canvas.height / 2;
    const cropAreaDeviceSize = CROP_AREA_SIZE;
    const cropAreaSourceSize = cropAreaDeviceSize / scale;
    const sourceX = (img.width / 2) - (canvasCenterX - (canvasCenterX + offset.x)) / scale - (cropAreaSourceSize / 2);
    const sourceY = (img.height / 2) - (canvasCenterY - (canvasCenterY + offset.y)) / scale - (cropAreaSourceSize / 2);
    ctx.drawImage(img, sourceX, sourceY, cropAreaSourceSize, cropAreaSourceSize, 0, 0, finalSize, finalSize);
    outputCanvas.toBlob((blob) => {
      onCropComplete(blob);
      setIsSaving(false);
    }, 'image/png', 0.9);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay bg="blackAlpha.900" />
      <ModalContent bg="gray.900" color="white" borderRadius="2xl" p={6} maxW="md">
        <ModalHeader fontSize="lg" fontWeight="semibold">{t('cropAvatarTitle')}</ModalHeader>
        <ModalCloseButton isDisabled={isSaving} />
        <ModalBody>
          <Box position="relative" w="full" h="72" bg="black" borderRadius="lg" overflow="hidden" mb={5} borderWidth="2px" borderColor="whiteAlpha.200">
            <Box
              as="canvas"
              ref={canvasRef}
              w="full"
              h="full"
              cursor="grab"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              aria-label={t('cropCanvasAriaLabel')}
            />
            <Box
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              border="2px dashed white"
              borderRadius="full"
              pointerEvents="none"
              w={`${CROP_AREA_SIZE}px`}
              h={`${CROP_AREA_SIZE}px`}
            />
          </Box>
          <HStack spacing={3} mb={5}>
            <IconButton
              icon={<FaMagnifyingGlassMinus />}
              aria-label={t('zoomOutAriaLabel')}
              onClick={() => setScale(s => s * 0.9)}
              isDisabled={isSaving}
              variant="outline"
            />
            <Slider
              min={0.1}
              max={3}
              step={0.01}
              value={scale}
              onChange={(val) => setScale(val)}
              isDisabled={isSaving}
              aria-label={t('zoomSliderAriaLabel')}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <IconButton
              icon={<FaMagnifyingGlassPlus />}
              aria-label={t('zoomInAriaLabel')}
              onClick={() => setScale(s => s * 1.1)}
              isDisabled={isSaving}
              variant="outline"
            />
          </HStack>
        </ModalBody>
        <ModalFooter>
          <Button
            w="full"
            colorScheme="pink"
            onClick={handleSave}
            isLoading={isSaving}
            leftIcon={<FaCheck />}
          >
            {t('saveAvatarButton')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CropModal;