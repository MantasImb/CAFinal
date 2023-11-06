import { useState } from "react";

import { AppDispatch, RootState } from "../app/store";
import { useSelector, useDispatch } from "react-redux";
import { updateReservation } from "../features/organisation/organisationSlice";
import { toast } from "react-toastify";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Modal from "./Modal";
import Button from "./Button";

export default function UpdateReservationModal({
  reservationId,
}: {
  reservationId: string;
}) {
  const currentTime = new Date();

  const [isOpen, setIsOpen] = useState(false);

  const [dateTime, setDateTime] = useState<Date>(new Date());
  const dispatch: AppDispatch = useDispatch();
  const { isLoading } = useSelector((state: RootState) => state.organisation);

  function onSubmit() {
    const timestamp = dateTime instanceof Date ? dateTime.getTime() : null;
    !timestamp
      ? toast.error("Something went wrong, contact support")
      : dispatch(updateReservation({ reservationId, timestamp }));
  }

  return (
    <>
      <Button onClick={() => setIsOpen(true)} disabled={isLoading}>
        Update
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        actionFunc={onSubmit}
        actionName="Update"
        hasCancel
      >
        <div className="flex flex-col gap-4 w-80 h-96">
          <h2 className="text-lg font-bold">Update reservation</h2>
          <DatePicker
            minDate={new Date(currentTime)}
            maxDate={new Date(currentTime.setMonth(currentTime.getMonth() + 1))}
            // assuming working hours are 8am - 8pm
            minTime={new Date(currentTime.setHours(8, 0, 0, 0))}
            maxTime={new Date(currentTime.setHours(20, 0, 0, 0))}
            className="border rounded-md p-2 w-full"
            showTimeSelect
            selected={dateTime}
            onChange={(date: Date) => setDateTime(date)}
            timeFormat="HH:mm"
            dateFormat="yyyy/MM/dd HH:mm"
            // make the datepicker always open
            open
          />
        </div>
      </Modal>
    </>
  );
}
