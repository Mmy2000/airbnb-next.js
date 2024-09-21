
import Image from "next/image";
import Link from "next/link";
import PropertyList from "../components/properties/PropertyList";

const MyProperties = () => {
  return (
    <main className="max-w-[1500px] mx-auto px-6">
      <h1 className="my-6 text-2xl">My Properties</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <PropertyList />
      </div>
    </main>
  );
};

export default MyProperties