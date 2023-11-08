import { type ReservationType } from "../features/organisation/organisationSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import {
  deleteReservation,
  // updateReservation,
} from "../features/organisation/organisationSlice";
import { type AppDispatch } from "../app/store";
import UpdateReservationModal from "./UpdateReservationModal";

import { FaRegTrashCan } from "react-icons/fa6";

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
    <table className="w-full text-center">
      <thead className="text-gray-500 border-b border-gray-300">
        <tr>
          <th className="font-normal py-3">Date</th>
          <th className="font-normal py-3">Time</th>
          <th className="font-normal py-3">Name</th>
          <th className="font-normal py-3">Surname</th>
          <th className="font-normal py-3">Email</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={`${row.timestamp} ${index}`}>
            <td className="py-2">{getDateString(row.timestamp)}</td>
            <td className="py-2">{getTimeString(row.timestamp)}</td>
            <td className="py-2">{row.name}</td>
            <td className="py-2">{row.surname}</td>
            <td className="py-2">{row.email}</td>
            <td className="py-2">
              <UpdateReservationModal reservationId={row._id} />
            </td>
            <td className="py-1">
              <button
                disabled={isLoading}
                onClick={() => handleDelete(row._id)}
              >
                <FaRegTrashCan className={isLoading && "text-gray-400"} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// Utility Functions

function getDateString(timestamp: number) {
  const date = new Date(timestamp);
  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
}

function getTimeString(timestamp: number) {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${appendZero(hours)}:${appendZero(minutes)}`;
}

function appendZero(number: number) {
  return number < 10 ? `0${number}` : number;
}
