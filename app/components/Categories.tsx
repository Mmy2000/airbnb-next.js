"use client";

import Image from "next/image";
import useSearchModal , {SearchQuery} from "../hooks/useSearchModal";
import { useState } from "react";

const Categories = () => {
  const searchModal = useSearchModal();
  const [category, setCategory] = useState("");

  const _setCategory = (_category: string) => {
    setCategory(_category);

    const query: SearchQuery = {
      country: searchModal.query.country,
      checkIn: searchModal.query.checkIn,
      checkOut: searchModal.query.checkOut,
      guests: searchModal.query.guests,
      bedrooms: searchModal.query.bedrooms,
      bathrooms: searchModal.query.bathrooms,
      category: _category,
    };

    searchModal.setQuery(query);
  };

  return (
    <div className="pt-3 cursor-pointer pb-3 flex items-center space-x-12">
      <div
        onClick={() => _setCategory("")}
        className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${
          category == "" ? "border-black" : "border-white"
        } opacity-60 hover:border-gray-200 hover:opacity-100`}
      >
        <Image
          src="/3e5243c8-4d15-4c6b-97e3-7ba2bb7bb880.png"
          alt="Category - Beach"
          width={20}
          height={20}
        />

        <span className="text-xs">All</span>
      </div>
      <div
        onClick={() => _setCategory("Beach")}
        className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${
          category == "Beach" ? "border-black" : "border-white"
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
        onClick={() => _setCategory("Villas")}
        className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${
          category == "Villas" ? "border-black" : "border-white"
        } opacity-60 hover:border-gray-200 hover:opacity-100`}
      >
        <Image
          src="/8e507f16-4943-4be9-b707-59bd38d56309.jpg"
          alt="Category - Beach"
          width={20}
          height={20}
        />

        <span className="text-xs">Villas</span>
      </div>
      <div
        onClick={() => _setCategory("Tiny homes")}
        className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${
          category == "Tiny homes" ? "border-black" : "border-white"
        } opacity-60 hover:border-gray-200 hover:opacity-100`}
      >
        <Image
          src="/3271df99-f071-4ecf-9128-eb2d2b1f50f0.jpg"
          alt="Category - Beach"
          width={20}
          height={20}
        />

        <span className="text-xs">Tiny homes</span>
      </div>
      <div
        onClick={() => _setCategory("OMG!")}
        className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${
          category == "OMG!" ? "border-black" : "border-white"
        } opacity-60 hover:border-gray-200 hover:opacity-100`}
      >
        <Image
          src="/c8e2ed05-c666-47b6-99fc-4cb6edcde6b4.jpg"
          alt="Category - Beach"
          width={20}
          height={20}
        />

        <span className="text-xs">OMG!</span>
      </div>
      <div
        onClick={() => _setCategory("Homes")}
        className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${
          category == "Homes" ? "border-black" : "border-white"
        } opacity-60 hover:border-gray-200 hover:opacity-100`}
      >
        <Image
          src="/7630c83f-96a8-4232-9a10-0398661e2e6f.jpg"
          alt="Category - Beach"
          width={20}
          height={20}
        />

        <span className="text-xs">Homes</span>
      </div>
      <div
        onClick={() => _setCategory("Cabins")}
        className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${
          category == "Cabins" ? "border-black" : "border-white"
        } opacity-60 hover:border-gray-200 hover:opacity-100`}
      >
        <Image
          src="/732edad8-3ae0-49a8-a451-29a8010dcc0c.jpg"
          alt="Category - Beach"
          width={20}
          height={20}
        />

        <span className="text-xs">Cabins</span>
      </div>
      <div
        onClick={() => _setCategory("Amazing Views")}
        className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${
          category == "Amazing Views" ? "border-black" : "border-white"
        } opacity-60 hover:border-gray-200 hover:opacity-100`}
      >
        <Image
          src="/3b1eb541-46d9-4bef-abc4-c37d77e3c21b.jpg"
          alt="Category - Beach"
          width={20}
          height={20}
        />

        <span className="text-xs">Amazing Views</span>
      </div>
      <div
        onClick={() => _setCategory("Luxe")}
        className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${
          category == "Luxe" ? "border-black" : "border-white"
        } opacity-60 hover:border-gray-200 hover:opacity-100`}
      >
        <Image
          src="/c8e2ed05-c666-47b6-99fc-4cb6edcde6b4.jpg"
          alt="Category - Beach"
          width={20}
          height={20}
        />

        <span className="text-xs">Luxe</span>
      </div>
      <div
        onClick={() => _setCategory("Arctic")}
        className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${
          category == "Arctic" ? "border-black" : "border-white"
        } opacity-60 hover:border-gray-200 hover:opacity-100`}
      >
        <Image
          src="/8b44f770-7156-4c7b-b4d3-d92549c8652f.jpg"
          alt="Category - Beach"
          width={20}
          height={20}
        />

        <span className="text-xs">Arctic</span>
      </div>
      <div
        onClick={() => _setCategory("Lakefront")}
        className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${
          category == "Lakefront" ? "border-black" : "border-white"
        } opacity-60 hover:border-gray-200 hover:opacity-100`}
      >
        <Image
          src="/677a041d-7264-4c45-bb72-52bff21eb6e8.jpg"
          alt="Category - Beach"
          width={20}
          height={20}
        />

        <span className="text-xs">Lakefront</span>
      </div>
      <div
        onClick={() => _setCategory("Windmils")}
        className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${
          category == "Windmils" ? "border-black" : "border-white"
        } opacity-60 hover:border-gray-200 hover:opacity-100`}
      >
        <Image
          src="/5cdb8451-8f75-4c5f-a17d-33ee228e3db8.jpg"
          alt="Category - Beach"
          width={20}
          height={20}
        />

        <span className="text-xs">Windmils</span>
      </div>
    </div>
  );
};

export default Categories;
