"use client";

import { useRouter } from "next/navigation";

import { resetAuthCookies } from "../lib/actions";

import MenuLink from "./navbar/MenuLink";
import { toast } from "react-toastify";

const LogoutButton: React.FC = () => {
  const router = useRouter();

  const submitLogout = async () => {
    await resetAuthCookies();
    toast.success("Loged out successfully");

    router.push("/");
  };

  return <MenuLink label="Log out" onClick={submitLogout} />;
};

export default LogoutButton;