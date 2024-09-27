import Image from "next/image";
import Link from "next/link";
import SearchFilters from "./SearchFilters";
import UserNav from "./UserNav";
import AddPropertyButton from "./AddPropertyButton";
import { getUserId } from "@/app/lib/actions";

const Navbar = async () => {
  const userId = await getUserId();
  return (
    <nav className="w-full fixed top-0 left-0 py-3 bg-white z-20 shadow-sm transition-all duration-300">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/Airbnb_Logo.png"
              alt="DjangoBnb logo"
              width={120}
              height={36}
              className="hover:opacity-90 transition-opacity duration-300"
            />
          </Link>

          {/* Search Filters */}
          <div className="hidden lg:flex space-x-8">
            <SearchFilters />
          </div>

          {/* User Actions (Property Button + User Nav) */}
          <div className="flex items-center space-x-4 lg:space-x-6">
            <AddPropertyButton userId={userId} />
            <UserNav userId={userId} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
