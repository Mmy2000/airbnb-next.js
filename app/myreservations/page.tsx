
import Image from "next/image";
import Link from "next/link";
import { getUserId } from "../lib/actions";
import apiService from "../services/apiService";


const MyReservations = async () => {
  const reservations = await apiService.get("/api/auth/myreservations/");
  return (
    <main className="max-w-[1200px] mx-auto px-6 mb-6">
      <h1 className="my-6 text-2xl">My reservations</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reservations.map((reservation: any) => {
          return (
            <div
              key={reservation.property.id}
              className="p-5 grid grid-cols-1 lg:grid-cols-4 gap-4 shadow-md border border-gray-300 rounded-xl"
            >
              <div className="col-span-2">
                <div className="relative overflow-hidden aspect-square rounded-xl">
                  <Image
                    fill
                    src={reservation.property.image_url}
                    className="hover:scale-110 object-cover transition h-full w-full"
                    alt="Beach house"
                  />
                </div>
              </div>
              <div className="col-span-1 lg:col-span-2">
                <h2 className="mb-4 text-xl">{reservation.property.title}</h2>

                <p className="mb-2">
                  <strong>Check in date:</strong> {reservation.start_date}
                </p>
                <p className="mb-2">
                  <strong>Check out date:</strong> {reservation.end_date}
                </p>

                <p className="mb-2">
                  <strong>Number of nights:</strong>{" "}
                  {reservation.number_of_nights}
                </p>
                <p className="mb-2">
                  <strong>Total price:</strong> ${reservation.total_price}
                </p>

                <Link
                  href={`/properties/${reservation.property.id}`}
                  className="mt-6 inline-block cursor-pointer py-4 px-6 bg-airbnb hover:bg-airbnb-dark transition-colors text-white rounded-xl"
                >
                  Go to property
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );}

export default MyReservations;