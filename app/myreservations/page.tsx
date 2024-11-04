import MyReservationsClient from "./MyReservationsClient"; // Import the client component
import apiService from "../services/apiService"; // Your API service
import { getUserId } from "../lib/actions";

const MyReservations = async () => {
  const userId = await getUserId();
  // Fetch reservations on the server-side
  const reservations = await apiService.get("/api/auth/myreservations/");

  return <MyReservationsClient reservations={reservations} userId={userId} />;
};

export default MyReservations;
