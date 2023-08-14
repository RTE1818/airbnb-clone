import prisma from "@/app/libs/prismadb";

export interface IListingsParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

export default async function getListings(params: IListingsParams) {
  try {
    const { userId, roomCount, guestCount, bathroomCount, startDate, endDate, locationValue, category } = params;
    
    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    if (category) {
      query.category = category;
    }

    if (roomCount) {
      query.roomCount = {
        gte: +roomCount
      }
    }

    if (bathroomCount) {
      query.roomCount = {
        gte: +bathroomCount
      }
    }

    if (guestCount) {
      query.guestCount = {
        gte: +guestCount
      }
    }

    if (locationValue) {
      query.locationValue = locationValue;
    }
    
    const listings = await prisma.airbnbListing.findMany({
      where: query,   
      orderBy: {
        createdAt: 'desc'
      }
    });

    return listings;
  } catch (error: any) {
    throw new Error(error);
  }
}