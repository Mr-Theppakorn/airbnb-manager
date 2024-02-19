"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import Container from "@/components/Container";
import Heading from "@/components/Heading";
import { SafeListing, SafeReservation, SafeUser } from "@/types";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "@/components/listings/ListingCard";

interface TripsClientProps {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
}

const TripsClient = ({ listings, currentUser }: TripsClientProps) => {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeleteId(id);
      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success("Listing deleted");
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
      <Heading title="Properties" subtitle="List of your properties" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((list) => (
          <ListingCard
            key={list.id}
            data={list}
            actionId={list.id}
            onAction={onCancel}
            disabled={deleteId === list.id}
            actionLabel="Delete Property"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default TripsClient;
