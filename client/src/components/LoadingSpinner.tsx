import React from "react";

const Spinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <div
        className={`animate-spin rounded-full border-t-2 border-b-2 border-gray-900`}
      >
        B<span className="text-pink-700">b</span>
      </div>
    </div>
  );
};

export default Spinner;
