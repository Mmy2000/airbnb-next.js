import MyReservationsClient from "./MyReservationsClient"; // Import the client component
import apiService from "../services/apiService"; // Your API service

const MyReservations = async () => {
  // Fetch reservations on the server-side
  const reservations = await apiService.get("/api/auth/myreservations/");

  return <MyReservationsClient reservations={reservations} />;
};

export default MyReservations;
