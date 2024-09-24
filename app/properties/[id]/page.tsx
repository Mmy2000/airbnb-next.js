'use client'
import ReservationSidebar from "@/app/components/properties/ReservationSidebar";
import Image from "next/image";
import apiService from "@/app/services/apiService";
import { getUserId } from "@/app/lib/actions";
import Link from "next/link";
import { useEffect, useState } from "react";
import SkeletonLoader from "@/app/components/SkeletonLoader";



const PropertyDetailPage = ({ params }: { params: { id: string } }) => {
  const [property, setProperty] = useState<any>(null); // Specify any type or a more specific type for property
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

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
    return <div>Error: Property not found.</div>; // Optional error handling
  }

  return (
    <main className="max-w-[1200px] mx-auto px-6 pb-6">
      {/* Image Section */}
      <div className="w-full h-[60vh] md:h-[64vh] mb-4 overflow-hidden rounded-xl relative">
        <Image
          fill
          src={property.image_url}
          className="object-cover w-full h-full"
          alt="Beach house"
        />
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
