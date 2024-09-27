import Image from "next/image";
import Link from "next/link";
import { getUserId } from "../lib/actions";
import apiService from "../services/apiService";

const MyReservations = async () => {
  const reservations = await apiService.get("/api/auth/myreservations/");
  return (
    <main className="max-w-[1200px] mx-auto px-6 mb-6">
      <nav className="text-sm mb-6 text-gray-500">
        <a href="/" className="text-airbnb hover:underline transition-colors">
          Home
        </a>
        <span className="mx-2 text-gray-400">/</span>
        <span>My Reservations</span>
      </nav>
      <h1 className="my-6 text-4xl font-bold text-gray-900">My Reservations</h1>

      {/* Reservations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reservations.map((reservation: any) => {
          return (
            <div
              key={reservation.property.id}
              className="p-5 grid grid-cols-1 lg:grid-cols-4 gap-6 shadow-lg border border-gray-200 rounded-lg hover:shadow-xl transition-shadow"
            >
              {/* Image Section */}
              <div className="col-span-2">
                <div className="relative overflow-hidden aspect-square rounded-lg">
                  <Image
                    fill
                    src={reservation.property.image_url}
                    className="hover:scale-105 object-cover transition-transform duration-300 ease-in-out"
                    alt={reservation.property.title}
                  />
                </div>
              </div>

              {/* Details Section */}
              <div className="col-span-2 flex flex-col justify-between">
                <div>
                  <h2 className="mb-3 text-xl font-semibold text-gray-700">
                    {reservation.property.title}
                  </h2>

                  <p className="mb-2 text-sm text-gray-600">
                    <strong className="text-gray-800">Check-in:</strong>{" "}
                    {reservation.start_date}
                  </p>
                  <p className="mb-2 text-sm text-gray-600">
                    <strong className="text-gray-800">Check-out:</strong>{" "}
                    {reservation.end_date}
                  </p>
                  <p className="mb-2 text-sm text-gray-600">
                    <strong className="text-gray-800">Nights:</strong>{" "}
                    {reservation.number_of_nights}
                  </p>
                  <p className="mb-2 text-sm text-gray-600">
                    <strong className="text-gray-800">Total Price:</strong> $
                    {reservation.total_price}
                  </p>
                </div>
              </div>
              <Link
                href={`/properties/${reservation.property.id}`}
                className=" col-span-4 items-center justify-center mx-auto inline-block py-3 px-5 bg-red-500 text-white text-center rounded-lg hover:bg-red-600 transition-colors"
              >
                View Property
              </Link>
            </div>
          );
        })}
      </div>

      {/* Footer with CTA */}
      <footer className="py-8 mt-12 bg-gray-50 text-center rounded-lg shadow-sm">
        <p className="text-lg text-gray-600">
          Looking for another stay?
          <a
            href="/"
            className="ml-2 text-red-500 hover:underline hover:text-red-600 transition-colors"
          >
            Browse more properties
          </a>
        </p>
      </footer>
    </main>
  );
};

export default MyReservations;
