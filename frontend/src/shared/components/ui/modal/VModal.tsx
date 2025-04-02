"use client";

import { ReactNode } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

export default function VModal({ open, onClose, children, title }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 bg-opacity-40">
      <div className="bg-white p-6 rounded-xl shadow-xl max-w-md w-full relative">
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h3 className="text-1xl font-semibold text-gray-800">{title}</h3>
            <button
              onClick={onClose}
              className=" text-gray-500 hover:text-gray-800 text-xl"
            >
              ×
            </button>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
