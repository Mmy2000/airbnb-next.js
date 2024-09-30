"use client";

import useEditProfileModal from "@/app/hooks/useEditProfileModal";
import Modal from "./Modal";
import { ChangeEvent, useEffect, useState } from "react";
import CustomButton from "../forms/CustomButton";
import apiService from "@/app/services/apiService";
import ProgressBar from "../ProgressBar";
import { toast } from "react-toastify";
import React from "react";

interface EditProfileModalProps {
  onProfileUpdate: (updatedProfile: any) => void; // Function to update profile
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  onProfileUpdate,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 2;
  const [address, setAddress] = useState("");
  const [about, setAbout] = useState("");
  const [country, setCountry] = useState("");
  const [company, setCompany] = useState("");
  const [headline, setHeadline] = useState("");
  const [address_line_1, setAddressLine1] = useState("");
  const [city, setCity] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const editProfile = useEditProfileModal();
  const [loading, setLoading] = useState(false);

  // Fetch current profile data when modal opens
  useEffect(() => {
    if (editProfile.isOpen) {
      const fetchProfileData = async () => {
        try {
          const response = await apiService.get("/api/auth/profile/");
          const profileData = response;

          // Set the state with the fetched profile data
          setName(profileData.name || "");
          setAddress(profileData.address || "");
          setAbout(profileData.about || "");
          setCountry(profileData.country || "");
          setCompany(profileData.company || "");
          setHeadline(profileData.headline || "");
          setAddressLine1(profileData.address_line_1 || "");
          setCity(profileData.city || "");
        } catch (error) {
          toast.error("Failed to load profile data");
        }
      };

      fetchProfileData();
    }
  }, [editProfile.isOpen]);

  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();

    formData.append("address", address);
    formData.append("about", about);
    formData.append("country", country);
    formData.append("company", company);
    formData.append("headline", headline);
    formData.append("address_line_1", address_line_1);
    formData.append("city", city);
    formData.append("name", name);
    if (image) formData.append("image", image); // Only append image if it's selected

    try {
      const response = await apiService.put(
        "/api/auth/profile/edit/",
        formData
      );

      if (response) {
        toast.success("Profile updated successfully");
        onProfileUpdate(response);
        editProfile.close(); // Close modal after successful submission
      }
    } catch (error) {
      toast.error("Error updating profile");
    }
    setLoading(false);
  };

  const content = (
    <>
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      {currentStep == 1 ? (
        <>
          <h2 className="mb-8 text-3xl mt-4 font-semibold text-gray-800">
            About You
          </h2>
          <div className="py-6 space-y-2">
            <div className="flex px-3 flex-wrap -mx-3">
              {/* Name Input */}
              <div className="w-full md:w-1/2 px-3 mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Your Name
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              {/* Headline Input */}
              <div className="w-full md:w-1/2 px-3 mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Your Headline
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Enter your headline"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                />
              </div>
            </div>
            {/* About Section */}
            <div className="w-full px-3">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                About
              </label>
              <textarea
                className="w-full h-[200px] p-4 border border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Tell us about yourself"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              ></textarea>
            </div>
          </div>

          <CustomButton
            label="Next"
            className="bg-airbnb hover:bg-airbnb-dark"
            onClick={() => setCurrentStep(currentStep + 1)}
          />
        </>
      ) : (
        <>
          <h2 className="mb-8 mt-4 text-3xl font-semibold text-gray-800">
            Complete Your Profile
          </h2>
          <div className="py-6">
            <div className="flex flex-wrap -mx-3">
              {/* Country Input */}
              <div className="w-full md:w-1/2 px-3 mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Country
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Enter your country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
              {/* City Input */}
              <div className="w-full md:w-1/2 px-3 mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Enter your city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              {/* Address Input */}
              <div className="w-full md:w-1/2 px-3 mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Enter your address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              {/* Address Line One */}
              <div className="w-full md:w-1/2 px-3 mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Address Line One
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Enter address line one"
                  value={address_line_1}
                  onChange={(e) => setAddressLine1(e.target.value)}
                />
              </div>
              {/* Company Input */}
              <div className="w-full md:w-1/2 px-3 mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Company
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Enter your company name"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>
              {/* Image Upload */}
              <div className="w-full md:w-1/2 px-3 mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Profile Image
                </label>
                <input
                  type="file"
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setImage(e.target.files?.[0] || null)
                  }
                />
              </div>
            </div>
          </div>
          <CustomButton
            label={loading ? "Saving..." : "Save"}
            onClick={handleSubmit}
            disabled={loading}
          />
        </>
      )}
    </>
  );

  return (
    <Modal
      isOpen={editProfile.isOpen}
      close={editProfile.close}
      label="Edit Your Profile"
      content={content}
    />
  );
};

export default EditProfileModal;
