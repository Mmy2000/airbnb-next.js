'use client'
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import apiService from "../services/apiService";
import ConfirmModal from "../components/modal/ConfirmModal";
import { toast } from "react-toastify";

// Assuming this is where the API service function is located
interface MyReservationsClientProps {
  reservations: any[]; // Ideally, replace 'any' with a more specific type if possible
  userId: string | null; // Since `getUserId` may return null, include null in the type
}

const MyReservationsClient: React.FC<MyReservationsClientProps> = ({
  reservations,
  userId,
}) => {
  const [loading, setLoading] = useState(false); // To handle loading state
  const [reservationList, setReservationList] = useState(reservations); // Keep track of the reservation list
  const [showModal, setShowModal] = useState(false); // To show/hide modal
  const [reservationToCancel, setReservationToCancel] = useState<any | null>(
    null
  ); // To store the reservation to cancel
  const [currentId, setCurrentId] = useState<number | null>(null);

  const openModal = (reservationId: any) => {
    setReservationToCancel(reservationId); // Store the reservation ID to be canceled
    setShowModal(true); // Show the confirmation modal
  };

  const closeModal = () => {
    setShowModal(false); // Hide the confirmation modal
    setReservationToCancel(null); // Clear the reservation to cancel
  };

  const cancelReservation = async () => {
    if (loading || !reservationToCancel) return; // Prevent multiple requests
    setLoading(true);

    try {
      const reservationId = reservationToCancel; // Get the reservation ID from the state
      // Use the provided delete method from the API service
      const response = await apiService.delete(
        `/api/properties/${reservationId}/cancel/`
      );
      setCurrentId(reservationId);

      if (response.success) {
        // Update the local state to remove the canceled reservation
        setReservationList(
          reservationList.filter((r) => r.id !== reservationId)
        );
        toast.success("Reservation canceled successfully.");
      } else {
        toast.error("Failed to cancel the reservation.");
      }
    } catch (error) {
      console.error("Error cancelling reservation:", error);
      toast.error("An error occurred while canceling the reservation.");
    } finally {
      setLoading(false); // Reset loading state
      closeModal();
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
      {userId ? (
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
                    {reservation.property.title},
                    <span className="ml-1">{reservation.property.country}</span>
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
                  onClick={() => openModal(reservation.id)}
                  className="inline-block py-2 px-4 bg-gray-300 text-gray-800 text-center rounded-lg hover:bg-gray-400 transition-colors"
                  disabled={loading && currentId === reservation.id}
                >
                  {loading && currentId === reservation.id
                    ? "Cancelling..."
                    : "Cancel"}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <main className="max-w-[1200px] max-auto px-6 py-12">
          <p>You need to be authenticated...</p>
        </main>
      )}

      {/* Confirm Modal */}
      <ConfirmModal
        show={showModal}
        onConfirm={cancelReservation}
        onCancel={closeModal}
        title="Cancel Reservation"
        message="Are you sure you want to cancel this reservation?"
      />

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
