"use client";

import Modal from "./Modal";
import { useState, useMemo } from "react";
import { Range } from "react-date-range";
import DatePicker from "../forms/Calendar";
import CustomButton from "../forms/CustomButton";
import useSearchModal, { SearchQuery } from "@/app/hooks/useSearchModal";
import SelectCountry, { SelectCountryValue } from "../forms/SelectCountry";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

// Define a type for steps
type Step = "location" | "checkin" | "checkout" | "details";

const stepMessages: Record<Step, string> = {
  location: "Where do you want to go?",
  checkin: "When do you want to check in?",
  checkout: "When do you want to check out?",
  details: "Details",
};

const SearchModal = () => {
  const searchModal = useSearchModal();
  const [numGuests, setNumGuests] = useState<string>("1");
  const [numBedrooms, setNumBedrooms] = useState<string>("0");
  const [country, setCountry] = useState<SelectCountryValue>();
  const [numBathrooms, setNumBathrooms] = useState<string>("0");
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const steps: Step[] = ["location", "checkin", "checkout", "details"];
  const progress = useMemo(() => {
    const currentStepIndex = steps.indexOf(searchModal.step as Step);
    return ((currentStepIndex + 1) / steps.length) * 100;
  }, [searchModal.step]);

  const closeAndSearch = () => {
    const newSearchQuery: SearchQuery = {
      country: country?.label,
      checkIn: dateRange.startDate,
      checkOut: dateRange.endDate,
      guests: parseInt(numGuests),
      bedrooms: parseInt(numBedrooms),
      bathrooms: parseInt(numBathrooms),
      category: "",
    };

    searchModal.setQuery(newSearchQuery);
    searchModal.close();
  };

  const _setDateRange = (selection: Range) => {
    if (searchModal.step === "checkin") {
      searchModal.open("checkout");
    } else if (searchModal.step === "checkout") {
      searchModal.open("details");
    }

    setDateRange(selection);
  };

  // Contents for different steps
  const contentLocation = (
    <>
      <h2 className="mb-4 text-2xl font-semibold text-gray-800">
        {stepMessages.location}
      </h2>
      <SelectCountry
        value={country}
        onChange={(value) => setCountry(value as SelectCountryValue)}
      />
      <div className="mt-6 flex flex-row gap-4">
        <CustomButton
          label="Check in date ->"
          onClick={() => searchModal.open("checkin")}
          className="bg-airbnb text-white px-6 py-2 rounded-lg hover:bg-airbnb-dark transition"
        />
      </div>
    </>
  );

  const contentCheckin = (
    <>
      <h2 className="mb-4 text-2xl font-semibold text-gray-800">
        {stepMessages.checkin}
      </h2>
      <DatePicker
        value={dateRange}
        onChange={(value) => _setDateRange(value.selection)}
      />
      <div className="mt-6 flex flex-row gap-4">
        <CustomButton
          label="<- Location"
          onClick={() => searchModal.open("location")}
          className="bg-gray-500 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-700 transition"
        />
        <CustomButton
          label="Check out date ->"
          onClick={() => searchModal.open("checkout")}
          className="bg-airbnb text-white px-6 py-2 rounded-lg hover:bg-airbnb-dark transition"
        />
      </div>
    </>
  );

  const contentCheckout = (
    <>
      <h2 className="mb-4 text-2xl font-semibold text-gray-800">
        {stepMessages.checkout}
      </h2>
      <DatePicker
        value={dateRange}
        onChange={(value) => _setDateRange(value.selection)}
      />
      <div className="mt-6 flex flex-row gap-4">
        <CustomButton
          label="<- Check in date"
          onClick={() => searchModal.open("checkin")}
          className="bg-gray-500 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-700 transition"
        />
        <CustomButton
          label="Details ->"
          onClick={() => searchModal.open("details")}
          className="bg-airbnb text-white px-6 py-2 rounded-lg hover:bg-airbnb-dark transition"
        />
      </div>
    </>
  );

  const contentDetails = (
    <>
      <h2 className="mb-4 text-2xl font-semibold text-gray-800">{stepMessages.details}</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700">Number of guests:</label>
          <input
            type="number"
            min="1"
            value={numGuests}
            placeholder="Number of guests..."
            onChange={(e) => setNumGuests(e.target.value)}
            className="w-full h-14 px-4 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-gray-700">Number of bedrooms:</label>
          <input
            type="number"
            min="1"
            value={numBedrooms}
            placeholder="Number of bedrooms..."
            onChange={(e) => setNumBedrooms(e.target.value)}
            className="w-full h-14 px-4 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-gray-700">Number of bathrooms:</label>
          <input
            type="number"
            min="1"
            value={numBathrooms}
            placeholder="Number of bathrooms..."
            onChange={(e) => setNumBathrooms(e.target.value)}
            className="w-full h-14 px-4 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>
      <div className="mt-6 flex flex-row gap-4">
        <CustomButton
          label="<- Check out date"
          onClick={() => searchModal.open("checkout")}
          className="bg-gray-500 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-700 transition"
        />
        <CustomButton
          label="Search"
          onClick={closeAndSearch}
          className="bg-airbnb text-white px-6 py-2 rounded-lg hover:bg-airbnb-dark transition"
        />
      </div>
    </>
  );

  // Conditional rendering of content based on step
  let content = <></>;
  if (searchModal.step === "location") {
    content = contentLocation;
  } else if (searchModal.step === "checkin") {
    content = contentCheckin;
  } else if (searchModal.step === "checkout") {
    content = contentCheckout;
  } else if (searchModal.step === "details") {
    content = contentDetails;
  }

  return (
    <Modal
      label="Search"
      content={
        <>
          {/* Progress Bar */}
          <div className="mb-4">
            <div className="w-full bg-gray-200 h-2 rounded">
              <div
                className="bg-airbnb h-2 rounded"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          {content}
        </>
      }
      close={searchModal.close}
      isOpen={searchModal.isOpen}
    />
  );
};

export default SearchModal;
