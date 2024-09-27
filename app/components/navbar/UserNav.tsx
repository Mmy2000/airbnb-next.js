"use client";

import { useState } from "react";
import MenuLink from "./MenuLink";
import useLoginModal from "@/app/hooks/useLoginModal";
import useSignupModal from "@/app/hooks/useSignupModal";
import LogoutButton from "../LogoutButton";
import { useRouter } from "next/navigation";

interface UserNavProps {
  userId?: string | null;
}

const UserNav: React.FC<UserNavProps> = ({ userId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const signupModal = useSignupModal();
  const loginModal = useLoginModal();
  const router = useRouter();

  const handleToggle = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="relative inline-block">
      <button
        onClick={handleToggle}
        className="flex items-center p-3 bg-white border border-gray-300 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-airbnb"
      >
        {/* Hamburger Icon */}
        <svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 text-gray-800 hover:text-airbnb transition-colors"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>

        {/* User Icon */}
        <svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 text-gray-800 hover:text-airbnb transition-colors"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute top-[60px] right-0 w-[300px] bg-white border border-gray-300 rounded-lg shadow-lg py-4 flex flex-col z-50 transition-all duration-200 ease-in-out">
          <div className="flex flex-col">
            {userId ? (
              <>
                <MenuLink
                  label="Profile"
                  onClick={() => {
                    closeMenu();
                    router.push("/profile");
                  }}
                />
                <MenuLink
                  label="My Properties"
                  onClick={() => {
                    closeMenu();
                    router.push("/myproperties");
                  }}
                />
                <MenuLink
                  label="My Reservations"
                  onClick={() => {
                    closeMenu();
                    router.push("/myreservations");
                  }}
                />
                <MenuLink
                  label="My Favorite"
                  onClick={() => {
                    closeMenu();
                    router.push("/myfavorites");
                  }}
                />
                <MenuLink
                  label="My Inbox"
                  onClick={() => {
                    closeMenu();
                    router.push("/inbox");
                  }}
                />
                <div className="border-t border-gray-200 my-2" />
                <div className="flex justify-center">
                  <LogoutButton />
                </div>
              </>
            ) : (
              <>
                <MenuLink
                  label="Login"
                  onClick={() => {
                    closeMenu();
                    loginModal.open();
                  }}
                />
                <MenuLink
                  label="Signup"
                  onClick={() => {
                    closeMenu();
                    signupModal.open();
                  }}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserNav;
