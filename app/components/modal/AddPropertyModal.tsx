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
    const [dataTitle, setDataTitle] = useState("");
    const [dataDescription, setDataDescription] = useState("");
    // const [dataPrice, setDataPrice] = useState("");
    // const [dataBedrooms, setDataBedrooms] = useState("");
    // const [dataBathrooms, setDataBathrooms] = useState("");
    // const [dataGuests, setDataGuests] = useState("");
    // const [dataCountry, setDataCountry] = useState<SelectCountryValue>();
    // const [dataImage, setDataImage] = useState<File | null>(null);
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
            <div className="pt-3 pb-6 space-y-4">
              <div className="flex flex-col space-y-2">
                <label>Title</label>
                <input
                  type="text"
                  value={dataTitle}
                  onChange={(e) => setDataTitle(e.target.value)}
                  className="w-full p-4 border border-gray-600 rounded-xl"
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label>Description</label>
                <textarea
                  value={dataDescription}
                  onChange={(e) => setDataDescription(e.target.value)}
                  className="w-full h-[200px] p-4 border border-gray-600 rounded-xl"
                ></textarea>
              </div>
            </div>
            <CustomButton
              label="Previous"
              className="mb-2 bg-black hover:bg-gray-800"
              onClick={() => setCurrentStep(1)}
            />
            <CustomButton label="Next" onClick={() => setCurrentStep(3)} />
          </>
        ) : (
          <>
            {" "}
            
            <CustomButton
              label="Previous"
              className="mb-2 bg-black hover:bg-gray-800"
              onClick={() => setCurrentStep(2)}
            />
          </>
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