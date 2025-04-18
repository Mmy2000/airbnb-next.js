"use client";
import Image from "next/image";

import { ChangeEvent, useState } from "react";
import Modal from "./Modal";
import useAddPropertyModal from "@/app/hooks/useAddPropertyModal";
import apiService from "@/app/services/apiService";
import { useRouter } from "next/navigation";
import CustomButton from "../forms/CustomButton";
import Categories from "../addproperty/Categories";
import SelectCountry, { SelectCountryValue } from "../forms/SelectCountry";
import { toast } from "react-toastify";
import React from "react";

const AddPropertyModal = () => {
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
  const [dataCity, setDataCity] = useState("");
  const [dataImage, setDataImage] = useState<File | null>(null);
  const [dataImages, setDataImages] = useState<File[]>([]);
  const addPropertyModal = useAddPropertyModal();
  const router = useRouter();

  const setCategory = (category: string) => {
    setDataCategory(category);
  };

  const setImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const tmpImage = event.target.files[0];

      setDataImage(tmpImage);
    }
  };
  const setImages = (event: ChangeEvent<HTMLInputElement>) => {
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
      dataCountry &&
      dataCity &&
      dataImage &&
      dataImages
    ) {
      const formData = new FormData();
      formData.append("category", dataCategory);
      formData.append("title", dataTitle);
      formData.append("description", dataDescription);
      formData.append("price_per_night", dataPrice);
      formData.append("bedrooms", dataBedrooms);
      formData.append("bathrooms", dataBathrooms);
      formData.append("guests", dataGuests);
      formData.append("city", dataCity);
      formData.append("country", dataCountry.label);
      formData.append("country_code", dataCountry.value);
      formData.append("image", dataImage);
      dataImages.forEach((image) => {
        formData.append("property_images", image); // Change the key if needed
      });

      const response = await apiService.post(
        "/api/properties/create/",
        formData
      );
      if (response.success) {
        console.log("SUCCESS :-D");
        toast.success("Property Added successfully");

        router.push("/?added=true");

        addPropertyModal.close();
      } else {
        console.log("Error");
        toast.error("Property not added");
        const tmpErrors: string[] = Object.values(response).map(
          (error: any) => {
            return error;
          }
        );

        setErrors(tmpErrors);
        setLoading(false);
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

      {currentStep == 1 ? (
        <>
          <h2 className="mb-6 text-2xl">Choose category</h2>
          <Categories
            dataCategory={dataCategory}
            setCategory={(category) => setCategory(category)}
          />
        </>
      ) : currentStep == 2 ? (
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
      ) : currentStep == 3 ? (
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
      ) : currentStep == 4 ? (
        <>
          <h2 className="mb-6 text-2xl">Location</h2>
          <div className="pt-3 pb-6 space-y-4">
            <SelectCountry
              value={dataCountry}
              onChange={(value) => setDataCountry(value as SelectCountryValue)}
            />
            <div className="flex flex-col space-y-2">
              <label>City</label>
              <input
                type="text"
                value={dataCity}
                onChange={(e) => setDataCity(e.target.value)}
                className="w-full p-4 border border-gray-600 rounded-xl"
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <h2 className="mb-2 text-2xl">Cover Image</h2>
          <div className="pt-2 pb-6 space-y-4">
            <div className="py-4 px-6 bg-gray-600 text-white rounded-xl">
              <input type="file" accept="image/*" onChange={setImage} />
            </div>
            {dataImage && (
              <div className="w-[200px] h-[150px] relative">
                <Image
                  fill
                  alt="Uploaded image"
                  src={URL.createObjectURL(dataImage)}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            )}
          </div>
          <h2 className="mb-2 text-2xl">More Images</h2>
          <div className="pt-2 pb-6 space-y-4">
            <div className="py-4 px-6 bg-gray-600 text-white rounded-xl">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={setImages}
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {dataImages.map((image, index) => (
                <div key={index} className="w-full h-[150px] relative">
                  <Image
                    fill
                    alt={`Uploaded image ${index + 1}`}
                    src={URL.createObjectURL(image)}
                    className="object-cover rounded-xl"
                  />
                </div>
              ))}
            </div>
          </div>
          {errors.map((error, index) => (
            <div
              key={index}
              className="p-5 mb-4 bg-airbnb text-white rounded-xl opacity-80"
            >
              {error}
            </div>
          ))}
        </>
      )}

      {/* Button Section for Navigation */}
      <div className="flex justify-between mb-2 gap-3">
        {currentStep > 1 && (
          <CustomButton
            label="Previous"
            className="bg-black hover:bg-gray-800"
            onClick={() => setCurrentStep(currentStep - 1)}
          />
        )}
        {currentStep < totalSteps && (
          <CustomButton
            label="Next"
            className="bg-airbnb hover:bg-airbnb-dark"
            onClick={() => setCurrentStep(currentStep + 1)}
          />
        )}
        {currentStep === totalSteps && (
          <CustomButton
            loading={loading} // Pass the loading state
            disabled={loading}
            label="Submit"
            onClick={submitForm}
          />
        )}
      </div>
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
};

export default AddPropertyModal;
