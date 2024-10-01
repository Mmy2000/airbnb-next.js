import Image from "next/image";
import { PropertyType } from "./PropertyList";
import { useRouter } from "next/navigation";
import FavoriteButton from "../FavoriteButton";
import Slider from "react-slick";
import useEditPropertyModal from "@/app/hooks/useEditPropertyModal";
import React from "react";
import apiService from "@/app/services/apiService";
import { MdEdit, MdDelete } from "react-icons/md";
import EditPropertyModal from "../modal/EditPropertyModal";


interface PropertyProps {
  property: PropertyType;
  markFavorite?: (is_favorite: boolean) => void;
  onDelete: () => void; 
  showEditDeleteButtons?: boolean; // New prop to show/hide Edit/Delete buttons
}

const PropertyListItem: React.FC<PropertyProps> = ({
  property,
  markFavorite,
  onDelete, // Accept onDelete prop
  showEditDeleteButtons = false, // Default to false
}) => {
  const editProperty = useEditPropertyModal(); // Access the modal hook
  const router = useRouter();
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  const images = [
    property.image_url,
    ...(Array.isArray(property.property_images)
      ? property.property_images.map((img) =>
          typeof img === "string" ? img : img.image_url
        )
      : []),
  ];



  return (
    <>
      <div className="cursor-pointer">
        <div className="relative overflow-hidden aspect-square rounded-xl">
          <Slider {...settings}>
            {images.map((image, index) => (
              <div key={index} className="relative w-full h-0 pb-[100%]">
                {image && (
                  <Image
                    src={image}
                    fill
                    sizes="(max-width: 768px) 768px, (max-width: 1200px) 768px, 768px"
                    className="hover:scale-110 object-cover transition h-full w-full"
                    alt={`Property Image ${index + 1}`}
                  />
                )}
              </div>
            ))}
          </Slider>
          {markFavorite && (
            <FavoriteButton
              id={property.id}
              is_favorite={property.is_favorite}
              markFavorite={(is_favorite) => markFavorite(is_favorite)}
            />
          )}
        </div>
        <div onClick={() => router.push(`/properties/${property.id}`)}>
          <div className="mt-2">
            <p className="text-lg font-bold">{property.title}</p>
          </div>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              <strong>${property.price_per_night}</strong> per night
            </p>
          </div>
        </div>

        {/* Edit and Delete buttons, shown only when showEditDeleteButtons is true */}
        {showEditDeleteButtons && (
          <div className="flex justify-between mt-4">
            <button
              onClick={editProperty.open} // Open the modal when clicked
              className="flex items-center px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              <MdEdit className="w-5 h-5 mr-2" />
              Edit
            </button>
            <button
              onClick={onDelete}
              className="flex items-center px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              <MdDelete className="w-5 h-5 mr-2" />
              Delete
            </button>
          </div>
        )}
      </div>
      {editProperty.isOpen && (
        <EditPropertyModal property={property}/>
      )}
    </>
  );
};

export default PropertyListItem;
