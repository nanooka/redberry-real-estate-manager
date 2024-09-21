import { useEffect, useRef, useState } from "react";

const CustomSelect = ({
  options,
  selectedValue,
  onChange,
  label,
  // value,
  error,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSelect = (value) => {
    onChange(value);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="flex flex-col gap-[3px] relative">
      <label className="text-[#021526] text-[14px] font-[500]">{label}</label>
      <div
        className="border border-[#808A93] rounded-[6px] p-[10px] cursor-pointer w-[384px] h-[42px] flex items-center justify-between"
        onClick={() => setIsDropdownOpen((prev) => !prev)}
      >
        <span>
          {selectedValue
            ? options.find((option) => option.id === parseInt(selectedValue))
                ?.name
            : `აირჩიე ${label}`}
        </span>
        {/* <span>{selectedValue || `აირჩიე ${label.toLowerCase()}`}</span> */}
        <img src="/images/ArrowDown.svg" alt="add" />
      </div>
      {isDropdownOpen && (
        <ul className="absolute top-[65px] z-10 bg-white border border-[#808A93] rounded-[6px] w-[384px] max-h-60 overflow-auto">
          <li
            onClick={() => handleSelect("")}
            className="py-2 px-3 hover:bg-gray-100 cursor-pointer border-b border-[#808A93]"
          >
            აირჩიე {label}
          </li>
          {options.map((option) => (
            <li
              key={option.id}
              onClick={() => handleSelect(option.id)}
              className="py-2 px-3 hover:bg-gray-100 cursor-pointer border-b border-[#808A93]"
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
      {error && (
        <span className="absolute -bottom-[24px] text-[#F93B1D] text-[14px]">
          {error.message}
        </span>
      )}
    </div>
  );
};

export default CustomSelect;
