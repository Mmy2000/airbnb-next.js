"use client";

import useEditProfileModal from "@/app/hooks/useEditProfileModal";
import Modal from "./Modal";


const EditProfileModal = () => {
    const editProfile = useEditProfileModal()
   const content = (
    <h3>Edit Profile</h3>
   )
  return (
    <>
      <Modal label="Edit Profile" isOpen={editProfile.isOpen} close={editProfile.close} content={content}/>
    </>
  );
};

export default EditProfileModal;
