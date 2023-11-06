import z from "zod";
import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, reset } from "../features/auth/authSlice";
import { type RootState, type AppDispatch } from "../app/store";
import { Input } from "../components/Input";
import Button from "../components/Button";
import LoadingSpinner from "../components/LoadingSpinner";

const formInputs = [
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
];

const zodSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Please enter a password"),
});

export default function Login() {
  const [formData, setFormData] = useState<z.infer<typeof zodSchema>>({
    email: "",
    password: "",
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
      message && toast.success(message);
      dispatch(reset());
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, dispatch, navigate]);

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
    dispatch(login(formData));
  }

  return (
    <div>
      <h1 className="">Login</h1>
      <form action="submit" onSubmit={onSubmit}>
        {formInputs.map((input) => (
          <Input
            key={input.name}
            name={input.name}
            type={input.type}
            placeholder={input.placeholder}
            // magic
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
        {isLoading ? <LoadingSpinner /> : <Button>Login</Button>}
      </form>
    </div>
  );
}
