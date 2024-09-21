import { useEffect, useState } from "react";
import { getCities, getRegions } from "../../services/api/getData";

export default function Location({
  register,
  errors,
  handleInputChange,
  clearErrors,
  reset,
}) {
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

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

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("listingFormData"));
    if (savedData) {
      reset(savedData);
      setSelectedRegion(savedData.region);
    }
  }, [reset, setSelectedRegion]);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("listingFormData"));
    if (savedData) {
      reset(savedData);
      setSelectedCity(savedData.city_id);
    }
  }, [reset]);

  const filteredCities = selectedRegion
    ? cities.filter((city) => city.region_id === parseInt(selectedRegion))
    : [];

  return (
    <div>
      <p className="text-[#1A1A1F] font-[500]">მდებარეობა</p>
      <div className="grid grid-cols-2 gap-y-[40px] gap-[22px] mt-[22px]">
        <div className="flex flex-col gap-[3px] relative">
          <label className="text-[#021526] text-[14px] font-[500]">
            მისამართი*
          </label>
          <input
            type="text"
            {...register("address", {
              required: "სავალდებულოა",
              minLength: {
                value: 2,
                message: "მინიმუმ ორი სიმბოლო",
              },
            })}
            onChange={handleInputChange}
            className="border border-[#808A93] rounded-[6px] p-[10px] focus:outline-none w-[384px] h-[42px]"
          />
          {errors.address && (
            <span className="absolute -bottom-[24px] text-[#F93B1D] text-[14px]">
              {errors.address.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-[3px] relative">
          <label className="text-[#021526] text-[14px] font-[500]">
            საფოსტო ინდექსი*
          </label>
          <input
            type="text"
            {...register("zip_code", {
              required: "სავალდებულოა",
              pattern: {
                value: /^\d+$/,
                message: "მხოლოდ რიცხვები",
              },
            })}
            onChange={handleInputChange}
            className="border border-[#808A93] rounded-[6px] p-[10px] focus:outline-none w-[384px] h-[42px]"
          />
          {errors.zip_code && (
            <span className="absolute -bottom-[24px] text-[#F93B1D] text-[14px]">
              {errors.zip_code.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-[3px] relative">
          <label className="text-[#021526] text-[14px] font-[500]">
            რეგიონი*
          </label>
          <select
            {...register("region", { required: "სავალდებულოა" })}
            value={selectedRegion}
            onChange={(e) => {
              setSelectedRegion(e.target.value);
              clearErrors("region");
              handleInputChange(e);
            }}
            className="border border-[#808A93] rounded-[6px] p-[10px] focus:outline-none w-[384px] h-[42px]"
          >
            <option value="" defaultValue>
              აირჩიე რეგიონი
            </option>
            {regions?.map((region) => (
              <option key={region.name} value={region.id}>
                {region.name}
              </option>
            ))}
          </select>
          {errors.region && (
            <span className="absolute -bottom-[24px] text-[#F93B1D] text-[14px]">
              {errors.region.message}
            </span>
          )}
        </div>
        {selectedRegion && (
          <div className="flex flex-col gap-[3px] relative">
            <label className="text-[#021526] text-[14px] font-[500]">
              ქალაქი*
            </label>
            <select
              {...register("city_id", { required: "სავალდებულოა" })}
              value={selectedCity}
              onChange={(e) => {
                setSelectedCity(e.target.value);
                handleInputChange(e);
              }}
              className="border border-[#808A93] rounded-[6px] p-[10px] focus:outline-none w-[384px] h-[42px]"
            >
              <option value="" defaultValue>
                აირჩიე ქალაქი
              </option>
              {filteredCities?.map((city) => (
                <option key={city.name} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
            {errors.city_id && (
              <span className="absolute -bottom-[24px] text-[#F93B1D] text-[14px]">
                {errors.city_id.message}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
