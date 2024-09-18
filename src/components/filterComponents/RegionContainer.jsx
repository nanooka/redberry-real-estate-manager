import { useEffect, useState } from "react";
import ChooseBtn from "./ChooseBtn";

export default function RegionContainer({ setActiveFilter }) {
  const [regions, setRegions] = useState([]);
  const [selectedRegions, setSelectedRegions] = useState({});

  useEffect(() => {
    const getRegions = async () => {
      try {
        const res = await fetch(
          "https://api.real-estate-manager.redberryinternship.ge/api/regions"
        );
        const data = await res.json();
        const initialSelections = data.reduce((acc, region) => {
          acc[region.id] = false;
          return acc;
        }, {});
        setSelectedRegions(initialSelections);
        setRegions(data);
      } catch (error) {
        console.log(error);
      }
    };
    getRegions();
  }, []);
  console.log(regions);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSelectedRegions({ ...selectedRegions, [name]: checked });
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="bg-[#fff] absolute top-[50px] left-0 w-[731px] rounded-[10px] p-[24px] border border-[#DBDBDB] flex flex-col justify-between gap-[32px] cursor-context-menu"
    >
      <span className="text-[#021526] font-[500] text-[16px]">
        რეგიონის მიხედვით
      </span>
      <div className="grid grid-cols-3 gap-4">
        {regions.map((region) => (
          <label
            key={region.id}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <input
              type="checkbox"
              name={region.id}
              checked={selectedRegions[region.id]}
              onChange={handleCheckboxChange}
              className="accent-[#45A849] border h-[20px] w-[20px] cursor-pointer"
            />
            <span className="text-[#021526] text-[14px] font-[400]">
              {region.name}
            </span>
          </label>
        ))}
      </div>
      <ChooseBtn setActiveFilter={setActiveFilter} />
    </div>
  );
}
