"use client";

import useEditPropertyModal from "@/app/hooks/useEditPropertyModal";
import Modal from "./Modal";
import { useState, useEffect } from "react";
import apiService from "@/app/services/apiService";
import CustomButton from "../forms/CustomButton";
import Categories from "../addproperty/Categories";
import SelectCountry, { SelectCountryValue } from "../forms/SelectCountry";
import { toast } from "react-toastify";
import Image from "next/image";
import React from "react";

interface EditPropertyModalProps {
  propertyId: string; // or number if it's a number
}

const EditPropertyModal: React.FC<EditPropertyModalProps> = ({
  propertyId,
}) => {
  const { isOpen, close } = useEditPropertyModal();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5; // Total number of steps
  const progressPercentage = (currentStep / totalSteps) * 100;
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [dataCategory, setDataCategory] = useState("");
  const [dataTitle, setDataTitle] = useState("");
  const [dataDescription, setDataDescription] = useState("");
  const [dataPrice, setDataPrice] = useState("");
  const [dataBedrooms, setDataBedrooms] = useState("");
  const [dataBathrooms, setDataBathrooms] = useState("");
  const [dataGuests, setDataGuests] = useState("");
  const [dataCountry, setDataCountry] = useState<SelectCountryValue>();
  const [dataImage, setDataImage] = useState<File | null>(null);
  const [dataImages, setDataImages] = useState<File[]>([]);
  const [existingProperty, setExistingProperty] = useState(null);

  // Fetch existing property data on mount
  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        const response = await apiService.get(`/api/properties/${propertyId}/`);
        if (response.success) {
          setExistingProperty(response.data);
          setDataCategory(response.data.category);
          setDataTitle(response.data.title);
          setDataDescription(response.data.description);
          setDataPrice(response.data.price_per_night);
          setDataBedrooms(response.data.bedrooms);
          setDataBathrooms(response.data.bathrooms);
          setDataGuests(response.data.guests);
          setDataCountry({
            label: response.data.country,
            value: response.data.country_code,
          });
          // If you have image URLs, set the image states accordingly
        }
      } catch (error) {
        console.error("Error fetching property data:", error);
        toast.error("Failed to load property data.");
      }
    };
    fetchPropertyData();
  }, [propertyId]);

  const setCategory = (category: string) => {
    setDataCategory(category);
  };

  const setImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const tmpImage = event.target.files[0];
      setDataImage(tmpImage);
    }
  };

  const setImages = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const tmpImages = Array.from(event.target.files); // Convert FileList to an array
      setDataImages(tmpImages); // Set the state with the array of images
    }
  };

  const submitForm = async () => {
    setLoading(true);
    if (
      dataCategory &&
      dataTitle &&
      dataDescription &&
      dataPrice &&
      dataCountry
    ) {
      const formData = new FormData();
      formData.append("category", dataCategory);
      formData.append("title", dataTitle);
      formData.append("description", dataDescription);
      formData.append("price_per_night", dataPrice);
      formData.append("bedrooms", dataBedrooms);
      formData.append("bathrooms", dataBathrooms);
      formData.append("guests", dataGuests);
      formData.append("country", dataCountry.label);
      formData.append("country_code", dataCountry.value);
      if (dataImage) {
        formData.append("image", dataImage);
      }
      dataImages.forEach((image) => {
        formData.append("property_images", image); // Change the key if needed
      });

      const response = await apiService.put(
        `/api/properties/update/${propertyId}/`,
        formData
      );
      if (response.success) {
        console.log("SUCCESS :-D");
        toast.success("Property updated successfully");
        close();
      } else {
        console.log("Error");
        toast.error("Property not updated");
        const tmpErrors: string[] = Object.values(response).map(
          (error: any) => error
        );
        setErrors(tmpErrors);
      }
      setLoading(false);
    }
  };

  const content = (
    <>
      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-semibold">{`Step ${currentStep} of ${totalSteps}`}</span>
        </div>
        <div className="relative w-full h-2 bg-gray-200 rounded-full">
          <div
            className="absolute top-0 left-0 h-full bg-airbnb rounded-full transition-all"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {currentStep === 1 ? (
        <>
          <h2 className="mb-6 text-2xl">Choose category</h2>
          <Categories dataCategory={dataCategory} setCategory={setCategory} />
        </>
      ) : currentStep === 2 ? (
        <>
          <h2 className="mb-6 text-2xl">Describe Your Place</h2>
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
        </>
      ) : currentStep === 3 ? (
        <>
          <h2 className="mb-6 text-2xl">Details</h2>
          <div className="pt-3 pb-6 space-y-4">
            <div className="flex flex-col space-y-2">
              <label>Price per night</label>
              <input
                type="number"
                value={dataPrice}
                onChange={(e) => setDataPrice(e.target.value)}
                className="w-full p-4 border border-gray-600 rounded-xl"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label>Bedrooms</label>
              <input
                type="number"
                value={dataBedrooms}
                onChange={(e) => setDataBedrooms(e.target.value)}
                className="w-full p-4 border border-gray-600 rounded-xl"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label>Bathrooms</label>
              <input
                type="number"
                value={dataBathrooms}
                onChange={(e) => setDataBathrooms(e.target.value)}
                className="w-full p-4 border border-gray-600 rounded-xl"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label>Maximum number of guests</label>
              <input
                type="number"
                value={dataGuests}
                onChange={(e) => setDataGuests(e.target.value)}
                className="w-full p-4 border border-gray-600 rounded-xl"
              />
            </div>
          </div>
        </>
      ) : currentStep === 4 ? (
        <>
          <h2 className="mb-6 text-2xl">Location</h2>
          <div className="pt-3 pb-6 space-y-4">
            <SelectCountry
              value={dataCountry}
              onChange={(value) => setDataCountry(value as SelectCountryValue)}
            />
          </div>
        </>
      ) : (
        <>
          <h2 className="mb-2 text-2xl">Cover Image</h2>
          <div className="pt-2 pb-6 space-y-4">
            <div className="py-4 px-6 bg-gray-600 text-white rounded-xl">
              <input type="file" accept="image/*" onChange={setImage} />
            </div>
            <div className="py-4 px-6 bg-gray-600 text-white rounded-xl">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={setImages}
              />
            </div>
          </div>
        </>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        {currentStep > 1 && (
          <button
            type="button"
            className="text-white bg-gray-600 px-4 py-2 rounded-xl"
            onClick={() => setCurrentStep(currentStep - 1)}
          >
            Previous
          </button>
        )}
        {currentStep < totalSteps ? (
          <button
            type="button"
            className="text-white bg-airbnb px-4 py-2 rounded-xl"
            onClick={() => setCurrentStep(currentStep + 1)}
          >
            Next
          </button>
        ) : (
          <CustomButton
            label="Update Property"
            onClick={submitForm}
            loading={loading}
          />
        )}
      </div>
    </>
  );

  return (
    <Modal
      label="Edit Property"
      isOpen={isOpen}
      close={close}
      content={content}
    />
  );
};

export default EditPropertyModal;
