import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import getListings, { IListingParams } from "./actions/getListings";
import ListingCard from "@/components/listings/ListingCard";
import getCurrentUser from "./actions/getCurrentUser";

interface ListingCardProps {
  searchParams: IListingParams;
}

const page = async ({searchParams} : ListingCardProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return <EmptyState showReset />;
  }

  return (
    <>
      <Container>
        <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {listings.map((item) => (
            <ListingCard key={item.id} data={item} currentUser={currentUser} />
          ))}
        </div>
      </Container>
    </>
  );
};
export const dynamic = "force-dynamic";
export default page;
