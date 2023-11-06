import { type ReservationType } from "../features/organisation/organisationSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import {
  deleteReservation,
  // updateReservation,
} from "../features/organisation/organisationSlice";
import { type AppDispatch } from "../app/store";
import UpdateReservationModal from "./UpdateReservationModal";

export default function ReservationTable({
  data,
}: {
  data: ReservationType[];
}) {
  const dispatch: AppDispatch = useDispatch();
  const { isLoading } = useSelector((state: RootState) => state.organisation);

  function handleDelete(reservationId: string) {
    dispatch(deleteReservation(reservationId));
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={`${row.email} ${row.timestamp}`}>
              <td>{getDateString(row.timestamp)}</td>
              <td>{getTimeString(row.timestamp)}</td>
              <td>{row.name}</td>
              <td>{row.surname}</td>
              <td>{row.email}</td>
              <td>
                <button
                  disabled={isLoading}
                  onClick={() => handleDelete(row._id)}
                >
                  Cancel
                </button>
                <UpdateReservationModal reservationId={row._id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Utility Functions

function getDateString(timestamp: number) {
  const date = new Date(timestamp);
  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
}

function getTimeString(timestamp: number) {
  const date = new Date(timestamp);
  return `${date.getHours()}:${date.getMinutes()}`;
}
