import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import {
  getOwnerOrganisation,
  reset,
} from "../features/organisation/organisationSlice";
import { type AppDispatch } from "../app/store";

import LoadingSpinner from "../components/LoadingSpinner";
import ReservationTable from "../components/ReservationTable";
import NewReservationModal from "../components/NewReservationModal";
import { toast } from "react-toastify";

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const { organisation, isLoading, isSuccess, isError, message } = useSelector(
    (state: RootState) => state.organisation
  );

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    if (!organisation) {
      navigate("/organisation/register");
    }

    if (!organisation) dispatch(getOwnerOrganisation());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch, isError, message, organisation]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess && message) {
      toast.success(message);
    }
  }, [isError, message, isSuccess]);

  if (organisation === null && isLoading) {
    return <LoadingSpinner size={12} />;
  }

  if (isError) {
    return <div>{message}</div>;
  }

  if (organisation === null) {
    return (
      <div>
        <Link to={"/organisation/register"}>Register your organisation</Link>
      </div>
    ); // TODO
  }

  if (organisation.reservations.length === 0) {
    return <div>No reservations</div>; // TODO - add button to create reservation
  }

  return (
    <div>
      Dashboard
      <NewReservationModal />
      <ReservationTable data={organisation.reservations} />
    </div>
  );
}
