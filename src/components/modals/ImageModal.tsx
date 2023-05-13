'use client';

import Image from 'next/image';
import Modal from './Modal';

interface ImageModalProps {
  src: string | null;
  onClose: () => void;
  isOpen: boolean;
}

const ImageModal = ({ isOpen, onClose, src }: ImageModalProps) => {
  if (!src) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-80 h-80">
        <Image alt="image" className="object-cover" fill src={src} />
      </div>
    </Modal>
  );
};

export default ImageModal;
