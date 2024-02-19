import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";
import EmptyState from "@/components/EmptyState";
import TripsClient from "./TripsClient";

const TripPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  const reservations = await getReservations({ userId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No trips found"
        subtitle="Looks like you have no trips"
      />
    );
  }

  return (
    <div>
      <TripsClient reservations={reservations} currentUser={currentUser} />
    </div>
  );
};

export default TripPage;
