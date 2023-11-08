import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import Button from "../components/Button";

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

    if (user && organisation === null) dispatch(getOwnerOrganisation());

    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      message && toast.success(message);
    }
    return () => {
      reset();
    };
  }, [user, navigate, dispatch, organisation, isError, message, isSuccess]);

  if (organisation === null && isLoading) {
    return (
      <div className="flex items-center justify-center gap-4 p-4">
        <h1 className="text-3xl font-bold text-gray-500">
          Loading organisation data...
        </h1>
        <LoadingSpinner />
      </div>
    );
  }

  if (organisation === null || isError) {
    return (
      <div className="flex items-center justify-center flex-col text-4xl font-bold p-8">
        <i>ERROR</i>
        Something went wrong, please try again later
      </div>
    );
  }

  if (organisation === undefined) {
    return (
      <div className="flex items-center justify-center flex-col gap-2 text-2xl font-bold p-8 text-gray-500">
        <i>NO ORGANISATION</i>
        <Button
          onClick={() => navigate("/organisation/register")}
          className="w-auto"
        >
          Register your organisation
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="flex items-center justify-around w-full">
        <h1 className="text-3xl font-bold text-gray-500">
          {organisation?.organisationName}
        </h1>
        <NewReservationModal />
      </div>
      {organisation?.reservations.length ? (
        <ReservationTable data={organisation.reservations} />
      ) : (
        <>
          <p className="text-2xl font-bold text-gray-500">
            No reservations yet
          </p>
          <p className="text-xl text-gray-500">
            Start by creating a new reservation!
          </p>
        </>
      )}
    </div>
  );
}
