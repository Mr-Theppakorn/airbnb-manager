import getCurrentUser from "@/app/actions/getCurrentUser";
import EmptyState from "@/components/EmptyState";
import PropertiesClient from "./PropertiesClient";
import getListings from "../actions/getListings";
import { SafeListing, SafeUser } from "@/types";

export const getServerSideProps = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return {
      props: {},
    };
  }

  const listings = await getListings({ userId: currentUser.id });

  return {
    props: {
      listings,
      currentUser,
    },
  };
};

interface TripsClientProps {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
}

const PropertiesPage = ({ listings, currentUser }: TripsClientProps) => {
  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  if (listings.length === 0) {
    return (
      <EmptyState
        title="No properties found"
        subtitle="Looks like you have no properties"
      />
    );
  }

  return (
    <div>
      <PropertiesClient listings={listings} currentUser={currentUser} />
    </div>
  );
};

export default PropertiesPage;
