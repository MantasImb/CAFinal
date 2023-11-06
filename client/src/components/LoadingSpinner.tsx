import React from "react";

interface SpinnerProps {
  size?: number;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 6 }) => {
  return (
    <div className="flex justify-center">
      <div
        className="border-4 border-t-transparent border-r-transparent border-b-transparent border-l-white animate-spin"
        style={{ width: `${size}rem`, height: `${size}rem` }}
      ></div>
    </div>
  );
};

export default Spinner;
