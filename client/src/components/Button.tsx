import { MouseEventHandler, type PropsWithChildren } from "react";

type ButtonProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "primary" | "danger" | "mini";
  disabled?: boolean;
  className?: string;
};

const buttonClasses =
  "px-4 py-2 text-base font-medium rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300";

const classes = {
  primary: "bg-pink-700 hover:bg-pink-900 text-white",
  danger: "bg-red-500 text-white hover:bg-red-600",
  mini: "bg-pink-700 hover:bg-pink-900 text-white px-2 py-1 text-sm",
};

export default function Button({
  children,
  onClick,
  type = "primary",
  disabled = false,
  className = "",
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      disabled={disabled}
      className={`${buttonClasses} ${classes[type]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
