import EmptyState from "../components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import TripsClient from "./TripsClient";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState 
        title="Unauthorized"
        subtitle="Please log in to view this content."
      />
    )
  }

  const reservations = await getReservations({ userId: currentUser.id});  

  return (
    <EmptyState
      title="No trips were found"
      subtitle="Looks like you haven't booked any trips yet!"
    />
  )
}

export default TripsPage;