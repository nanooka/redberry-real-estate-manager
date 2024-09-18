import { useEffect, useState } from "react";
import ChooseBtn from "./ChooseBtn";

export default function PriceContainer({ setActiveFilter }) {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [errorPrice, setErrorPrice] = useState(false);

  const prices = [50000, 100000, 150000, 200000, 300000];

  const handleMinPriceChange = (e) => {
    const value = e.target.value;
    const floatValue = value.match(/^\d*\.?\d{0,2}$/);
    if (floatValue) setMinPrice(floatValue[0]);
  };

  const handleMaxPriceChange = (e) => {
    const value = e.target.value;
    const floatValue = value.match(/^\d*\.?\d{0,2}$/);
    if (floatValue) setMaxPrice(floatValue[0]);
  };

  const handlePriceClick = (price, type) => {
    if (type === "min") {
      setMinPrice(price);
      if (maxPrice && price > maxPrice) {
        setMaxPrice("");
      }
    } else if (type === "max") {
      setMaxPrice(price);
    }
  };

  useEffect(() => {
    if (minPrice && maxPrice && parseFloat(maxPrice) < parseFloat(minPrice)) {
      setErrorPrice(true);
    } else {
      setErrorPrice(false);
    }
  }, [minPrice, maxPrice]);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex flex-col gap-[24px] justify-between bg-[#fff] absolute top-[50px] left-0 w-[382px]  rounded-[10px] p-[24px] border border-[#DBDBDB] cursor-context-menu"
    >
      <span className="text-[#021526] font-[500] text-[16px]">
        ფასის მიხედვით
      </span>

      <div className="flex gap-[14px] relative">
        <div className="relative w-[155px]">
          <input
            type="text"
            value={minPrice}
            onChange={handleMinPriceChange}
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
            type="text"
            value={maxPrice}
            onChange={handleMaxPriceChange}
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
                  minPrice > price ? "opacity-[40%]" : "text-[#2D3648]"
                }`}
                onClick={() => {
                  if (minPrice <= price) handlePriceClick(price, "max");
                }}
              >
                {price.toLocaleString()} ₾
              </p>
            ))}
          </div>
        </div>
      </div>

      <ChooseBtn setActiveFilter={setActiveFilter} />
    </div>
  );
}
