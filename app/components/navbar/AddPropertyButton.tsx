"use client";
import useLoginModal from "@/app/hooks/useLoginModal";
import AddPropertyModal from "../modal/AddPropertyModal";
import LoginModal from "../modal/LoginModal";
import useAddPropertyModal from "@/app/hooks/useAddPropertyModal";

interface AddPropertyButtonProps {
  userId?: string | null;
}

const AddPropertyButton: React.FC<AddPropertyButtonProps> = ({ userId }) => {
  const loginModal = useLoginModal();
  const addPropertyModal = useAddPropertyModal();

  const airbnbYourHome = () => {
    if (userId) {
      addPropertyModal.open();
    } else {
      loginModal.open();
    }
  };

  return (
    <button
      onClick={airbnbYourHome}
      className="py-3 px-4 text-sm font-semibold rounded-full transition-all duration-300 bg-airbnb text-white hover:bg-airbnb-dark shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-airbnb"
    >
      Add Property
    </button>
  );
};

export default AddPropertyButton;
