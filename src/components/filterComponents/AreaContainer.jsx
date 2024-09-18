import { useEffect, useState } from "react";
import ChooseBtn from "./ChooseBtn";

export default function AreaContainer({ setActiveFilter }) {
  const [minArea, setMinArea] = useState("");
  const [maxArea, setMaxArea] = useState("");
  const [errorArea, setErrorArea] = useState(false);

  const areas = [50, 100, 150, 200, 300];

  const handleMinAreaChange = (e) => {
    const value = e.target.value;
    const floatValue = value.match(/^\d*\.?\d{0,2}$/);
    if (floatValue) setMinArea(floatValue[0]);
  };

  const handleMaxAreaChange = (e) => {
    const value = e.target.value;
    const floatValue = value.match(/^\d*\.?\d{0,2}$/);
    if (floatValue) setMaxArea(floatValue[0]);
  };

  const handleAreaClick = (area, type) => {
    if (type === "min") {
      setMinArea(area);
      if (maxArea && area > maxArea) {
        setMaxArea("");
      }
    } else if (type === "max") {
      setMaxArea(area);
    }
  };

  useEffect(() => {
    if (minArea && maxArea && parseFloat(maxArea) < parseFloat(minArea)) {
      setErrorArea(true);
    } else {
      setErrorArea(false);
    }
  }, [minArea, maxArea]);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex flex-col gap-[24px] justify-between bg-[#fff] absolute top-[50px] left-0 w-[382px] rounded-[10px] p-[24px] border border-[#DBDBDB] cursor-context-menu"
    >
      <span className="text-[#021526] font-[500] text-[16px]">
        ფართობის მიხედვით
      </span>

      <div className="flex gap-[14px] relative">
        <div className="relative w-[155px]">
          <input
            type="text"
            value={minArea}
            onChange={handleMinAreaChange}
            placeholder="დან"
            className={`w-[155px] h-[42px] p-[10px] border rounded-[6px] text-[14px] outline-none ${
              errorArea ? "border-[#F93B1D]" : "border-[#808A93]"
            }`}
          />
          <span className="absolute right-[10px] top-[9px] text-[#021526B2] text-[16px]">
            მ²
          </span>
        </div>

        <div className="relative w-[155px]">
          <input
            type="text"
            value={maxArea}
            onChange={handleMaxAreaChange}
            placeholder="მდე"
            className={`w-[155px] h-[42px] p-[10px] border rounded-[6px] text-[14px] outline-none ${
              errorArea ? "border-[#F93B1D]" : "border-[#808A93]"
            }`}
          />
          <span className="absolute right-[10px] top-[9px] text-[#021526B2] text-[16px]">
            მ²
          </span>
        </div>

        {errorArea && (
          <span className="text-[#F93B1D] text-[12px] absolute -bottom-[24px]">
            ჩაწერეთ ვალიდური მონაცემები
          </span>
        )}
      </div>

      <div className="flex gap-[130px]">
        <div>
          <span className="relative font-[500] text-[14px] text-[#021526]">
            მინ. მ²
          </span>
          <div className="mt-[10px]">
            {areas.map((area) => (
              <p
                key={area}
                className="text-[#2D3648] cursor-pointer"
                onClick={() => handleAreaClick(area, "min")}
              >
                {area.toLocaleString()}{" "}
                <span className="text-[#021526B2]">მ²</span>
              </p>
            ))}
          </div>
        </div>

        <div>
          <span className="font-[500] text-[14px] text-[#021526]">
            მაქს. მ²
          </span>
          <div className="mt-[10px]">
            {areas.map((area) => (
              <p
                key={area}
                className={` cursor-pointer ${
                  minArea > area ? "opacity-[40%]" : "text-[#2D3648]"
                }`}
                onClick={() => {
                  if (minArea <= area) handleAreaClick(area, "max");
                }}
              >
                {area.toLocaleString()}{" "}
                <span className="text-[#021526B2]">მ²</span>
              </p>
            ))}
          </div>
        </div>
      </div>

      <ChooseBtn setActiveFilter={setActiveFilter} />
    </div>
  );
}
