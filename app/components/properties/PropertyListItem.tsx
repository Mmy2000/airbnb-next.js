import Image from "next/image";
import { PropertyType } from "./PropertyList";
import { useRouter } from "next/navigation";
import FavoriteButton from "../FavoriteButton";
import Slider from "react-slick";

interface PropertyProps {
  property: PropertyType;
  markFavorite?: (is_favorite: boolean) => void;
}

const PropertyListItem: React.FC<PropertyProps> = ({
  property,
  markFavorite,
}) => {
  const router = useRouter();
  var settings = {
    dots: true, // Enables dots
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Optional: Automatically transitions between slides
    autoplaySpeed: 3000, // Duration of autoplay in milliseconds
    arrows: true, // Shows left/right arrows
  };
  const images = [
    property.image_url, // Main image
    ...(Array.isArray(property.property_images)
      ? property.property_images.map(
          (img) => (typeof img === "string" ? img : img.image_url) // Handle case for objects
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
      </div>
    </>
  );
};

export default PropertyListItem;
