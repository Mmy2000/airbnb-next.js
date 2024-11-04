// "use client";

// import useSearchModal from "@/app/hooks/useSearchModal";

// const SearchFilters = () => {
//   const searchModal = useSearchModal();

//   return (
//     <div
//       onClick={() => searchModal.open("location")}
//       className="h-[64px] w-full max-w-[900px] mx-auto flex items-center justify-between shadow-md border rounded-full bg-white hover:shadow-lg transition-shadow duration-300 cursor-pointer"
//     >
//       <div className="hidden lg:flex w-full">
//         <div className="flex flex-row items-center justify-between w-full">
//           {/* Where */}
//           <div className="flex-1 h-[64px] px-6 flex flex-col justify-center items-start hover:bg-gray-100 transition-all duration-200 ease-in-out rounded-full">
//             <p className="text-xs font-semibold text-gray-600">Where</p>
//             <p className="text-sm text-gray-400">Search location</p>
//           </div>

//           {/* Divider */}
//           <div className="w-px h-[50%] bg-gray-300" />

//           {/* Check In */}
//           <div className="flex-1 h-[64px] px-6 flex flex-col justify-center items-start hover:bg-gray-100 transition-all duration-200 ease-in-out rounded-full">
//             <p className="text-xs font-semibold text-gray-600">Check-in</p>
//             <p className="text-sm text-gray-400">Add dates</p>
//           </div>

//           {/* Divider */}
//           <div className="w-px h-[50%] bg-gray-300" />

//           {/* Check Out */}
//           <div className="flex-1 h-[64px] px-6 flex flex-col justify-center items-start hover:bg-gray-100 transition-all duration-200 ease-in-out rounded-full">
//             <p className="text-xs font-semibold text-gray-600">Check-out</p>
//             <p className="text-sm text-gray-400">Add dates</p>
//           </div>

//           {/* Divider */}
//           <div className="w-px h-[50%] bg-gray-300" />

//           {/* Guests */}
//           <div className="flex-1 h-[64px] px-6 flex flex-col justify-center items-start hover:bg-gray-100 transition-all duration-200 ease-in-out rounded-full">
//             <p className="text-xs font-semibold text-gray-600">Who</p>
//             <p className="text-sm text-gray-400">Add guests</p>
//           </div>
//         </div>
//       </div>

//       {/* Search Button */}
//       <div className="p-3 flex items-center justify-center bg-airbnb hover:bg-airbnb-dark transition-all duration-300 rounded-full text-white">
//         <svg
//           viewBox="0 0 32 32"
//           className="h-5 w-5"
//           stroke="currentColor"
//           strokeWidth={3}
//           fill="none"
//           aria-hidden="true"
//           role="presentation"
//           focusable="false"
//         >
//           <path d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9" />
//         </svg>
//       </div>
//     </div>
//   );
// };

// export default SearchFilters;

"use client";

import useSearchModal from "@/app/hooks/useSearchModal";
import { format } from "date-fns"; // Import the format function to format dates

const SearchFilters = () => {
  const searchModal = useSearchModal();
  const { query } = searchModal;

  // Format location, check-in/check-out dates, and guest counts based on the query state
  const locationDisplay = query.country || query.city || "Search location";
  const checkInDisplay = query.checkIn
    ? format(new Date(query.checkIn), "MMM dd")
    : "Add dates";
  const checkOutDisplay = query.checkOut
    ? format(new Date(query.checkOut), "MMM dd")
    : "Add dates";
  const guestsDisplay =
    query.guests >= 1
      ? `${query.guests} guests`
      : 
      "Add guests";

  return (
    <div
      onClick={() => searchModal.open("location")}
      className="h-[64px] w-full max-w-[900px] mx-auto flex items-center justify-between shadow-md border rounded-full bg-white hover:shadow-lg transition-shadow duration-300 cursor-pointer"
    >
      <div className="hidden lg:flex w-full">
        <div className="flex flex-row items-center justify-between w-full">
          {/* Where */}
          <div className="flex-1 h-[64px] px-6 flex flex-col justify-center items-start hover:bg-gray-100 transition-all duration-200 ease-in-out rounded-full">
            <p className="text-xs font-semibold text-gray-600">Where</p>
            <p className="text-sm text-gray-400">{locationDisplay}{query.city? `,${query.city}`:null}</p>
          </div>

          {/* Divider */}
          <div className="w-px h-[50%] bg-gray-300" />

          {/* Check In */}
          <div className="flex-1 h-[64px] px-6 flex flex-col justify-center items-start hover:bg-gray-100 transition-all duration-200 ease-in-out rounded-full">
            <p className="text-xs font-semibold text-gray-600">Check-in</p>
            <p className="text-sm text-gray-400">{checkInDisplay}</p>
          </div>

          {/* Divider */}
          <div className="w-px h-[50%] bg-gray-300" />

          {/* Check Out */}
          <div className="flex-1 h-[64px] px-6 flex flex-col justify-center items-start hover:bg-gray-100 transition-all duration-200 ease-in-out rounded-full">
            <p className="text-xs font-semibold text-gray-600">Check-out</p>
            <p className="text-sm text-gray-400">{checkOutDisplay}</p>
          </div>

          {/* Divider */}
          <div className="w-px h-[50%] bg-gray-300" />

          {/* Guests */}
          <div className="flex-1 h-[64px] px-6 flex flex-col justify-center items-start hover:bg-gray-100 transition-all duration-200 ease-in-out rounded-full">
            <p className="text-xs font-semibold text-gray-600">Who</p>
            <p className="text-sm text-gray-400">{guestsDisplay}</p>
          </div>
        </div>
      </div>

      {/* Search Button */}
      <div className="p-3 flex items-center justify-center bg-airbnb hover:bg-airbnb-dark transition-all duration-300 rounded-full text-white">
        <svg
          viewBox="0 0 32 32"
          className="h-5 w-5"
          stroke="currentColor"
          strokeWidth={3}
          fill="none"
          aria-hidden="true"
          role="presentation"
          focusable="false"
        >
          <path d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9" />
        </svg>
      </div>
    </div>
  );
};

export default SearchFilters;
