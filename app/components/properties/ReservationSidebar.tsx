"use client";

import useLoginModal from "@/app/hooks/useLoginModal";
import apiService from "@/app/services/apiService";
import { useState, useEffect } from "react";
import { Range } from "react-date-range";
import { differenceInDays, eachDayOfInterval, format } from "date-fns";
import DatePicker from "../forms/Calendar";
import CustomButton from "../forms/CustomButton";
import { toast } from "react-toastify";


const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

export type Property = {
  id: string;
  guests: number;
  price_per_night: number;
};

interface ReservationSidebarProps {
  userId: string | null;
  property: Property;
}

const ReservationSidebar: React.FC<ReservationSidebarProps> = ({
  property,
  userId
}) => {
  const loginModal = useLoginModal();

  const [fee, setFee] = useState<number>(0);
  const [nights, setNights] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const [minDate, setMinDate] = useState<Date>(new Date());
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const [guests, setGuests] = useState<string>("1");
  const guestsRange = Array.from(
    { length: property.guests },
    (_, index) => index + 1
  );
  const [loading, setLoading] = useState(false);

  const performBooking = async () => {
    setLoading(true);
     console.log("performBooking", userId);

     if (userId) {
       if (dateRange.startDate && dateRange.endDate) {
         const formData = new FormData();
         formData.append("guests", guests);
         formData.append(
           "start_date",
           format(dateRange.startDate, "yyyy-MM-dd")
         );
         formData.append("end_date", format(dateRange.endDate, "yyyy-MM-dd"));
         formData.append("number_of_nights", nights.toString());
         formData.append("total_price", totalPrice.toString());

         const response = await apiService.post(
           `/api/properties/${property.id}/book/`,
           formData
         );

         if (response.success) {
           console.log("Booking successful");
           toast.success("Reserved successfully");
         } else {
           console.log("Something went wrong...");
           toast.error("Reservations not comleted");
         }
       }
     } else {
       loginModal.open();
     }
     setLoading(false);
   };
  const _setDateRange = (selection: any) => {
    const newStartDate = new Date(selection.startDate);
    const newEndDate = new Date(selection.endDate);

    if (newEndDate <= newStartDate) {
      newEndDate.setDate(newStartDate.getDate() + 1);
    }

    setDateRange({
      ...dateRange,
      startDate: newStartDate,
      endDate: newEndDate,
    });
  };
  const getReservations = async () => {
    const reservations = await apiService.get(
      `/api/properties/${property.id}/reservations/`
    );

    let dates: Date[] = [];

    reservations.forEach((reservation: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.start_date),
        end: new Date(reservation.end_date),
      });

      dates = [...dates, ...range];
    });

    setBookedDates(dates);
  };

  useEffect(() => {
    getReservations()

    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate);

      if (dayCount && property.price_per_night) {
        const _fee = ((dayCount * property.price_per_night) / 100) * 5;

        setFee(_fee);
        setTotalPrice(dayCount * property.price_per_night + _fee);
        setNights(dayCount);
      } else {
        const _fee = (property.price_per_night / 100) * 5;

        setFee(_fee);
        setTotalPrice(property.price_per_night + _fee);
        setNights(1);
      }
    }
  }, [dateRange]);
  return (
    <aside className="mt-6 p-6 col-span-2 rounded-xl border border-gray-200 shadow-md">
      <h2 className="mb-5 text-3xl font-semibold">
        ${property.price_per_night}{" "}
        <span className="text-lg font-normal">per night</span>
      </h2>

      {/* Date Picker */}
      <DatePicker
        value={dateRange}
        bookedDates={bookedDates}
        onChange={(value) => _setDateRange(value.selection)}
        className="mb-6"
      />

      {/* Guests Selection */}
      <div className="mb-6 p-4 border border-gray-300 rounded-lg">
        <label className="block font-medium text-sm text-gray-700 mb-2">
          Guests
        </label>
        <select
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {guestsRange.map((number) => (
            <option key={number} value={number}>
              {number}
            </option>
          ))}
        </select>
      </div>

      {/* Booking Button */}
      <CustomButton
        loading={loading}
        disabled={loading}
        onClick={performBooking}
        label="Book"
        className=" mb-6"
      />

      {/* Price Breakdown */}
      <div className="mb-4 flex justify-between items-center">
        <p className="text-sm text-gray-600">
          ${property.price_per_night} x {nights} nights
        </p>
        <p className="text-sm font-medium">
          ${property.price_per_night * nights}
        </p>
      </div>

      <div className="mb-4 flex justify-between items-center">
        <p className="text-sm text-gray-600">Djangobnb fee</p>
        <p className="text-sm font-medium">${fee}</p>
      </div>

      <hr className="mb-4" />

      {/* Total Price */}
      <div className="mt-4 flex justify-between items-center font-bold text-lg">
        <p>Total</p>
        <p>${totalPrice}</p>
      </div>
    </aside>
  );
};

export default ReservationSidebar;
