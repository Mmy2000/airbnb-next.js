"use client";

import useReservationProccessPaymentModal from "@/app/hooks/useReservationProccessModal";
import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import CustomButton from "../forms/CustomButton";
import Modal from "./Modal";

const PaymentProccessModal = () => {
  const paymentProccess = useReservationProccessPaymentModal();
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const content = (
    <div className="px-6 py-4">
      <h2 className="mb-6 text-3xl font-semibold text-gray-800 text-center">
        Welcome to djangobnb
      </h2>
      <form action={""} className="space-y-4">
        <input
          placeholder="Your e-mail address"
          type="email"
          className="w-full h-[54px] px-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
        />
        <input
          placeholder="Your password"
          type="password"
          className="w-full h-[54px] px-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
        />
        {errors?.map((error, index) => {
          return (
            <div
              key={`error_${index}`}
              className="p-4 bg-red-500 text-white rounded-xl opacity-90"
            >
              {error}
            </div>
          );
        })}
        <CustomButton
          loading={loading} // Pass the loading state
          disabled={loading}
          label="Submit"
          className="w-full bg-airbnb hover:bg-airbnb-dark text-white font-bold py-2 rounded-xl transition duration-200"
        />
      </form>
    </div>
  );
  return (
    <Modal
      isOpen={paymentProccess.isOpen}
      close={paymentProccess.close}
      label="Complete Reservation Proccess"
      content={content}
    />
  );
};

export default PaymentProccessModal;
