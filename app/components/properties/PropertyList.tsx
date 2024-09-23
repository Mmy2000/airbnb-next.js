"use client";

import apiService from "@/app/services/apiService";
import PropertyListItem from "./PropertyListItem";
import { useEffect, useState } from "react";


export type PropertyType = {
  id: string;
  title: string;
  image_url: string;
  price_per_night: number;
  is_favorite: boolean;
};

const PropertyList = () => {

    const [properties, setProperties] = useState<PropertyType[]>([]);

    const getProperties = async ()=>{
        let url = "/api/properties/";
        const tmpProperties = await apiService.get(url);
        setProperties(tmpProperties.data)
    }

    useEffect(() => {
      getProperties();
    }, []);
  return (
    <>
      {properties.map((property) => {
        return (
          <PropertyListItem
            key={property.id}
            property={property}
          />
        );
      })}
    </>
  );
};

export default PropertyList;
