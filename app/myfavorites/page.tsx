import PropertyList from "../components/properties/PropertyList";
import { getUserId } from "../lib/actions";

const MyFavoritesPage = async () => {
  const userId = await getUserId();

  if (!userId) {
    return (
      <main className="max-w-[1200px] max-auto px-6 py-12">
        <p>You need to be authenticated...</p>
      </main>
    );
  }

  return (
    <main className="max-w-[1200px] mx-auto px-6 pb-12">
      {/* Navigation (Breadcrumb) */}
      <nav className="text-sm mb-6 text-gray-500">
        <a href="/" className="text-airbnb hover:underline transition-colors">
          Home
        </a>
        <span className="mx-2 text-gray-400">/</span>
        <span>My Favorites</span>
      </nav>

      {/* Title */}
      <h1 className="my-6 text-4xl font-bold text-gray-900">
        My Favorite Properties
      </h1>

      {/* Property List Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <PropertyList userId={userId} favorites={true} />
      </div>

      {/* Footer with CTA */}
      <footer className="py-8 mt-12 bg-gray-100 text-center rounded-md shadow-sm">
        <p className="text-lg text-gray-700">
          Not finding the right property?
          <a
            href="/"
            className="ml-2 text-airbnb hover:underline hover:text-airbnb-dark transition-colors"
          >
            Browse more listings
          </a>
        </p>
      </footer>
    </main>
  );
};

export default MyFavoritesPage;