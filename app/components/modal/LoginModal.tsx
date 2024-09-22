"use client";
import { useState } from "react";
import Modal from "./Modal";
import useLoginModal from "@/app/hooks/useLoginModal";


const LoginModal = () => {
    const loginModal = useLoginModal();
    const content = (
        <h2 className="mb-6 text-2xl">Welcome to djangobnb</h2>
    )
    return (
      <Modal
        isOpen={loginModal.isOpen}
        close={loginModal.close}
        label="Log in"
        content={content}
      />
    );
};


export default LoginModal;