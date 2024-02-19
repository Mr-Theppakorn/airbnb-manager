"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Container from "@/components/Container";
import Heading from "@/components/Heading";
import { SafeReservation, SafeUser } from "@/types";
import toast from "react-hot-toast";
import ListingCard from "@/components/listings/ListingCard";

interface ReservationClientProps {
  reservations: SafeReservation[];
  currentUser?: SafeUser | null;
}

const ReservationClient = ({
  reservations,
  currentUser,
}: ReservationClientProps) => {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeleteId(id);
      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation cancelled");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
        })
        .finally(() => {
          setDeleteId("");
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading title="Reservations" subtitle="Bookings on your properties" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deleteId === reservation.id}
            currentUser={currentUser}
            actionLabel="Cancel guest reservation"
          />
        ))}
      </div>
    </Container>
  );
};

export default ReservationClient;
