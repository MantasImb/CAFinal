import { useState, useRef, useEffect } from "react";
import z from "zod";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register, reset } from "../features/auth/authSlice";
import { type RootState, type AppDispatch } from "../app/store";
import { toast } from "react-toastify";
import { Input } from "../components/Input";
import Button from "../components/Button";
import LoadingSpinner from "../components/LoadingSpinner";

const formInputs = [
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
  {
    name: "password",
    type: "password",
    placeholder: "Your password",
  },
  {
    name: "passwordConfirmation",
    type: "password",
    placeholder: "Confirm your password",
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
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(100, "Password must be at most 100 characters long"),
  passwordConfirmation: z.string().min(6).max(100),
});

export default function Register() {
  const [formData, setFormData] = useState<z.infer<typeof zodSchema>>({
    name: "",
    surname: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const inputRefs = useRef<Record<string, HTMLInputElement>>({});
  const [errors, setErrors] = useState<string[]>([]);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      toast.success(message);
      dispatch(reset());
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

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
      // dont show validation errors for passwordConfirmation
      if (error.path[0] === "passwordConfirmation") continue;
      validationErrors.push(error.message);
      inputRefs.current[error.path[0]]?.classList.add("border-red-500");
    }

    if (formData.password !== formData.passwordConfirmation) {
      validationErrors.push("Passwords do not match");
      inputRefs.current["password"]?.classList.add("border-red-500");
      inputRefs.current["passwordConfirmation"]?.classList.add(
        "border-red-500"
      );
    }

    setErrors(validationErrors);
    return false;
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const validationPassed = validateForm(formData);
    if (!validationPassed) return;
    dispatch(register(formData));
  }

  return (
    <div>
      <h1 className="">Register</h1>
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
        {isLoading ? <LoadingSpinner /> : <Button>Register</Button>}
      </form>
    </div>
  );
}
