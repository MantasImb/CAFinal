import z from "zod";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  registerOrganisation,
  reset,
} from "../features/organisation/organisationSlice";
import { type RootState, type AppDispatch } from "../app/store";
import { Input } from "../components/Input";
import Button from "../components/Button";
import LoadingSpinner from "../components/LoadingSpinner";

const formInputs = [
  {
    name: "organisationName",
    type: "text",
    placeholder: "The organisation's name",
  },
];

const zodSchema = z.object({
  organisationName: z.string().min(1, "Please enter a name"),
});

// IMPORTANT: This component is currently small and takes only one input,
// the usage of a separate page component instead of a modal is currently
// not justified. However, since more inputs are to be added in the future,
// it is better to use a separate page component now, instead of refactoring
export default function RegisterOrganisation() {
  const [formData, setFormData] = useState<z.infer<typeof zodSchema>>({
    organisationName: "",
  });
  const inputRefs = useRef<Record<string, HTMLInputElement>>({});
  const [errors, setErrors] = useState<string[]>([]);

  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { organisation, isLoading, isError, isSuccess, message } = useSelector(
    (state: RootState) => state.organisation
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || organisation) {
      message && toast.success(message);
      dispatch(reset());
      navigate("/");
    }

    dispatch(reset());
  }, [organisation, isError, isSuccess, message, dispatch, navigate]);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // remove red borders from input components
    inputRefs.current[e.target.name].classList.remove("border-red-500");
  }

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

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const validationPassed = validateForm(formData);
    if (!validationPassed) return;
    dispatch(registerOrganisation(formData));
  }

  return (
    <div>
      <h1 className="">Register organisation</h1>
      <form action="submit" onSubmit={onSubmit}>
        {formInputs.map((input) => (
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
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <Button>Register organisation</Button>
        )}
      </form>
    </div>
  );
}
