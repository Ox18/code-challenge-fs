import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  accept: () => void;
}

const ModalInvitation: React.FC<ModalProps> = ({ isOpen, onClose, accept }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative">
        <h2 className="text-xl font-semibold mb-4">
          You have a new invitation
        </h2>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          ✕
        </button>
        <div className="py-5 mb-5">
            <p>
                A user has invited you to a voice call
            </p>
        </div>
        <div className="flex justify-end gap-4">
          <button
            onClick={accept}
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Accept
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalInvitation;
