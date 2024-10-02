"use client";

import apiService from "@/app/services/apiService";
import PropertyListItem from "./PropertyListItem";
import { useEffect, useState } from "react";
import Spinner from "../Spinner";
import { toast } from "react-toastify";
import useLoginModal from "@/app/hooks/useLoginModal";
import useSearchModal from "@/app/hooks/useSearchModal";
import { format } from "date-fns";
import { useSearchParams } from "next/navigation";
import ConfirmModal from "../modal/ConfirmModal"; // Import the ConfirmModal component
import React from "react";
import { SelectCountryValue } from "../forms/SelectCountry";

export type PropertyType = {
  country_code: string;
  id: string;
  title: string;
  image_url: string;
  images?: [];
  price_per_night: number;
  property_images: string;
  is_favorite: boolean;
  description?: string;
  category?: string;
  bedrooms?: number;
  bathrooms?: number;
  guests?: number;
  country?: SelectCountryValue;
};

interface PropertyListProps {
  landlord_id?: string | null;
  favorites?: boolean | null;
  userId?: string | null;
  showEditDeleteButtons?: boolean;
}

const PropertyList: React.FC<PropertyListProps> = ({
  landlord_id,
  userId,
  favorites,
  showEditDeleteButtons,
}) => {
  const loginModal = useLoginModal();
  const searchModal = useSearchModal();

  const params = useSearchParams();
  const country = searchModal.query.country;
  const numGuests = searchModal.query.guests;
  const numBathrooms = searchModal.query.bathrooms;
  const numBedrooms = searchModal.query.bedrooms;
  const checkinDate = searchModal.query.checkIn;
  const checkoutDate = searchModal.query.checkOut;
  const category = searchModal.query.category;

  const [properties, setProperties] = useState<PropertyType[]>([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [propertyToDelete, setPropertyToDelete] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const markFavorite = (id: string, is_favorite: boolean) => {
    const tmpProperties = properties.map((property: PropertyType) => {
      if (userId) {
        if (property.id === id) {
          property.is_favorite = is_favorite;

          if (is_favorite) {
            toast.success("Added to Favorite Properties");
          } else {
            toast.success("Removed from Favorite");
          }
        }
      } else {
        loginModal.open();
      }

      return property;
    });

    setProperties(tmpProperties);
  };

  const handleDelete = async () => {
    if (propertyToDelete) {
      try {
        await apiService.delete(`/api/properties/${propertyToDelete}/delete/`);

        // Remove the deleted property from the state
        setProperties((prevProperties) =>
          prevProperties.filter((property) => property.id !== propertyToDelete)
        );

        toast.success("Property deleted successfully!");
      } catch (error) {
        console.error("Error deleting property:", error);
        toast.error("Failed to delete property. Please try again.");
      } finally {
        setShowConfirmModal(false); // Close the modal after deletion
        setPropertyToDelete(null); // Clear the selected property
      }
    }
  };

  const getProperties = async () => {
    setLoading(true); // Start loading

    let url = "/api/properties/";

    if (landlord_id) {
      url += `?landlord_id=${landlord_id}`;
    } else if (favorites) {
      url += "?is_favorites=true";
    } else {
      let urlQuery = "";

      if (country) {
        urlQuery += "&country=" + country;
      }

      if (numGuests) {
        urlQuery += "&numGuests=" + numGuests;
      }

      if (numBedrooms) {
        urlQuery += "&numBedrooms=" + numBedrooms;
      }

      if (numBathrooms) {
        urlQuery += "&numBathrooms=" + numBathrooms;
      }

      if (category) {
        urlQuery += "&category=" + category;
      }

      if (checkinDate) {
        urlQuery += "&checkin=" + format(checkinDate, "yyyy-MM-dd");
      }

      if (checkoutDate) {
        urlQuery += "&checkout=" + format(checkoutDate, "yyyy-MM-dd");
      }

      if (urlQuery.length) {
        console.log("Query:", urlQuery);

        urlQuery = "?" + urlQuery.substring(1);

        url += urlQuery;
      }
    }

    const tmpProperties = await apiService.get(url);

    setProperties(
      tmpProperties.data.map((property: PropertyType) => {
        property.is_favorite = tmpProperties.favorites.includes(property.id);
        return property;
      })
    );
    setLoading(false); // Stop loading
  };

  const showDeleteConfirmation = (propertyId: string) => {
    setPropertyToDelete(propertyId); // Store the property to delete
    setShowConfirmModal(true); // Show the confirmation modal
  };

  useEffect(() => {
    getProperties();
  }, [category, searchModal.query, params]);

  if (loading) {
    // Show spinner
    return <Spinner />;
  }

  return (
    <>
      {properties.map((property) => (
        <PropertyListItem
          key={property.id}
          property={property}
          markFavorite={(is_favorite: boolean) =>
            markFavorite(property.id, is_favorite)
          }
          onDelete={() => showDeleteConfirmation(property.id)} // Use the new function
          showEditDeleteButtons={showEditDeleteButtons} // Pass prop here
        />
      ))}

      {/* Render the confirmation modal */}
      <ConfirmModal
        show={showConfirmModal}
        onConfirm={handleDelete}
        onCancel={() => setShowConfirmModal(false)}
        title="Delete Property"
        message="Are you sure you want to delete this property? This action cannot be undone."
      />
    </>
  );
};

export default PropertyList;
