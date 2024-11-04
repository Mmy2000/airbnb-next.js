// "use client";

// import Image from "next/image";
// import useSearchModal , {SearchQuery} from "../hooks/useSearchModal";
// import { useState } from "react";

// const Categories = () => {
//   const searchModal = useSearchModal();
//   const [category, setCategory] = useState("");

//   const _setCategory = (_category: string) => {
//     setCategory(_category);

//     const query: SearchQuery = {
//       country: searchModal.query.country,
//       checkIn: searchModal.query.checkIn,
//       checkOut: searchModal.query.checkOut,
//       guests: searchModal.query.guests,
//       bedrooms: searchModal.query.bedrooms,
//       bathrooms: searchModal.query.bathrooms,
//       category: _category,
//     };

//     searchModal.setQuery(query);
//   };

//   return (
//     <div className="pt-3 cursor-pointer pb-3 flex items-center space-x-12">
//       <div
//         onClick={() => _setCategory("")}
//         className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${
//           category == "" ? "border-black" : "border-white"
//         } opacity-60 hover:border-gray-200 hover:opacity-100`}
//       >
//         <Image
//           src="/3e5243c8-4d15-4c6b-97e3-7ba2bb7bb880.png"
//           alt="Category - Beach"
//           width={20}
//           height={20}
//         />

//         <span className="text-xs">All</span>
//       </div>
//       <div
//         onClick={() => _setCategory("Beach")}
//         className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${
//           category == "Beach" ? "border-black" : "border-white"
//         } opacity-60 hover:border-gray-200 hover:opacity-100`}
//       >
//         <Image
//           src="/icn_category_beach.jpeg"
//           alt="Category - Beach"
//           width={20}
//           height={20}
//         />

//         <span className="text-xs">Beach</span>
//       </div>
//       <div
//         onClick={() => _setCategory("Villas")}
//         className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${
//           category == "Villas" ? "border-black" : "border-white"
//         } opacity-60 hover:border-gray-200 hover:opacity-100`}
//       >
//         <Image
//           src="/8e507f16-4943-4be9-b707-59bd38d56309.jpg"
//           alt="Category - Beach"
//           width={20}
//           height={20}
//         />

//         <span className="text-xs">Villas</span>
//       </div>
//       <div
//         onClick={() => _setCategory("Tiny homes")}
//         className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${
//           category == "Tiny homes" ? "border-black" : "border-white"
//         } opacity-60 hover:border-gray-200 hover:opacity-100`}
//       >
//         <Image
//           src="/3271df99-f071-4ecf-9128-eb2d2b1f50f0.jpg"
//           alt="Category - Beach"
//           width={20}
//           height={20}
//         />

//         <span className="text-xs">Tiny homes</span>
//       </div>
//       <div
//         onClick={() => _setCategory("OMG!")}
//         className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${
//           category == "OMG!" ? "border-black" : "border-white"
//         } opacity-60 hover:border-gray-200 hover:opacity-100`}
//       >
//         <Image
//           src="/c8e2ed05-c666-47b6-99fc-4cb6edcde6b4.jpg"
//           alt="Category - Beach"
//           width={20}
//           height={20}
//         />

//         <span className="text-xs">OMG!</span>
//       </div>
//       <div
//         onClick={() => _setCategory("Homes")}
//         className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${
//           category == "Homes" ? "border-black" : "border-white"
//         } opacity-60 hover:border-gray-200 hover:opacity-100`}
//       >
//         <Image
//           src="/7630c83f-96a8-4232-9a10-0398661e2e6f.jpg"
//           alt="Category - Beach"
//           width={20}
//           height={20}
//         />

//         <span className="text-xs">Homes</span>
//       </div>
//       <div
//         onClick={() => _setCategory("Cabins")}
//         className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${
//           category == "Cabins" ? "border-black" : "border-white"
//         } opacity-60 hover:border-gray-200 hover:opacity-100`}
//       >
//         <Image
//           src="/732edad8-3ae0-49a8-a451-29a8010dcc0c.jpg"
//           alt="Category - Beach"
//           width={20}
//           height={20}
//         />

//         <span className="text-xs">Cabins</span>
//       </div>
//       <div
//         onClick={() => _setCategory("Amazing Views")}
//         className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${
//           category == "Amazing Views" ? "border-black" : "border-white"
//         } opacity-60 hover:border-gray-200 hover:opacity-100`}
//       >
//         <Image
//           src="/3b1eb541-46d9-4bef-abc4-c37d77e3c21b.jpg"
//           alt="Category - Beach"
//           width={20}
//           height={20}
//         />

//         <span className="text-xs">Amazing Views</span>
//       </div>
//       <div
//         onClick={() => _setCategory("Luxe")}
//         className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${
//           category == "Luxe" ? "border-black" : "border-white"
//         } opacity-60 hover:border-gray-200 hover:opacity-100`}
//       >
//         <Image
//           src="/c8e2ed05-c666-47b6-99fc-4cb6edcde6b4.jpg"
//           alt="Category - Beach"
//           width={20}
//           height={20}
//         />

//         <span className="text-xs">Luxe</span>
//       </div>
//       <div
//         onClick={() => _setCategory("Arctic")}
//         className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${
//           category == "Arctic" ? "border-black" : "border-white"
//         } opacity-60 hover:border-gray-200 hover:opacity-100`}
//       >
//         <Image
//           src="/8b44f770-7156-4c7b-b4d3-d92549c8652f.jpg"
//           alt="Category - Beach"
//           width={20}
//           height={20}
//         />

//         <span className="text-xs">Arctic</span>
//       </div>
//       <div
//         onClick={() => _setCategory("Lakefront")}
//         className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${
//           category == "Lakefront" ? "border-black" : "border-white"
//         } opacity-60 hover:border-gray-200 hover:opacity-100`}
//       >
//         <Image
//           src="/677a041d-7264-4c45-bb72-52bff21eb6e8.jpg"
//           alt="Category - Beach"
//           width={20}
//           height={20}
//         />

//         <span className="text-xs">Lakefront</span>
//       </div>
//       <div
//         onClick={() => _setCategory("Windmils")}
//         className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${
//           category == "Windmils" ? "border-black" : "border-white"
//         } opacity-60 hover:border-gray-200 hover:opacity-100`}
//       >
//         <Image
//           src="/5cdb8451-8f75-4c5f-a17d-33ee228e3db8.jpg"
//           alt="Category - Beach"
//           width={20}
//           height={20}
//         />

//         <span className="text-xs">Windmils</span>
//       </div>
//     </div>
//   );
// };

// export default Categories;


"use client";

import Image from "next/image";
import useSearchModal, { SearchQuery } from "../hooks/useSearchModal";
import { useState } from "react";
import Slider from "react-slick";

const Categories = () => {
  const searchModal = useSearchModal();
  const [category, setCategory] = useState("");

  const _setCategory = (_category: string) => {
    setCategory(_category);

    const query: SearchQuery = {
      country: searchModal.query.country,
      city: searchModal.query.city,
      checkIn: searchModal.query.checkIn,
      checkOut: searchModal.query.checkOut,
      guests: searchModal.query.guests,
      bedrooms: searchModal.query.bedrooms,
      bathrooms: searchModal.query.bathrooms,
      category: _category,
    };

    searchModal.setQuery(query);
  };
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 12, // Show 5 categories at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 768, // For mobile devices (768px or smaller)
        settings: {
          slidesToShow: 5, // Show 5 items on mobile screens
        },
      },
      {
        breakpoint: 1024, // For tablets and small laptops
        settings: {
          slidesToShow: 8, // Show 8 items for medium screens
        },
      },
      {
        breakpoint: 1280, // For large desktops
        settings: {
          slidesToShow: 12, // Default setting for large screens
        },
      },
    ],
  };
  const categoryItems = [
    { name: "All", image: "/3e5243c8-4d15-4c6b-97e3-7ba2bb7bb880.png" },
    { name: "Beach", image: "/icn_category_beach.jpeg" },
    { name: "Rooms", image: "/8e507f16-4943-4be9-b707-59bd38d56309.jpg" },
    { name: "Tiny homes", image: "/3271df99-f071-4ecf-9128-eb2d2b1f50f0.jpg" },
    { name: "OMG!", image: "/c8e2ed05-c666-47b6-99fc-4cb6edcde6b4.jpg" },
    { name: "Homes", image: "/7630c83f-96a8-4232-9a10-0398661e2e6f.jpg" },
    { name: "Cabins", image: "/732edad8-3ae0-49a8-a451-29a8010dcc0c.jpg" },
    {
      name: "Amazing Views",
      image: "/3b1eb541-46d9-4bef-abc4-c37d77e3c21b.jpg",
    },
    { name: "Luxe", image: "/c8e2ed05-c666-47b6-99fc-4cb6edcde6b4.jpg" },
    { name: "Arctic", image: "/8b44f770-7156-4c7b-b4d3-d92549c8652f.jpg" },
    { name: "Lakefront", image: "/677a041d-7264-4c45-bb72-52bff21eb6e8.jpg" },
    { name: "Windmills", image: "/5cdb8451-8f75-4c5f-a17d-33ee228e3db8.jpg" },
  ];
  const fixedCategories = categoryItems.slice(0, 1);
  const scrollableCategories = categoryItems.slice(1);

  return (
    <div className="pt-3 cursor-pointer flex pb-3">
      {/* Fixed Categories */}
      <div className="flex me-8  mb-4">
        <div
          onClick={() => _setCategory("")}
          className={`pb-4 dev2 flex-col items-center space-y-2 border-b-2 ${
            category === "" ? "border-black" : "border-transparent"
          } opacity-60 hover:border-gray-300 hover:opacity-100 transition duration-300`}
        >
          <Image
            src="/3e5243c8-4d15-4c6b-97e3-7ba2bb7bb880.png"
            alt="Category - Beach"
            width={90}
            height={90}
            className="hover:scale-110 transition-transform duration-200 ease-in-out"
          />
          <span className="text-xs ">All</span>
        </div>
      </div>

      {/* Scrollable or "more" categories */}
      <div className="overflow-x-auto">
        <div className="">
          <Slider {...settings}>
            {scrollableCategories.map((item) => (
              <div
                key={item.name}
                onClick={() => _setCategory(item.name)}
                className={`pb-4 dev2 flex-col items-center space-y-2 border-b-2 ${
                  category === item.name ? "border-black" : "border-transparent"
                } opacity-60 hover:border-gray-300 hover:opacity-100 transition duration-300`}
              >
                <Image
                  src={item.image}
                  alt={`Category - ${item.name}`}
                  width={30}
                  height={30}
                  className="hover:scale-110 transition-transform duration-200 ease-in-out"
                />
                <span className="text-xs">{item.name}</span>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Categories;
