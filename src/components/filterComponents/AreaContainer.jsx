import { useEffect, useState } from "react";
import ChooseBtn from "./ChooseBtn";

export default function AreaContainer({
  setActiveFilter,
  minArea,
  maxArea,
  dispatch,
}) {
  const [localMinArea, setLocalMinArea] = useState(minArea);
  const [localMaxArea, setLocalMaxArea] = useState(maxArea);
  const [errorArea, setErrorArea] = useState(false);
  const [isFormComplete, setIsFormComplete] = useState(false);

  const areas = [50, 100, 150, 200, 300];

  const handleAreaClick = (area, type) => {
    if (type === "min") {
      setLocalMinArea(area);
      if (localMaxArea && area > localMaxArea) {
        setLocalMaxArea("");
      }
    } else if (type === "max") {
      setLocalMaxArea(area);
    }
  };

  useEffect(() => {
    if (
      localMinArea &&
      localMaxArea &&
      parseFloat(localMaxArea) < parseFloat(localMinArea)
    ) {
      setErrorArea(true);
    } else {
      setErrorArea(false);
    }

    if (localMinArea && localMaxArea) {
      setIsFormComplete(true);
    } else {
      setIsFormComplete(false);
    }
  }, [localMinArea, localMaxArea]);

  const handleConfirm = () => {
    dispatch({
      type: "SET_AREA",
      payload: { min: localMinArea, max: localMaxArea },
    });
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="z-10 flex flex-col gap-[24px] justify-between bg-[#fff] absolute top-[50px] left-0 w-[382px] rounded-[10px] p-[24px] border border-[#DBDBDB] cursor-context-menu shadow-[5px_5px_12px_0px_rgba(2,21,38,0.08)]"
    >
      <span className="text-[#021526] font-[500] text-[16px]">
        ფართობის მიხედვით
      </span>

      <div className="flex gap-[14px] relative">
        <div className="relative w-[155px]">
          <input
            type="number"
            value={localMinArea}
            onChange={(e) => setLocalMinArea(e.target.value)}
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
            type="number"
            value={localMaxArea}
            onChange={(e) => setLocalMaxArea(e.target.value)}
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
                  localMinArea > area ? "opacity-[40%]" : "text-[#2D3648]"
                }`}
                onClick={() => {
                  if (localMinArea <= area) handleAreaClick(area, "max");
                }}
              >
                {area.toLocaleString()}{" "}
                <span className="text-[#021526B2]">მ²</span>
              </p>
            ))}
          </div>
        </div>
      </div>

      <ChooseBtn
        setActiveFilter={setActiveFilter}
        error={errorArea || !isFormComplete}
        onConfirm={handleConfirm}
      />
    </div>
  );
}
