import PropertyList from "../components/properties/PropertyList";
import { getUserId } from "../lib/actions";

const MyProperties = async () => {
  const userId = await getUserId();

  return (
    <main className="max-w-[1200px] mx-auto px-6 pb-12">
      {/* Navigation (Breadcrumb) */}
      <nav className="text-sm mb-6 text-gray-500">
        <a href="/" className="text-airbnb hover:underline transition-colors">
          Home
        </a>
        <span className="mx-2 text-gray-400">/</span>
        <span>My Properties</span>
      </nav>

      {/* Title */}
      <h1 className="my-6 text-4xl font-bold text-gray-900">My Properties</h1>

      {/* Property List Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <PropertyList
          userId={userId}
          landlord_id={userId}
          showEditDeleteButtons={true}
        />
      </div>
    </main>
  );
};

export default MyProperties;
