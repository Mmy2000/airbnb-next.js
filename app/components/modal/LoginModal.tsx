"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "./Modal";
import useLoginModal from "@/app/hooks/useLoginModal";
import CustomButton from "../forms/CustomButton";
import apiService from "@/app/services/apiService";
import { handleLogin } from "@/app/lib/actions";

const LoginModal = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const submitLogin = async () => {
    setLoading(true);
    const formData = {
      email: email,
      password: password,
    };

    const response = await apiService.postWithoutToken(
      "/api/auth/login/",
      JSON.stringify(formData)
    );

    if (response.access) {
      handleLogin(response.user.pk, response.access, response.refresh);
      loginModal.close();
    } else {
      setErrors(response.non_field_errors);
    }
    setLoading(false);
  };

  const content = (
    <div className="px-6 py-4">
      <h2 className="mb-6 text-3xl font-semibold text-gray-800 text-center">
        Welcome to djangobnb
      </h2>
      <form action={submitLogin} className="space-y-4">
        <input
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your e-mail address"
          type="email"
          className="w-full h-[54px] px-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
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
          onClick={submitLogin}
          label="Submit"
          className="w-full bg-airbnb hover:bg-airbnb-dark text-white font-bold py-2 rounded-xl transition duration-200"
        />
      </form>
    </div>
  );

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
