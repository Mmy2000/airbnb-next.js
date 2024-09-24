'use client'
import Image from "next/image";

import { ChangeEvent, useState } from "react";
import Modal from "./Modal";
import useAddPropertyModal from "@/app/hooks/useAddPropertyModal";
import apiService from "@/app/services/apiService";
import { useRouter } from "next/navigation";
import CustomButton from "../forms/CustomButton";
import Categories from "../addproperty/Categories";

const AddPropertyModal = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [dataCategory, setDataCategory] = useState("");
    const addPropertyModal = useAddPropertyModal();
    const router = useRouter();

    const setCategory = (category: string) => {
      setDataCategory(category);
    };
    
    const content = (
      <>
        {currentStep == 1 ? (
          <>
            <h2 className="mb-6 text-2xl">Choose category</h2>
            <Categories
              dataCategory={dataCategory}
              setCategory={(category) => setCategory(category)}
            />
            <CustomButton label="Next" onClick={() => setCurrentStep(2)} />
          </>
        ) : currentStep == 2 ? (
          <>
            <h2 className="mb-6 text-2xl">Discripe Your Place</h2>
            <CustomButton
              label="Previous"
              className="mb-2 bg-black hover:bg-gray-800"
              onClick={() => setCurrentStep(1)}
            />
            <CustomButton label="Next" onClick={() => setCurrentStep(3)} />
          </>
        ) : (
          <> step 3</>
        )}
      </>
    );
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