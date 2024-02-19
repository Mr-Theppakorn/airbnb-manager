import EmptyState from "@/components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import FavoritesClient from "./FavoritesClient";
import getFavorites from "../actions/getFavorites";

const FavoritesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  const favorites = await getFavorites();

  if (favorites.length === 0) {
    return (
      <EmptyState
        title="No favorites found"
        subtitle="Looks like you have no favorites"
      />
    );
  }

  return (
    <div>
      <FavoritesClient favorites={favorites} currentUser={currentUser} />
    </div>
  );
};

export default FavoritesPage;
