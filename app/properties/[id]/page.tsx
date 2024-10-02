"use client";

import ReservationSidebar from "@/app/components/properties/ReservationSidebar";
import Image from "next/image";
import apiService from "@/app/services/apiService";
import { getUserId } from "@/app/lib/actions";
import Link from "next/link";
import { useEffect, useState } from "react";
import SkeletonLoader from "@/app/components/SkeletonLoader";
import Slider from "react-slick";
import useLoginModal from "@/app/hooks/useLoginModal";


const PropertyDetailPage = ({ params }: { params: { id: string } }) => {
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const loginModal = useLoginModal()
  const handleLoginClick = () => {
    loginModal.open(); // Open login modal when userId is not present
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedProperty = await apiService.get(
          `/api/properties/${params.id}`
        );
        const fetchedUserId = await getUserId();
        setProperty(fetchedProperty);
        setUserId(fetchedUserId);
      } catch (error) {
        console.error("Failed to load property data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  if (loading) {
    return <SkeletonLoader />;
  }

  // Check if property is not null before accessing its properties
  if (!property) {
    return <div>Error: Property not found.</div>;
  }

  const settings = {
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
      ? property.property_images.map((img: any) =>
          typeof img === "string" ? img : img.image_url
        )
      : []),
  ];

  return (
    <main className="max-w-[1200px] mx-auto px-6 pb-6">
      {/* Image Section */}
      <div className="w-full h-[60vh] md:h-[64vh] mb-4 overflow-hidden rounded-xl relative">
        <Slider {...settings}>
          {images.map((image: string, index: number) => (
            <div key={index} className="relative w-full h-[60vh] md:h-[64vh]">
              {image && (
                <Image
                  src={image}
                  fill
                  className="object-cover"
                  alt={`Property Image ${index + 1}`}
                />
              )}
            </div>
          ))}
        </Slider>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Left Content (Property Details) */}
        <div className="py-6 pr-6 col-span-3">
          <h1 className="mb-4 text-4xl">{property.title}</h1>

          <span className="mb-6 block text-lg text-gray-600">
            {property.guests} guests - {property.bedrooms} bedrooms -{" "}
            {property.bathrooms} bathrooms
          </span>

          <hr />

          {/* Host Information */}
          {userId ? (
            <Link
              href={`/landlords/${property.landlord.id}`}
              className="py-6 flex items-center space-x-4"
            >
              <Image
                src={property.landlord.avatar_url || `/profile_pic_1.jpg`}
                width={50}
                height={50}
                className="rounded-full"
                alt={property.landlord.name}
              />
              <p>
                <strong>{property.landlord.name}</strong> is your host
              </p>
            </Link>
          ) : (
            <div
              onClick={handleLoginClick}
              className="py-6 flex items-center space-x-4 cursor-pointer"
            >
              <Image
                src={property.landlord.avatar_url || `/profile_pic_1.jpg`}
                width={50}
                height={50}
                className="rounded-full"
                alt={property.landlord.name}
              />
              <p>
                <strong>{property.landlord.name}</strong> is your host
              </p>
            </div>
          )}

          <hr />

          {/* Property Description */}
          <p className="mt-6 text-lg">{property.description}</p>
        </div>

        {/* Sidebar Component (Reservation) */}
        <div className="col-span-2">
          <ReservationSidebar property={property} userId={userId} />
        </div>
      </div>
    </main>
  );
};

export default PropertyDetailPage;
