import { useState } from "react";
import ChooseBtn from "./ChooseBtn";

export default function RoomsContainer({ setActiveFilter }) {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    const inputValue = e.target.value;
    if (/^\d{0,2}$/.test(inputValue)) {
      setValue(inputValue);
    }
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex flex-col gap-[32px] justify-between bg-[#fff] absolute top-[50px] left-0 w-[282px] rounded-[10px] p-[24px] border border-[#DBDBDB] cursor-context-menu"
    >
      <span className="text-[#021526] font-[500] text-[16px]">
        საძინებლების რაოდენობა
      </span>
      <input
        type="number"
        value={value}
        onChange={handleChange}
        className="w-[41px] h-[42px] rounded-[6px] border border-[#808A93] p-[10px] outline-none"
      />
      <ChooseBtn setActiveFilter={setActiveFilter} />
    </div>
  );
}
