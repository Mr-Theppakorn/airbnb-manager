import prisma from "@/libs/prismadb";

interface IParams {
  listingId?: string;
}

export default async function getListingById({ listingId }: IParams) {
  try {
    const listings = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true,
      },
    });

    if (!listings) {
      return null;
    }

    return {
      ...listings,
      createdAt: listings.createdAt.toISOString(),
      user: {
        ...listings.user,
        createdAt: listings.user.createdAt.toISOString(),
        updatedAt: listings.user.updatedAt.toISOString(),
        emailVerified: listings.user.emailVerified?.toISOString() || null,
      },
    };
  } catch (error: any) {
    throw new Error(error);
  }
}
