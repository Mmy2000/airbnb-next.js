"use client"; // Client component

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import apiService from "../services/apiService";

// Assuming this is where the API service function is located

const MyReservationsClient = ({ reservations }: { reservations: any[] }) => {
  const [loading, setLoading] = useState(false); // To handle loading state
  const [reservationList, setReservationList] = useState(reservations); // Keep track of the reservation list

  const cancelReservation = async (reservationId: any) => {
    if (loading) return; // Prevent multiple requests
    setLoading(true);

    try {
      // Use the provided delete method from the API service
      const response = await apiService.delete(
        `/api/properties/${reservationId}/cancel/`
      );

      if (response.success) {
        // Update the local state to remove the canceled reservation
        setReservationList(
          reservationList.filter((r) => r.id !== reservationId)
        );
        alert("Reservation canceled successfully.");
      } else {
        alert(response.error || "Failed to cancel the reservation.");
      }
    } catch (error) {
      console.error("Error cancelling reservation:", error);
      alert("An error occurred while canceling the reservation.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

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
        {reservationList.map((reservation: any) => (
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

            {/* Action Buttons */}
            <div className="flex col-span-4 justify-between space-x-4">
              <Link
                href={`/properties/${reservation.property.id}`}
                className="inline-block py-2 px-4 bg-red-500 text-white text-center rounded-lg hover:bg-red-600 transition-colors"
              >
                View Details
              </Link>
              <button
                onClick={() => cancelReservation(reservation.id)}
                className="inline-block py-2 px-4 bg-gray-300 text-gray-800 text-center rounded-lg hover:bg-gray-400 transition-colors"
                disabled={loading}
              >
                {loading ? "Cancelling..." : "Cancel"}
              </button>
            </div>
          </div>
        ))}
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

export default MyReservationsClient;
