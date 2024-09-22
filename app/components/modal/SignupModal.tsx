"use client";
import { use, useState } from "react";
import Modal from "./Modal";
import CustomButton from "../forms/CustomButton";
import useSignupModal from "@/app/hooks/useSignupModal";

const SighnupModal = () => {
  const SignupModal = useSignupModal();
  const content = (
    <>
      <h2 className="mb-6 text-2xl">Welcome to djangobnb</h2>
      <form action="" className="space-y-4">
        <input
          placeholder="Your e-mail address"
          type="email"
          className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
        />
        <input
          placeholder="Your password"
          type="password"
          className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
        />
        <input
          placeholder="Repeat Your password"
          type="password"
          className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
        />
        <div className="p-5 bg-airbnb text-white rounded-xl opacity-80">
          error
        </div>
        <CustomButton label="Submit" />
      </form>
    </>
  );
  return (
    <Modal
      isOpen={SignupModal.isOpen}
      close={SignupModal.close}
      label="Signup in"
      content={content}
    />
  );
};

export default SighnupModal;
