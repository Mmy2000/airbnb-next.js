"use client";

import useEditPropertyModal from "@/app/hooks/useEditPropertyModal";
import { useCallback, useEffect, useState } from "react";

interface ModalProps {
  label: string;
  close: () => void;
  content: React.ReactElement;
  isOpen: boolean;
  isEditModal?: boolean; // New prop to indicate if it's an edit modal
}

const Modal: React.FC<ModalProps> = ({
  label,
  content,
  isOpen,
  close,
  isEditModal,
}) => {
  const [showModal, setShowModal] = useState(isOpen);
  const editModal = useEditPropertyModal;

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setShowModal(false);
    setTimeout(() => {
      close();
    }, 300); // Smoother close delay
  }, [close]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={`flex items-center transition-all justify-center fixed inset-0 z-50 ${
        isEditModal ? "bg-black/10" : "bg-black/50"
      } backdrop-blur-none`} // Smoothened backdrop blur
    >
      <div className="relative w-[90%] md:w-[80%] lg:w-[700px] my-6 mx-auto max-w-3xl max-h-screen overflow-y-auto">
        <div
          className={`transition-all transform duration-500 ${
            showModal
              ? "translate-y-0 scale-100 opacity-100"
              : "translate-y-5 scale-95 opacity-0"
          }`}
        >
          <div className="w-full bg-white shadow-2xl rounded-lg overflow-hidden relative flex flex-col max-h-[90vh]">
            {/* Header Section */}
            <header className="flex items-center justify-between px-6 py-3 bg-gray-100 border-b border-gray-200">
              <h2 className="text-xl font-medium text-gray-900">{label}</h2>
              <div
                onClick={handleClose}
                className="p-2 hover:bg-gray-200 transition-colors duration-200 rounded-full cursor-pointer"
              >
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </header>

            {/* Content Section */}
            <section className="px-6 py-4 overflow-y-auto">
              {" "}
              {/* Scrollable content if necessary */}
              {content}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
