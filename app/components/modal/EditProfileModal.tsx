"use client";

import useEditProfileModal from "@/app/hooks/useEditProfileModal";
import Modal from "./Modal";
import { useState } from "react";
import CustomButton from "../forms/CustomButton";


const EditProfileModal = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [address, setAddress] = useState("");
    const [about, setaAbout] = useState("");
    const [country, setaCountry] = useState("");
    const [company, setaCompany] = useState("");
    const [headline, setaHeadline] = useState("");
    const [address_line_1, setaAddress_Line_1] = useState("");
    const [city, setaCity] = useState("");
    const [name, setaName] = useState("");
    const [image, setaFull_Image] = useState<File | null>(null);
    const editProfile = useEditProfileModal()
   const content = (
     <>
       {currentStep == 1 ? (
         <>
           <h2 className="mb-6 text-2xl font-bold">About You</h2>
           <div className="pt-3 pb-6 space-y-4">
             <div className="flex items-center justify-center space-x-4">
               <div className="w-1/2">
                 <label>Your Name</label>
                 <input
                   type="text"
                   //  value={dataTitle}
                   //  onChange={(e) => setDataTitle(e.target.value)}
                   className="w-full p-4 border border-gray-600 rounded-xl"
                 />
               </div>
               <div className="w-1/2">
                 <label>Your Headline</label>
                 <input
                   type="text"
                   //  value={dataTitle}
                   //  onChange={(e) => setDataTitle(e.target.value)}
                   className="w-full p-4 border border-gray-600 rounded-xl"
                 />
               </div>
             </div>
             <div className="w-full">
               <label>About</label>
               <textarea
                 //    value={dataDescription}
                 //    onChange={(e) => setDataDescription(e.target.value)}
                 className="w-full h-[200px] p-4 border border-gray-600 rounded-xl"
               ></textarea>
             </div>
             <CustomButton
               label="Next"
               className="bg-airbnb hover:bg-airbnb-dark"
               onClick={() => setCurrentStep(currentStep + 1)}
             />
           </div>
         </>
       ) : currentStep == 2 ? (
         <>

           <div className="flex space-x-4">
             <CustomButton
               label="Next"
               className="bg-airbnb hover:bg-airbnb-dark w-1/2"
               onClick={() => setCurrentStep(currentStep + 1)}
             />
             <CustomButton
               label="Previous"
               className="bg-black hover:bg-gray-800 w-1/2"
               onClick={() => setCurrentStep(currentStep - 1)}
             />
           </div>
         </>
       ) : (
         <h2>next step</h2>
       )}
     </>
   );
  return (
    <>
      <Modal label="Edit Profile" isOpen={editProfile.isOpen} close={editProfile.close} content={content}/>
    </>
  );
};

export default EditProfileModal;
