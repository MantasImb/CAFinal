import { MouseEventHandler, type PropsWithChildren } from "react";

type ButtonProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "primary" | "danger";
  disabled?: boolean;
};

const buttonClasses =
  "px-4 py-2 text-base font-medium rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300";

const classes = {
  primary: "hover:bg-gray-200",
  danger: "bg-red-500 text-white hover:bg-red-600",
};

export default function Button({
  children,
  onClick,
  type = "primary",
  disabled = false,
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      disabled={disabled}
      className={`${buttonClasses} ${classes[type]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
