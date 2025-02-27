import { useState } from "react";

interface SimpleDropdownProps {
  options: string[];
  onSelect: (value: string) => void;
}

const SimpleDropdown: React.FC<SimpleDropdownProps> = ({ options, onSelect }) => {
  const [selected, setSelected] = useState(options[0]);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: string) => {
    setSelected(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-64">
      <button
        className="w-full p-2 bg-white border rounded-md shadow-sm text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected}
      </button>
      {isOpen && (
        <ul className="w-full bg-white border rounded-md shadow-md mt-1 z-1">
          {options.map((option) => (
            <li
              key={option}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SimpleDropdown;
