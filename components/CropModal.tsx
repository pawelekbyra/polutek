"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RotateCw, ZoomIn, ZoomOut } from 'lucide-react';
import Cropper, { ReactCropperElement } from 'react-cropper';
import 'cropperjs/dist/cropper.css';

interface CropModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string | null;
  onCropComplete: (croppedBlob: Blob) => void;
}

const CropModal: React.FC<CropModalProps> = ({ isOpen, onClose, imageSrc, onCropComplete }) => {
  const cropperRef = useRef<ReactCropperElement>(null);
  const [zoom, setZoom] = useState(0.5);
  const [rotation, setRotation] =useState(0);

  const handleCrop = () => {
    if (cropperRef.current) {
      const cropper = cropperRef.current.cropper;
      cropper.getCroppedCanvas().toBlob((blob) => {
        if (blob) {
          onCropComplete(blob);
          onClose();
        }
      }, 'image/png');
    }
  };

  const handleZoom = (delta: number) => {
    const newZoom = Math.max(0.1, Math.min(2, zoom + delta));
    setZoom(newZoom);
    if (cropperRef.current) {
        cropperRef.current.cropper.zoomTo(newZoom);
    }
  };

  const handleRotate = () => {
    const newRotation = (rotation + 90) % 360;
    setRotation(newRotation);
    if (cropperRef.current) {
        cropperRef.current.cropper.rotate(90);
    }
  };


  return (
    <AnimatePresence>
      {isOpen && imageSrc && (
        <motion.div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-gray-900 text-white rounded-xl max-w-lg w-full max-h-[90vh] flex flex-col border border-white/10"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h2 className="text-lg font-semibold">Crop Your Avatar</h2>
              <button onClick={onClose} className="text-white/60 hover:text-white"><X size={24} /></button>
            </div>

            <div className="flex-1 p-4 overflow-hidden">
                <Cropper
                    ref={cropperRef}
                    src={imageSrc}
                    style={{ height: '100%', width: '100%' }}
                    aspectRatio={1}
                    viewMode={1}
                    dragMode="move"
                    background={false}
                    responsive
                    autoCropArea={0.8}
                    checkOrientation={false}
                    guides={true}
                />
            </div>

            <div className="p-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <button onClick={() => handleZoom(-0.1)} className="p-2 bg-white/10 rounded-full"><ZoomOut size={20}/></button>
                    <button onClick={() => handleZoom(0.1)} className="p-2 bg-white/10 rounded-full"><ZoomIn size={20}/></button>
                    <button onClick={handleRotate} className="p-2 bg-white/10 rounded-full"><RotateCw size={20}/></button>
                </div>
                <button onClick={handleCrop} className="bg-pink-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-pink-600">
                    Save
                </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CropModal;
