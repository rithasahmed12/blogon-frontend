import React, { useState } from 'react';
import { Loader2 } from "lucide-react";
import ModalWrapper from './ModalWrapper';

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  closeModal: () => void;
  onConfirm: () => void;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  isOpen,
  closeModal,
  onConfirm,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onConfirm();
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <ModalWrapper isOpen={isOpen} closeModal={closeModal} title="Confirm Delete">
      <div className="space-y-4 text-white">
        <p>Are you sure you want to delete this blog post?</p>
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={closeModal}
            className="px-4 py-2 border rounded-md text-gray-300 bg-gray-700 hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-4 py-2 border rounded-md text-white bg-red-600 hover:bg-red-700 flex items-center justify-center"
          >
            {isDeleting ? (
              <>
                <Loader2 className="animate-spin mr-2" size={18} />
                <span>Deleting...</span>
              </>
            ) : (
              'Delete'
            )}
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default ConfirmDeleteModal;