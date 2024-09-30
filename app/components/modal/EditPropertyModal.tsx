"use client";

import useEditPropertyModal from "@/app/hooks/useEditPropertyModal";
import Modal from "./Modal";
import React from "react";

const EditPropertyModal = () => {
  const editProperty = useEditPropertyModal(); // Use the correct hook
  const content = (
    <>
      <h2>Edit Property</h2>
      {/* Add your edit form here */}
    </>
  );
  return (
    <>
      <Modal
        isOpen={editProperty.isOpen}
        close={editProperty.close}
        label="Edit Property"
        content={content}
      />
    </>
  );
};

export default EditPropertyModal;
