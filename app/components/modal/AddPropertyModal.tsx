'use client'
import Image from "next/image";

import { ChangeEvent, useState } from "react";
import Modal from "./Modal";
import useAddPropertyModal from "@/app/hooks/useAddPropertyModal";
import apiService from "@/app/services/apiService";
import { useRouter } from "next/navigation";

const AddPropertyModal = () => {
    const addPropertyModal = useAddPropertyModal();
    const router = useRouter();
    const content = (<p>add property</p>)
    return (
      <>
        <Modal
          isOpen={addPropertyModal.isOpen}
          close={addPropertyModal.close}
          label="Add property"
          content={content}
        />
      </>
    );
}

export default AddPropertyModal