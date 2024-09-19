import { useEffect, useState } from "react";
import { getCities, getRegions } from "../api/getData";

export default function Listing() {
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchRegions = async () => {
      const data = await getRegions();
      setRegions(data);
    };

    fetchRegions();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      const data = await getCities();
      setCities(data);
    };

    fetchCities();
  }, []);

  console.log(cities);

  return (
    <div className="flex flex-col items-center gap-[32px] mt-[32px]">
      <h1 className="text-[#021526] text-[32px] font-[500]">
        ლისტინგის დამატება
      </h1>
      <form action="" className="w-[790px] h-[1211px] flex flex-col gap-[80px]">
        <div>
          <p className="text-[#1A1A1F] font-[500]">გარიგების ტიპი</p>
          <div className="flex gap-[32px] mt-[8px]">
            <label className="cursor-pointer text-[#021526] text-[14px] flex gap-[6px]">
              <input
                type="radio"
                id="sale"
                name="dealType"
                value="sale"
                className="accent-[#000] cursor-pointer"
              />
              იყიდება
            </label>
            <label className="cursor-pointer text-[#021526] text-[14px] flex gap-[6px]">
              <input
                type="radio"
                id="rent"
                name="dealType"
                value="rent"
                className="accent-[#000] cursor-pointer"
              />
              ქირავდება
            </label>
          </div>
        </div>

        <div>
          <p className="text-[#1A1A1F] font-[500] bla">მდებარეობა</p>
          <div className="grid grid-cols-2 gap-[22px] mt-[22px]">
            <div className="flex flex-col gap-[3px]">
              <label className="text-[#021526] text-[14px] font-[500]">
                მისამართი*
              </label>
              <input
                type="text"
                name="adress"
                id="adress"
                className="border border-[#808A93] rounded-[6px] p-[10px] focus:outline-none w-[384px] h-[42px]"
              />
            </div>
            <div className="flex flex-col gap-[3px]">
              <label className="text-[#021526] text-[14px] font-[500]">
                საფოსტო ინდექსი*
              </label>
              <input
                type="text"
                name="zip"
                id="zip"
                className="border border-[#808A93] rounded-[6px] p-[10px] focus:outline-none w-[384px] h-[42px]"
              />
            </div>
            <div className="flex flex-col gap-[3px]">
              <label className="text-[#021526] text-[14px] font-[500]">
                რეგიონი*
              </label>
              <select className="border border-[#808A93] rounded-[6px] p-[10px] focus:outline-none w-[384px] h-[42px]">
                <option value="" defaultValue>
                  აირჩიე რეგიონი
                </option>
                {regions?.map((region) => (
                  <option key={region.name} value={region.name}>
                    {region.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-[3px]">
              <label className="text-[#021526] text-[14px] font-[500]">
                ქალაქი*
              </label>
              <select className="border border-[#808A93] rounded-[6px] p-[10px] focus:outline-none w-[384px] h-[42px]">
                <option value="" defaultValue>
                  აირჩიე ქალაქი
                </option>
                {cities?.map((city) => (
                  <option key={city.name} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
