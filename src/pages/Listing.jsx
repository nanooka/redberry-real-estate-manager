import { useEffect, useState } from "react";
import { getAgents, getCities, getRegions } from "../api/getData";
import { useForm } from "react-hook-form";
import CustomImageInput from "../components/CustomImageInput";
import { addRealEstate } from "../api/postData";
import { Link, useNavigate } from "react-router-dom";

export default function Listing() {
  const [agents, setAgents] = useState([]);
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm();
  const navigate = useNavigate();

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
    const fetchAgents = async () => {
      const data = await getAgents();
      setAgents(data);
    };
    fetchAgents();
  }, []);

  const filteredCities = selectedRegion
    ? cities.filter((city) => city.region_id === parseInt(selectedRegion))
    : [];

  const onSubmit = async (data) => {
    try {
      await addRealEstate(data);
      navigate("/");
    } catch (error) {
      console.error("Failed to add real estate", error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-[32px] py-[40px]">
      <h1 className="text-[#021526] text-[32px] font-[500]">
        ლისტინგის დამატება
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[790px] h-[1211px] flex flex-col gap-[80px]"
      >
        <div>
          <p className="text-[#1A1A1F] font-[500]">გარიგების ტიპი</p>
          <div className="flex gap-[32px] mt-[8px]">
            <label className="cursor-pointer text-[#021526] text-[14px] flex gap-[6px]">
              <input
                type="radio"
                id="sale"
                name="is_rental"
                {...register("is_rental", { required: true })}
                value="sale"
                className="accent-[#000] cursor-pointer"
              />
              იყიდება
            </label>
            <label className="cursor-pointer text-[#021526] text-[14px] flex gap-[6px]">
              <input
                type="radio"
                id="rent"
                name="is_rental"
                {...register("is_rental", { required: true })}
                value="rent"
                className="accent-[#000] cursor-pointer"
              />
              ქირავდება
            </label>
            {errors.is_rental && (
              <span className=" text-[#F93B1D]">სავალდებულოა</span>
            )}
          </div>
        </div>

        <div>
          <p className="text-[#1A1A1F] font-[500]">მდებარეობა</p>
          <div className="grid grid-cols-2 gap-[22px] mt-[22px]">
            <div className="flex flex-col gap-[3px]">
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
                className="border border-[#808A93] rounded-[6px] p-[10px] focus:outline-none w-[384px] h-[42px]"
              />
              {errors.address && (
                <span className=" text-[#F93B1D]">
                  {errors.address.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-[3px]">
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
                className="border border-[#808A93] rounded-[6px] p-[10px] focus:outline-none w-[384px] h-[42px]"
              />
              {errors.zip_code && (
                <span className=" text-[#F93B1D]">
                  {errors.zip_code.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-[3px]">
              <label className="text-[#021526] text-[14px] font-[500]">
                რეგიონი*
              </label>
              <select
                {...register("region", { required: "სავალდებულოა" })}
                value={selectedRegion}
                onChange={(e) => {
                  setSelectedRegion(e.target.value);
                  clearErrors("region");
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
                <span className=" text-[#F93B1D]">{errors.region.message}</span>
              )}
            </div>
            {selectedRegion && (
              <div className="flex flex-col gap-[3px]">
                <label className="text-[#021526] text-[14px] font-[500]">
                  ქალაქი*
                </label>
                <select
                  {...register("city_id", { required: "სავალდებულოა" })}
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
                  <span className=" text-[#F93B1D]">
                    {errors.city_id.message}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        <div>
          <p className="text-[#1A1A1F] font-[500]">ბინის დეტალები</p>
          <div className="grid grid-cols-2 gap-[22px] mt-[22px]">
            <div className="flex flex-col gap-[3px]">
              <label className="text-[#021526] text-[14px] font-[500]">
                ფასი*
              </label>
              <input
                type="text"
                {...register("price", {
                  required: "სავალდებულოა",
                  pattern: {
                    value: /^\d+$/,
                    message: "მხოლოდ რიცხვები",
                  },
                })}
                className="border border-[#808A93] rounded-[6px] p-[10px] focus:outline-none w-[384px] h-[42px]"
              />
              {errors.price && (
                <span className=" text-[#F93B1D]">{errors.price.message}</span>
              )}
            </div>
            <div className="flex flex-col gap-[3px]">
              <label className="text-[#021526] text-[14px] font-[500]">
                ფართობი*
              </label>
              <input
                type="text"
                {...register("area", {
                  required: "სავალდებულოა",
                  pattern: {
                    value: /^\d+$/,
                    message: "მხოლოდ რიცხვები",
                  },
                })}
                className="border border-[#808A93] rounded-[6px] p-[10px] focus:outline-none w-[384px] h-[42px]"
              />
              {errors.area && (
                <span className=" text-[#F93B1D]">{errors.area.message}</span>
              )}
            </div>
            <div className="flex flex-col gap-[3px]">
              <label className="text-[#021526] text-[14px] font-[500]">
                საძინებლების რაოდენობა*
              </label>
              <input
                type="text"
                {...register("bedrooms", {
                  required: "სავალდებულოა",
                  pattern: {
                    value: /^\d+$/,
                    message: "მხოლოდ რიცხვები",
                  },
                  validate: {
                    wholeNumber: (value) => {
                      return (
                        Number.isInteger(Number(value)) || "მხოლოდ მთელი რიცხვი"
                      );
                    },
                  },
                })}
                className="border border-[#808A93] rounded-[6px] p-[10px] focus:outline-none w-[384px] h-[42px]"
              />
              {errors.bedrooms && (
                <span className=" text-[#F93B1D]">
                  {errors.bedrooms.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-[3px] mt-[22px]">
            <label className="text-[#021526] text-[14px] font-[500]">
              აღწერა*
            </label>
            <textarea
              name="description"
              {...register("description", {
                required: "სავალდებულოა",
                validate: {
                  minWords: (value) => {
                    const wordCount = value.trim().split(/\s+/).length;
                    return wordCount >= 5 || "მინიმუმ 5 სიტყვა";
                  },
                },
              })}
              className="border border-[#808A93] rounded-[6px] p-[10px] focus:outline-none w-[788px] h-[135px]"
            ></textarea>
            {errors.description && (
              <span className=" text-[#F93B1D]">
                {errors.description.message}
              </span>
            )}
          </div>

          <div className="mt-[22px]">
            <CustomImageInput
              setValue={setValue}
              clearErrors={clearErrors}
              errors={errors}
              register={register}
            />
          </div>
        </div>

        <div className="flex flex-col gap-[3px]">
          <label className="text-[#021526] text-[14px] font-[500]">
            აგენტი*
          </label>
          <select
            {...register("agent_id", { required: "სავალდებულოა" })}
            className="border border-[#808A93] rounded-[6px] p-[10px] focus:outline-none w-[384px] h-[42px]"
          >
            <option value="" defaultValue>
              აირჩიე აგენტი
            </option>
            {agents?.map((agent) => (
              <option key={agent.id} value={agent.id}>
                {agent.name} {agent.surname}
              </option>
            ))}
          </select>
          {errors.agent_id && (
            <span className=" text-[#F93B1D]">{errors.agent_id.message}</span>
          )}
        </div>

        <div className="flex gap-[20px] self-end">
          <Link to={"/"}>
            <button className="h-[47px] text-[#F93B1D] hover:text-[#fff] hover:bg-[#F93B1D] border border-[#F93B1D] font-[500] rounded-[10px] px-[16px] py-[10px]">
              გაუქმება
            </button>
          </Link>
          <button
            type="submit"
            className="h-[47px] bg-[#F93B1D] hover:bg-[#DF3014] text-[#fff] font-[500] rounded-[10px] px-[16px] py-[10px]"
          >
            დაამატე ლისტინგი
          </button>
        </div>
      </form>
    </div>
  );
}
