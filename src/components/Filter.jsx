import { useState } from "react";
import RegionContainer from "./filterComponents/RegionContainer";
import PriceContainer from "./filterComponents/PriceContainer";
import AreaContainer from "./filterComponents/AreaContainer";
import RoomsContainer from "./filterComponents/RoomsContainer";

export default function Filter() {
  const [activeFilter, setActiveFilter] = useState(null);

  const filters = [
    {
      name: "region",
      label: "რეგიონი",
      component: <RegionContainer setActiveFilter={setActiveFilter} />,
    },
    {
      name: "price",
      label: "საფასო კატეგორია",
      component: <PriceContainer setActiveFilter={setActiveFilter} />,
    },
    { name: "area", label: "ფართობი", component: <AreaContainer /> },
    {
      name: "rooms",
      label: "საძინებლების რაოდენობა",
      component: <RoomsContainer />,
    },
  ];

  const handleFilterClick = (filterName) => {
    setActiveFilter(activeFilter === filterName ? null : filterName);
  };

  console.log(filters);

  return (
    <div className="w-[785px] h-[47px] rounded-[10px] border border-[#DBDBDB] p-[6px] flex justify-around">
      {filters.map((filter) => (
        <div
          key={filter.name}
          className={`flex items-center gap-[4px] px-[14px] py-[8px] rounded-[6px] relative cursor-pointer ${
            activeFilter === filter.name && "bg-[#F3F3F3]"
          }`}
          onClick={() => handleFilterClick(filter.name)}
        >
          <span className="text-[16px] text-[#021526] font-[500]">
            {filter.label}
          </span>
          {activeFilter === filter.name ? (
            <img
              src="/images/ArrowUp.svg"
              alt="arrow"
              className="w-[14px] h-[14px]"
            />
          ) : (
            <img
              src="/images/ArrowDown.svg"
              alt="arrow"
              className="w-[14px] h-[14px]"
            />
          )}

          {activeFilter === filter.name && filter.component}
        </div>
      ))}
    </div>
  );
}
