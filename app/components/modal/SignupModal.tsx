"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "./Modal";
import CustomButton from "../forms/CustomButton";
import useSignupModal from "@/app/hooks/useSignupModal";
import apiService from "@/app/services/apiService";
import { handleLogin } from "@/app/lib/actions";
import { toast } from "react-toastify";
import useLoginModal from "@/app/hooks/useLoginModal";

const SignupModal = () => {
  const router = useRouter();
  const signupModal = useSignupModal();
  const loginModal = useLoginModal()
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const submitSignup = async () => {
    setLoading(true);
    const formData = {
      email: email,
      password1: password1,
      password2: password2,
    };
    const response = await apiService.postWithoutToken(
      "/api/auth/register/",
      JSON.stringify(formData)
    );
    if (response.access) {
      handleLogin(response.user.pk, response.access, response.refresh);
      toast.success("Signed in successfully");
      signupModal.close();
      // loginModal.open()
      // router.push("/profile")

    } else {
      const tmpErrors: string[] = Object.values(response).map((error: any) => {
        return error;
      });

      setErrors(tmpErrors);
    }
    setLoading(false);
  };

  const content = (
    <div className="px-6 py-4">
      <h2 className="mb-6 text-3xl font-semibold text-gray-800 text-center">
        Welcome to djangobnb
      </h2>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        <input
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your e-mail address"
          type="email"
          className="w-full h-[54px] px-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
        />
        <input
          onChange={(e) => setPassword1(e.target.value)}
          placeholder="Your password"
          type="password"
          className="w-full h-[54px] px-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
        />
        <input
          onChange={(e) => setPassword2(e.target.value)}
          placeholder="Repeat Your password"
          type="password"
          className="w-full h-[54px] px-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
        />
        {errors.map((error, index) => {
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
          onClick={submitSignup}
          label={loading ? "Submitting..." : "Submit"}
          loading={loading} // Pass the loading state
          disabled={loading} // Add this prop for spinner control
          className="w-full bg-airbnb hover:bg-airbnb-dark text-white font-bold py-2 rounded-xl transition duration-200"
        />
      </form>
    </div>
  );

  return (
    <Modal
      isOpen={signupModal.isOpen}
      close={signupModal.close}
      label="Sign Up"
      content={content}
    />
  );
};

export default SignupModal;
