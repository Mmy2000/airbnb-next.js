'use client'
import useLoginModal from "@/app/hooks/useLoginModal";
import AddPropertyModal from "../modal/AddPropertyModal";
import LoginModal from "../modal/LoginModal";
import useAddPropertyModal from "@/app/hooks/useAddPropertyModal";

interface AddPropertyButtonProps {
  userId?: string | null;
}

const AddPropertyButton = () => {
  const loginModal = useLoginModal();
  const addPropertyModal = useAddPropertyModal();
  const airbnbYourHome = () => {
      addPropertyModal.open();
  };
  return (
    <div
      onClick={airbnbYourHome}
      className="p-2 cursor-pointer text-sm font-semibold rounded-full hover:bg-gray-200"
    >
      Djangobnb your home
    </div>
  );
};

export default AddPropertyButton