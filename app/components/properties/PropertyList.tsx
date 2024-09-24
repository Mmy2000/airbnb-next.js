"use client";

import apiService from "@/app/services/apiService";
import PropertyListItem from "./PropertyListItem";
import { useEffect, useState } from "react";
import Spinner from "../Spinner";


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
}

const PropertyList: React.FC<PropertyListProps> = ({landlord_id}) => {
  const [properties, setProperties] = useState<PropertyType[]>([]);
  const [loading, setLoading] = useState(true); // Loading state

  const getProperties = async () => {
    setLoading(true); // Start loading
    let url = "/api/properties/";
    if (landlord_id) {
      url += `?landlord_id=${landlord_id}`;
    }
    const tmpProperties = await apiService.get(url);
    setProperties(tmpProperties.data);
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
        <PropertyListItem key={property.id} property={property} />
      ))}
    </>
  );
};

export default PropertyList;
