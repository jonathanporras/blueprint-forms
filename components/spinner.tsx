import React from "react";

interface SpinnerProps {
  color?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ color = "#005680" }) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div
        className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin"
        style={{ borderColor: color, borderTopColor: "transparent" }}
      />
    </div>
  );
};

export default Spinner;
