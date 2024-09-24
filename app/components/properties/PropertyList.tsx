"use client";

import apiService from "@/app/services/apiService";
import PropertyListItem from "./PropertyListItem";
import { useEffect, useState } from "react";
import Spinner from "../Spinner";
import { toast } from "react-toastify";
import useLoginModal from "@/app/hooks/useLoginModal";

export type PropertyType = {
  id: string;
  title: string;
  image_url: string;
  price_per_night: number;
  is_favorite: boolean;
};
interface PropertyListProps {
  landlord_id?: string | null;
  favorites?: boolean | null;
  userId: string | null;
}

const PropertyList: React.FC<PropertyListProps> = ({ landlord_id, userId }) => {
  const loginModal = useLoginModal();
  const [properties, setProperties] = useState<PropertyType[]>([]);
  const [loading, setLoading] = useState(true); // Loading state
  const markFavorite = (id: string, is_favorite: boolean) => {
    const tmpProperties = properties.map((property: PropertyType) => {
      if (userId) {
        if (property.id == id) {
          property.is_favorite = is_favorite;

          if (is_favorite) {
            toast.success("added to list of favorite propreties");
          } else {
            toast.success("removed from favorite propreties");
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
  }, []);

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
