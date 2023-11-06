import { useState, useRef } from "react";
import z from "zod";
import { AppDispatch } from "../app/store";
import { useDispatch } from "react-redux";
import { createReservation } from "../features/organisation/organisationSlice";
import { toast } from "react-toastify";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Modal from "./Modal";
import Button from "./Button";
import { Input } from "./Input";

const inputs = [
  // {name: "time", type: "number", placeholder: "Time"},
  {
    name: "name",
    type: "text",
    placeholder: "Your first name",
  },
  {
    name: "surname",
    type: "text",
    placeholder: "Your last name",
  },
  {
    name: "email",
    type: "text",
    placeholder: "Your email",
  },
];

const zodSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .max(20, "Name must be at most 20 characters long"),
  surname: z
    .string()
    .min(3, "Surname must be at least 3 characters long")
    .max(20, "Surname must be at most 20 characters long"),
  email: z.string().email("Please enter a valid email address"),
});

export default function NewReservationModal() {
  const currentTime = new Date();

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<z.infer<typeof zodSchema>>({
    name: "",
    surname: "",
    email: "",
  });
  const [dateTime, setDateTime] = useState<Date>(
    new Date(currentTime.setDate(currentTime.getDate() + 1))
  );
  const inputRefs = useRef<Record<string, HTMLInputElement>>({});
  const dispatch: AppDispatch = useDispatch();
  const [errors, setErrors] = useState<string[]>([]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  function validateForm(formData: z.infer<typeof zodSchema>): boolean {
    const validationErrors = [];

    const validatedData = zodSchema.safeParse(formData);
    if (validatedData.success) return true;

    for (const error of validatedData.error.errors) {
      validationErrors.push(error.message);
      inputRefs.current[error.path[0]]?.classList.add("border-red-500");
    }

    setErrors(validationErrors);
    return false;
  }

  function onSubmit() {
    if (!validateForm(formData)) return;
    const timestamp = dateTime instanceof Date ? dateTime.getTime() : null;
    !timestamp
      ? toast.error("Something went wrong, contact support")
      : dispatch(createReservation({ ...formData, timestamp }));
  }

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>New Reservation</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        actionFunc={onSubmit}
        actionName="Create"
        hasCancel
      >
        <div className="flex flex-col gap-4 w-80">
          <h2 className="text-lg font-bold">Create a new reservation</h2>
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
          />
          {inputs.map((input) => (
            <Input
              key={input.name}
              name={input.name}
              type={input.type}
              placeholder={input.placeholder}
              value={formData[input.name as keyof typeof formData]}
              onChange={onChange}
              // "!" ???
              ref={(el) => (inputRefs.current[input.name] = el!)}
            />
          ))}
          {errors.length > 0 && (
            <ul>
              {errors.map((error) => (
                <li className="text-red-500" key={error}>
                  {error}
                </li>
              ))}
            </ul>
          )}
        </div>
      </Modal>
    </>
  );
}
