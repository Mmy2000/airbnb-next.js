// "use client";

// import useEditPropertyModal from "@/app/hooks/useEditPropertyModal";
// import Modal from "./Modal";
// import { useState, useEffect } from "react";
// import apiService from "@/app/services/apiService";
// import CustomButton from "../forms/CustomButton";
// import Categories from "../addproperty/Categories";
// import SelectCountry, { SelectCountryValue } from "../forms/SelectCountry";
// import { toast } from "react-toastify";
// import Image from "next/image";
// import React from "react";
// import { PropertyType } from "../properties/PropertyList";
// import { useRouter } from "next/navigation";


// interface EditPropertyModalProps {
//   property: PropertyType; // or number if it's a number
// }

// const EditPropertyModal: React.FC<EditPropertyModalProps> = ({ property }) => {
//   const { isOpen, close } = useEditPropertyModal();
//   const [currentStep, setCurrentStep] = useState(1);
//   const totalSteps = 5; // Total number of steps
//   const progressPercentage = (currentStep / totalSteps) * 100;
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState<string[]>([]);
//   const [dataCategory, setDataCategory] = useState("");
//   const [dataTitle, setDataTitle] = useState("");
//   const [dataDescription, setDataDescription] = useState("");
//   const [dataPrice, setDataPrice] = useState("");
//   const [dataBedrooms, setDataBedrooms] = useState("");
//   const [dataBathrooms, setDataBathrooms] = useState("");
//   const [dataGuests, setDataGuests] = useState("");
//   const [dataCountry, setDataCountry] = useState<SelectCountryValue>();
//   const [dataImage, setDataImage] = useState<File | null>(null);
//   const [dataImages, setDataImages] = useState<File[]>([]);
//   const router = useRouter();

//   useEffect(() => {
//     if (isOpen ) {
//       const fetchPropertyData = async ()=>{
//         try {
//           const response = await apiService.get(
//             `/api/properties/${property.id}`
//           );
//           const propertyData = response;
//           setDataTitle(propertyData.title || "")
//           setDataBathrooms(propertyData.bathrooms || "")
//           setDataBedrooms(propertyData.bedrooms || "")
//           setDataDescription(propertyData.description || "")
//           setDataCategory(propertyData.category || "")
//           setDataGuests(propertyData.guests || "");
//           setDataPrice(propertyData.price || "");
//         } catch (error) {
//           toast.error("Failed to load profile data");
//         }
//       }
//       fetchPropertyData()
//       console.log(dataTitle);
      
//     }
    
//   }, []);

  

//   const content = (
//     <>
      
//     </>
//   );

//   return (
//     <Modal
//       label="Edit Property"
//       isOpen={isOpen}
//       close={close}
//       content={content}
//       isEditModal
//     />
//   );
// };

// export default EditPropertyModal;



"use client";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import Modal from "./Modal";
import useEditPropertyModal from "@/app/hooks/useEditPropertyModal";
import apiService from "@/app/services/apiService";
import { useRouter } from "next/navigation";
import CustomButton from "../forms/CustomButton";
import Categories from "../addproperty/Categories";
import SelectCountry, { SelectCountryValue } from "../forms/SelectCountry";
import { toast } from "react-toastify";
import React from "react";
import { PropertyType } from "../properties/PropertyList";

interface EditPropertyModalProps {
  property: PropertyType; // Add propertyId to identify which property to edit
}

const EditPropertyModal = ({ property }: EditPropertyModalProps) => {
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
  const editPropertyModal = useEditPropertyModal();
 const [previewImage, setPreviewImage] = useState<string | null>(null);
 const [previewImages, setPreviewImages] = useState<string[]>([]);
  const router = useRouter();

  // Fetch existing property details
  useEffect(() => {
    setLoading(true)
    const fetchPropertyDetails = async () => {
      try {
        const response = await apiService.get(`/api/properties/${property.id}/`);
        
        if (response) {
          const {
            category,
            title,
            description,
            price_per_night,
            bedrooms,
            bathrooms,
            guests,
            country,
            country_code,
            image_url,
            property_images,
          } = response;
          
          
          setDataCategory(category);
          setDataTitle(title);
          setDataDescription(description);
          setDataPrice(price_per_night);
          setDataBedrooms(bedrooms);
          setDataBathrooms(bathrooms);
          setDataGuests(guests);
          setDataCountry({ label: country, value: country_code });
          setDataImage(image_url);
          setDataImages({...property_images});
        }
      } catch (error) {
        console.error("Error fetching property details:", error);
      }
      setLoading(false)
    };

    fetchPropertyDetails();
  }, [property.id]);

  const setCategory = (category: string) => {
    setDataCategory(category);
  };

  const setImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const tmpImage = event.target.files[0];
      setDataImage(tmpImage);

      // Create a preview URL for the single image
      const previewUrl = URL.createObjectURL(tmpImage);
      setPreviewImage(previewUrl);
    }
  };

  const setImages = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const tmpImages = Array.from(event.target.files);
      setDataImages(tmpImages);
      console.log("tempImages",tmpImages);
      

      // Create preview URLs for the selected images
      const previewUrls = tmpImages.map((image) => URL.createObjectURL(image));
      setPreviewImages(previewUrls);
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
      formData.append("country", dataCountry.label);
      formData.append("country_code", dataCountry.value);
      formData.append("image", dataImage);
      dataImages.forEach((image) => {
        formData.append("property_images", image);
      });

      const response = await apiService.put(
        `/api/properties/${property.id}/edit/`,
        formData
      );
      if (response.success) {
        console.log("SUCCESS :-D");
        toast.success("Property Updated successfully");
        router.push("/?edited=true");
        editPropertyModal.close();
      } else {
        console.log("Error");
        toast.error("Property not updated");
        const tmpErrors: string[] = Object.values(response).map(
          (error: any) => error
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
          </div>
        </>
      ) : (
        <>
          <h2 className="mb-2 text-2xl">Cover Image</h2>
          <div className="pt-2 pb-6 space-y-4">
            <div className="py-4 px-6 bg-gray-600 text-white rounded-xl">
              <input type="file" accept="image/*" onChange={setImage} />
            </div>
            {previewImage && (
              <div className="w-[200px] h-[150px] relative">
                <h3>Cover Image Preview:</h3>
                <Image
                  fill
                  src={previewImage}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            )}
          </div>
          <h2 className="mb-2 text-2xl">Other Images</h2>
          <div className="pt-2 pb-6 space-y-4">
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

      {/* Button Section for Navigation */}
      <div className="flex justify-between mb-2 gap-3">
        {currentStep > 1 && (
          <CustomButton
            label="Previous"
            className="bg-black hover:bg-gray-800"
            onClick={() => setCurrentStep(currentStep - 1)}
            disabled={loading}
          />
        )}
        {currentStep < totalSteps && (
          <CustomButton
            label="Next"
            className="bg-airbnb hover:bg-airbnb-dark"
            onClick={() => setCurrentStep(currentStep + 1)}
            disabled={loading}
          />
        )}
        {currentStep === totalSteps && (
          <CustomButton
            loading={loading} // Pass the loading state
            disabled={loading}
            label="Save"
            onClick={submitForm}
          />
        )}
      </div>

      {/* Error messages */}
      {errors.length > 0 && (
        <div className="mt-4 text-red-500">
          {errors.map((error, index) => (
            <div key={index}>{error}</div>
          ))}
        </div>
      )}
    </>
  );

  return (
    <Modal
      isOpen={editPropertyModal.isOpen}
      close={editPropertyModal.close}
      label="Edit Property"
      content={content}
      isEditModal={true}
    ></Modal>
  );
};

export default EditPropertyModal;
