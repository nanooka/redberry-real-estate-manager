import { useEffect, useState } from "react";
import ChooseBtn from "./ChooseBtn";

export default function PriceContainer({
  setActiveFilter,
  minPrice,
  maxPrice,
  dispatch,
}) {
  const [localMinPrice, setLocalMinPrice] = useState(minPrice);
  const [localMaxPrice, setLocalMaxPrice] = useState(maxPrice);
  const [errorPrice, setErrorPrice] = useState(false);
  const [isFormComplete, setIsFormComplete] = useState(false);

  const prices = [50000, 100000, 150000, 200000, 300000];

  const handlePriceClick = (price, type) => {
    if (type === "min") {
      setLocalMinPrice(price);
      if (localMaxPrice && price > localMaxPrice) {
        setLocalMaxPrice("");
      }
    } else if (type === "max") {
      setLocalMaxPrice(price);
    }
  };

  useEffect(() => {
    if (
      localMinPrice &&
      localMaxPrice &&
      parseFloat(localMaxPrice) < parseFloat(localMinPrice)
    ) {
      setErrorPrice(true);
    } else {
      setErrorPrice(false);
    }

    if (localMinPrice && localMaxPrice) {
      setIsFormComplete(true);
    } else {
      setIsFormComplete(false);
    }
  }, [localMinPrice, localMaxPrice]);

  const handleConfirm = () => {
    dispatch({
      type: "SET_PRICE",
      payload: { min: localMinPrice, max: localMaxPrice },
    });
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="z-10 flex flex-col gap-[24px] justify-between bg-[#fff] absolute top-[50px] left-0 w-[382px]  rounded-[10px] p-[24px] border border-[#DBDBDB] cursor-context-menu shadow-[5px_5px_12px_0px_rgba(2,21,38,0.08)]"
    >
      <span className="text-[#021526] font-[500] text-[16px]">
        ფასის მიხედვით
      </span>

      <div className="flex gap-[14px] relative">
        <div className="relative w-[155px]">
          <input
            type="number"
            value={localMinPrice}
            onChange={(e) => setLocalMinPrice(e.target.value)}
            placeholder="დან"
            className={`w-[155px] h-[42px] p-[10px] border rounded-[6px] text-[14px] outline-none ${
              errorPrice ? "border-[#F93B1D]" : "border-[#808A93]"
            }`}
          />
          <span className="absolute right-[10px] top-[12px] text-[#2D3648] text-[12px]">
            ₾
          </span>
        </div>

        <div className="relative w-[155px]">
          <input
            type="number"
            value={localMaxPrice}
            onChange={(e) => setLocalMaxPrice(e.target.value)}
            placeholder="მდე"
            className={`w-[155px] h-[42px] p-[10px] border rounded-[6px] text-[14px] outline-none ${
              errorPrice ? "border-[#F93B1D]" : "border-[#808A93]"
            }`}
          />
          <span className="absolute right-[10px] top-[12px] text-[#2D3648] text-[12px]">
            ₾
          </span>
        </div>

        {errorPrice && (
          <span className="text-[#F93B1D] text-[12px] absolute -bottom-[24px]">
            ჩაწერეთ ვალიდური მონაცემები
          </span>
        )}
      </div>

      <div className="flex gap-[100px]">
        <div>
          <span className="font-[500] text-[14px] text-[#021526]">
            მინ. ფასი
          </span>
          <div className="mt-[10px]">
            {prices.map((price) => (
              <p
                key={price}
                className="text-[#2D3648] cursor-pointer"
                onClick={() => handlePriceClick(price, "min")}
              >
                {price.toLocaleString()} ₾
              </p>
            ))}
          </div>
        </div>

        <div>
          <span className="font-[500] text-[14px] text-[#021526]">
            მაქს. ფასი
          </span>
          <div className="mt-[10px]">
            {prices.map((price) => (
              <p
                key={price}
                className={` cursor-pointer ${
                  localMinPrice > price ? "opacity-[40%]" : "text-[#2D3648]"
                }`}
                onClick={() => {
                  if (localMinPrice <= price) handlePriceClick(price, "max");
                }}
              >
                {price.toLocaleString()} ₾
              </p>
            ))}
          </div>
        </div>
      </div>

      <ChooseBtn
        setActiveFilter={setActiveFilter}
        error={errorPrice || !isFormComplete}
        onConfirm={handleConfirm}
      />
    </div>
  );
}
