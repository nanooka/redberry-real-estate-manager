import { useEffect, useState } from "react";
import { getCities, getRegions } from "../../services/api/getData";
import CustomSelect from "./CustomSelect";

export default function Location({
  register,
  errors,
  clearErrors,
  setError,
  reset,
  setValue,
}) {
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

  console.log(regions);
  const handleRegionChange = (value) => {
    // const value = e.target.value;
    console.log(value);
    setSelectedRegion(value);
    clearErrors("region");
    if (!value) {
      setError("region", { type: "manual", message: "სავალდებულოა" });
    }
    setValue("region", value);
    saveToLocalStorage("region", value);
  };

  const handleCityChange = (value) => {
    // const value = e.target.value;
    console.log(value);
    setSelectedCity(value);
    clearErrors("city_id");
    if (!value) {
      setError("city_id", { type: "manual", message: "სავალდებულოა" });
    }
    setValue("city_id", value);
    saveToLocalStorage("city_id", value);
  };

  const handleAddressBlur = (e) => {
    const value = e.target.value;
    clearErrors("address");
    if (!value) {
      setError("address", { type: "manual", message: "სავალდებულოა" });
    } else if (value.length < 2) {
      setError("address", {
        type: "manual",
        message: "მინიმუმ ორი სიმბოლო",
      });
    }
  };

  const handleZipCodeBlur = (e) => {
    const value = e.target.value;
    clearErrors("zip_code");
    if (!value) {
      setError("zip_code", { type: "manual", message: "სავალდებულოა" });
    } else if (!/^\d+$/.test(value)) {
      setError("zip_code", {
        type: "manual",
        message: "მხოლოდ რიცხვები",
      });
    }
  };

  const saveToLocalStorage = (key, value) => {
    const existingData =
      JSON.parse(localStorage.getItem("listingFormData")) || {};
    localStorage.setItem(
      "listingFormData",
      JSON.stringify({ ...existingData, [key]: value })
    );
  };

  useEffect(() => {
    const fetchRegions = async () => {
      const data = await getRegions();
      setRegions(data);
    };

    const fetchCities = async () => {
      const data = await getCities();
      setCities(data);
    };

    fetchRegions();
    fetchCities();

    const savedData = JSON.parse(localStorage.getItem("listingFormData"));
    if (savedData) {
      reset(savedData);
      setSelectedRegion(savedData.region || "");
      setSelectedCity(savedData.city_id || "");
      setValue("region", savedData.region || "");
      setValue("city_id", savedData.city_id || "");
    }
  }, [reset, setValue]);

  // useEffect(() => {
  //   const savedData = JSON.parse(localStorage.getItem("listingFormData"));
  //   if (savedData) {
  //     reset(savedData);
  //     setSelectedRegion(savedData.region);
  //     setSelectedCity(savedData.city_id);
  //   }
  // }, [reset]);

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
            onBlur={handleAddressBlur}
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
            onBlur={handleZipCodeBlur}
            className="border border-[#808A93] rounded-[6px] p-[10px] focus:outline-none w-[384px] h-[42px]"
          />
          {errors.zip_code && (
            <span className="absolute -bottom-[24px] text-[#F93B1D] text-[14px]">
              {errors.zip_code.message}
            </span>
          )}
        </div>

        <CustomSelect
          options={regions}
          selectedValue={selectedRegion}
          onChange={handleRegionChange}
          label="რეგიონი"
          value="region_id"
          error={errors.region}
          // register={register}
        />
        {selectedRegion && (
          <CustomSelect
            options={filteredCities}
            selectedValue={selectedCity}
            onChange={handleCityChange}
            label="ქალაქი"
            value="city_id"
            error={errors.city_id}
            // register={register}
          />
        )}
      </div>
    </div>
  );
}
