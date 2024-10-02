import Image from "next/image";
import React from "react";

interface CategoriesProps {
  dataCategory?: string;
  setCategory: (category: string) => void;
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void; // Add this line
}

const Categories: React.FC<CategoriesProps> = ({
  dataCategory,
  setCategory,
  onCategoryChange, // Destructure it here
}) => {
  const handleCategoryChange = (category: string) => {
    setCategory(category);
    if (onCategoryChange) {
      onCategoryChange(category); // Call the onCategoryChange prop if provided
    }
  };

  return (
    <div className="pt-3 cursor-pointer pb-6 flex item-center space-x-12">
      <div
        onClick={() => handleCategoryChange("Beach")}
        className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${
          dataCategory === "Beach" ? "border-gray-800" : "border-white"
        } opacity-60 hover:border-gray-200 hover:opacity-100`}
      >
        <Image
          src="/icn_category_beach.jpeg"
          alt="Category - Beach"
          width={20}
          height={20}
        />
        <span className="text-xs">Beach</span>
      </div>
      <div
        onClick={() => handleCategoryChange("Villas")}
        className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${
          dataCategory === "Villas" ? "border-gray-800" : "border-white"
        } opacity-60 hover:border-gray-200 hover:opacity-100`}
      >
        <Image
          src="/8e507f16-4943-4be9-b707-59bd38d56309.jpg"
          alt="Category - Villas"
          width={20}
          height={20}
        />
        <span className="text-xs">Villas</span>
      </div>
      <div
        onClick={() => handleCategoryChange("Tiny homes")}
        className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${
          dataCategory === "Tiny homes" ? "border-gray-800" : "border-white"
        } opacity-60 hover:border-gray-200 hover:opacity-100`}
      >
        <Image
          src="/3271df99-f071-4ecf-9128-eb2d2b1f50f0.jpg"
          alt="Category - Tiny homes"
          width={20}
          height={20}
        />
        <span className="text-xs">Tiny homes</span>
      </div>
      <div
        onClick={() => handleCategoryChange("Cabins")}
        className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${
          dataCategory === "Cabins" ? "border-gray-800" : "border-white"
        } opacity-60 hover:border-gray-200 hover:opacity-100`}
      >
        <Image
          src="/732edad8-3ae0-49a8-a451-29a8010dcc0c.jpg"
          alt="Category - Cabins"
          width={20}
          height={20}
        />
        <span className="text-xs">Cabins</span>
      </div>
      <div
        onClick={() => handleCategoryChange("Luxe")}
        className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${
          dataCategory === "Luxe" ? "border-gray-800" : "border-white"
        } opacity-60 hover:border-gray-200 hover:opacity-100`}
      >
        <Image
          src="/c8e2ed05-c666-47b6-99fc-4cb6edcde6b4.jpg"
          alt="Category - Luxe"
          width={20}
          height={20}
        />
        <span className="text-xs">Luxe</span>
      </div>
      <div
        onClick={() => handleCategoryChange("Arctic")}
        className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${
          dataCategory === "Arctic" ? "border-gray-800" : "border-white"
        } opacity-60 hover:border-gray-200 hover:opacity-100`}
      >
        <Image
          src="/8b44f770-7156-4c7b-b4d3-d92549c8652f.jpg"
          alt="Category - Arctic"
          width={20}
          height={20}
        />
        <span className="text-xs">Arctic</span>
      </div>
      <div
        onClick={() => handleCategoryChange("Lakefront")}
        className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${
          dataCategory === "Lakefront" ? "border-gray-800" : "border-white"
        } opacity-60 hover:border-gray-200 hover:opacity-100`}
      >
        <Image
          src="/677a041d-7264-4c45-bb72-52bff21eb6e8.jpg"
          alt="Category - Lakefront"
          width={20}
          height={20}
        />
        <span className="text-xs">Lakefront</span>
      </div>
      <div
        onClick={() => handleCategoryChange("Windmils")}
        className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${
          dataCategory === "Windmils" ? "border-gray-800" : "border-white"
        } opacity-60 hover:border-gray-200 hover:opacity-100`}
      >
        <Image
          src="/5cdb8451-8f75-4c5f-a17d-33ee228e3db8.jpg"
          alt="Category - Windmils"
          width={20}
          height={20}
        />
        <span className="text-xs">Windmils</span>
      </div>
    </div>
  );
};

export default Categories;
