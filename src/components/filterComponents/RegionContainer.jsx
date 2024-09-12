import { useEffect, useState } from "react";

export default function RegionContainer() {
  const [regions, setRegions] = useState([]);
  const [selectedRegions, setSelectedRegions] = useState({});

  useEffect(() => {
    const getRegions = async () => {
      try {
        const res = await fetch(
          "https://api.real-estate-manager.redberryinternship.ge/api/regions"
        );
        const data = await res.json();
        // console.log(data);
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
    <div className="bg-[#fff] absolute top-[50px] -left-[21px] w-[731px] h-[284px] rounded-[10px] p-[24px] border border-[#DBDBDB] flex flex-col justify-between">
      <span className="text-[#021526] font-[500] text-[16px]">
        რეგიონის მიხედვით
      </span>
      <div className="grid grid-cols-3 gap-4 mt-[20px]">
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
      <button className="bg-[#f93b1d] rounded-[8px] px-[14px] py-[8px] text-[#fff] font-[500] text-[14px] hover:bg-[#DF3014] self-end">
        არჩევა
      </button>
    </div>
  );
}
