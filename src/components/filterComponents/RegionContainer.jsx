import { useEffect, useState } from "react";
import ChooseBtn from "./ChooseBtn";
import { getRegions } from "../../api/getData";

export default function RegionContainer({
  setActiveFilter,
  dispatch,
  selectedRegions,
}) {
  const [regions, setRegions] = useState([]);
  const [selectedRegionsState, setSelectedRegionsState] = useState({});

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const data = await getRegions();
        setRegions(data);

        const initialSelections = data.reduce((acc, region) => {
          acc[region.name] = selectedRegions.includes(region.name);
          return acc;
        }, {});

        setSelectedRegionsState(initialSelections);
      } catch (error) {
        console.error("Error fetching regions:", error);
      }
    };

    fetchRegions();
  }, [selectedRegions]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    const updatedSelections = { ...selectedRegionsState, [name]: checked };
    setSelectedRegionsState(updatedSelections);
  };

  const handleConfirm = () => {
    const selectedRegionNames = Object.keys(selectedRegionsState).filter(
      (name) => selectedRegionsState[name]
    );

    dispatch({
      type: "SET_REGION",
      payload: selectedRegionNames,
    });
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="z-10 bg-[#fff] absolute top-[50px] left-0 w-[731px] rounded-[10px] p-[24px] border border-[#DBDBDB] flex flex-col justify-between gap-[32px] cursor-context-menu shadow-[5px_5px_12px_0px_rgba(2,21,38,0.08)]"
    >
      <span className="text-[#021526] font-[500] text-[16px]">
        რეგიონის მიხედვით
      </span>
      <div className="grid grid-cols-3 gap-4">
        {regions.map((region) => (
          <label
            key={region.id}
            className="relative flex items-center space-x-2 cursor-pointer"
          >
            <input
              type="checkbox"
              name={region.name}
              checked={selectedRegionsState[region.name]}
              onChange={handleCheckboxChange}
              className="peer relative appearance-none shrink-0 border border-[#DBDBDB] rounded-[2px] h-[20px] w-[20px] cursor-pointer focus:outline-none checked:bg-[#45A849] checked:border-[#45A849]"
            />
            <svg
              className="absolute -left-[4px] top-[4px] hidden peer-checked:block"
              width="13"
              height="11"
              viewBox="0 0 13 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.4546 1.4541L4.57959 9.63592L1.45459 5.91691"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-[#021526] text-[14px] font-[400]">
              {region.name}
            </span>
          </label>
        ))}
      </div>
      <ChooseBtn setActiveFilter={setActiveFilter} onConfirm={handleConfirm} />
    </div>
  );
}
