import { forwardRef } from "react";

export const Input = forwardRef<
  HTMLInputElement,
  React.HTMLProps<HTMLInputElement>
>(({ name, value, onChange, type = "text", placeholder }, ref) => {
  return (
    <input
      className="border p-2 rounded"
      name={name}
      value={value}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      ref={ref}
    />
  );
});
Input.displayName = "Input";
