import prisma from "@/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getFavorites() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.fevoriteIds || [])],
        },
      },
    });

    const safeFavorite = favorites.map((favorite) => ({
      ...favorite,
      createdAt: favorite.createdAt.toISOString(),
    }));

    return safeFavorite;
  } catch (error: any) {
    throw new Error(error);
  }
}
