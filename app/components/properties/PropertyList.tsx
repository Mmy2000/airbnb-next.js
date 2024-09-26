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


export type PropertyType = {
  id: string;
  title: string;
  image_url: string;
  price_per_night: number;
  property_images:string;
  is_favorite: boolean;
};
interface PropertyListProps {
  landlord_id?: string | null;
  favorites?: boolean | null;
  userId?: string | null;
}

const PropertyList: React.FC<PropertyListProps> = ({ landlord_id, userId,favorites }) => {

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

  const markFavorite = (id: string, is_favorite: boolean) => {
    const tmpProperties = properties.map((property: PropertyType) => {
      if (userId) {
        if (property.id == id) {
          property.is_favorite = is_favorite;

          if (is_favorite) {
            toast.success("Added to Favorite Propreties");
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
        if (tmpProperties.favorites.includes(property.id)) {
          property.is_favorite = true;
        } else {
          property.is_favorite = false;
        }

        return property;
      })
    );
    setLoading(false); // Stop loading
  };

  useEffect(() => {
    getProperties();
  }, [category, searchModal.query,params]);

  if (loading) {
    // Show spinner
    return <Spinner />;
  }

  return (
    <>
      {properties.map((property) => (
        <PropertyListItem
          markFavorite={(is_favorite: any) =>
            markFavorite(property.id, is_favorite)
          }
          key={property.id}
          property={property}
        />
      ))}
    </>
  );
};

export default PropertyList;
