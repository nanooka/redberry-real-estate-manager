import { useEffect, useReducer, useRef, useState } from "react";
import RegionContainer from "./filterComponents/RegionContainer";
import PriceContainer from "./filterComponents/PriceContainer";
import AreaContainer from "./filterComponents/AreaContainer";
import RoomsContainer from "./filterComponents/RoomsContainer";

const initialState = {
  region: [],
  price: { min: "", max: "" },
  area: { min: "", max: "" },
  rooms: "",
};

function filterReducer(state, action) {
  switch (action.type) {
    case "SET_REGION":
      return { ...state, region: action.payload };
    case "SET_PRICE":
      return { ...state, price: { ...state.price, ...action.payload } };
    case "SET_AREA":
      return { ...state, area: { ...state.area, ...action.payload } };
    case "SET_ROOMS":
      return { ...state, rooms: action.payload };
    case "RESET_ONE_FILTER":
      return {
        ...state,
        [action.payload]: initialState[action.payload],
      };
    case "RESET_FILTERS":
      return initialState;
    case "SET_STATE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export default function Filter() {
  const [activeFilter, setActiveFilter] = useState(null);
  const [state, dispatch] = useReducer(filterReducer, getInitialState());
  const filterRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  function getInitialState() {
    const savedState = localStorage.getItem("filterState");
    return savedState ? JSON.parse(savedState) : initialState;
  }

  const filters = [
    {
      name: "region",
      label: "რეგიონი",
      component: (
        <RegionContainer
          setActiveFilter={setActiveFilter}
          selectedRegions={state.region}
          dispatch={dispatch}
        />
      ),
    },
    {
      name: "price",
      label: "საფასო კატეგორია",
      component: (
        <PriceContainer
          setActiveFilter={setActiveFilter}
          dispatch={dispatch}
          minPrice={state.price.min}
          maxPrice={state.price.max}
        />
      ),
    },
    {
      name: "area",
      label: "ფართობი",
      component: (
        <AreaContainer
          setActiveFilter={setActiveFilter}
          dispatch={dispatch}
          minArea={state.area.min}
          maxArea={state.area.max}
        />
      ),
    },
    {
      name: "rooms",
      label: "საძინებლების რაოდენობა",
      component: (
        <RoomsContainer
          setActiveFilter={setActiveFilter}
          dispatch={dispatch}
          rooms={state.rooms}
        />
      ),
    },
  ];

  useEffect(() => {
    localStorage.setItem("filterState", JSON.stringify(state));
  }, [state]);

  // open filter container
  const handleFilterClick = (filterName) => {
    setActiveFilter(activeFilter === filterName ? null : filterName);
  };

  // remove certain filtre
  const handleRemoveFilter = (filterName) => {
    dispatch({ type: "RESET_ONE_FILTER", payload: filterName });
  };

  // remove all filter
  const handleClearAll = () => {
    dispatch({ type: "RESET_FILTERS" });
  };

  // display active filters in UI
  const activeFilters = [
    {
      name: "region",
      value: state.region.length > 0,
      display:
        state.region.length === 1 ? state.region[0] : state.region.join(", "),
    },
    {
      name: "price",
      value: state.price.min && state.price.max,
      display: `${state.price.min}₾ - ${state.price.max}₾`,
    },
    {
      name: "area",
      value: state.area.min && state.area.max,
      display: `${state.area.min}მ² - ${state.area.max}მ²`,
    },
    { name: "rooms", value: state.rooms, display: `${state.rooms}` },
  ].filter((filter) => filter.value);

  // on click outside close filter containre
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setActiveFilter(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={filterRef}>
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

      <div className="flex gap-2 mt-4">
        {activeFilters.map((filter) => (
          <div
            key={filter.name}
            className="border border-[#DBDBDB] px-[10px] py-[6px] rounded-[43px] flex items-center gap-[4px]"
          >
            <span className="text-[#021526CC] text-[14px]">
              {filter.display}
            </span>
            <button
              onClick={() => handleRemoveFilter(filter.name)}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {isHovered ? (
                <img src="/images/exitIconHover.svg" alt="remove" />
              ) : (
                <img src="/images/exitIcon.svg" alt="remove" />
              )}
            </button>
          </div>
        ))}

        {activeFilters.length > 0 && (
          <button
            onClick={handleClearAll}
            className="text-[14px] font-[500] text-[#021526]"
          >
            გასუფთავება
          </button>
        )}
      </div>
    </div>
  );
}
