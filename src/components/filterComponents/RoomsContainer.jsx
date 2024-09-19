import { useState } from "react";
import ChooseBtn from "./ChooseBtn";

export default function RoomsContainer({ setActiveFilter, rooms, dispatch }) {
  const [value, setValue] = useState(rooms);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    if (/^\d{0,2}$/.test(inputValue)) {
      setValue(inputValue);
    }
  };

  const handleConfirm = () => {
    dispatch({
      type: "SET_ROOMS",
      payload: value,
    });
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="z-10 flex flex-col gap-[32px] justify-between bg-[#fff] absolute top-[50px] left-0 w-[282px] rounded-[10px] p-[24px] border border-[#DBDBDB] cursor-context-menu shadow-[5px_5px_12px_0px_rgba(2,21,38,0.08)]"
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
      <ChooseBtn setActiveFilter={setActiveFilter} onConfirm={handleConfirm} />
    </div>
  );
}
