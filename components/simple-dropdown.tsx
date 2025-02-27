import React, { useState } from "react";

const SimpleDropdown = ({
  options,
  onBlur,
  onSelect,
  defaultOption,
}: {
  options: string[];
  onBlur: Function;
  onSelect: Function;
  defaultOption?: string;
}) => {
  const [selected, setSelected] = useState(defaultOption || options[0]);

  const handleChange = (event: any) => {
    const value = event?.target?.value;
    setSelected(value);
    onSelect(value);
  };

  const handleBlur = (event: any) => {
    onBlur();
  };

  return (
    <select value={selected} onChange={handleChange} onBlur={handleBlur}>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default SimpleDropdown;
