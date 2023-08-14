import EmptyState from "../components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import PropertiesClient from "./PropertiesClient";
import getListings from "../actions/getListings";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState 
        title="Unauthorized"
        subtitle="Please log in to view this content."
      />
    )
  }

  const listings = await getListings({ userId: currentUser.id});

  if (listings.length === 0) {
    <EmptyState
      title="No properties were found"
      subtitle="Looks like you don't have any properties on Aribnb yet."
    />
  }

  return (
    <PropertiesClient
      listings={listings}
      currentUser={currentUser}
    />
  )
}

export default PropertiesPage;