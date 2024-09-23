"use client";

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
        let url = "http://localhost:8000/api/properties/";
        await fetch(url,{
            method:"GET"
        })
        .then(response => response.json())
        .then((json)=>{
            console.log('json',json);
            setProperties(json.data)
            
        })
        .catch((error)=>{
            console.log(error);
            
        })
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
