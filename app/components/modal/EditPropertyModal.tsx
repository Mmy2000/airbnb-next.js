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
import { PropertyType } from "../properties/PropertyList";
import { useRouter } from "next/navigation";


interface EditPropertyModalProps {
  property: PropertyType; // or number if it's a number
}

const EditPropertyModal: React.FC<EditPropertyModalProps> = ({ property }) => {
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
  const router = useRouter();

  useEffect(() => {
    if (isOpen ) {
      const fetchPropertyData = async ()=>{
        try {
          const response = await apiService.get(
            `/api/properties/${property.id}`
          );
          const propertyData = response;
          setDataTitle(propertyData.title || "")
          setDataBathrooms(propertyData.bathrooms || "")
          setDataBedrooms(propertyData.bedrooms || "")
          setDataDescription(propertyData.description || "")
          setDataCategory(propertyData.category || "")
          setDataGuests(propertyData.guests || "");
          setDataPrice(propertyData.price || "");
        } catch (error) {
          toast.error("Failed to load profile data");
        }
      }
      fetchPropertyData()
      console.log(dataTitle);
      
    }
    
  }, []);

  

  const content = (
    <>
      
    </>
  );

  return (
    <Modal
      label="Edit Property"
      isOpen={isOpen}
      close={close}
      content={content}
      isEditModal
    />
  );
};

export default EditPropertyModal;

