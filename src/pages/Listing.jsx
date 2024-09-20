// import { useEffect, useState } from "react";
// import { getAgents, getCities, getRegions } from "../api/getData";
import { useForm } from "react-hook-form";
// import CustomImageInput from "../components/CustomImageInput";
import { addRealEstate } from "../api/postData";
import { Link, useNavigate } from "react-router-dom";
import DealTypeSelection from "../components/listingFormComponents/DealTypeSelection";
import Location from "../components/listingFormComponents/Location";
import HouseDetails from "../components/listingFormComponents/HouseDetails";
// import Description from "../components/listingFormComponents/Description";
import AgentSelection from "../components/listingFormComponents/AgentSelection";
// import { useState } from "react";

export default function Listing() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
    reset,
    getValues,
    // watch
  } = useForm({ mode: "onChange" });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await addRealEstate(data);
      localStorage.removeItem("listingFormData");
      navigate("/");
    } catch (error) {
      console.error("Failed to add real estate", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValue(name, value); // Update form state
    localStorage.setItem(
      "listingFormData",
      JSON.stringify({ ...getValues(), [name]: value })
    );
  };

  return (
    <div className="flex flex-col items-center gap-[32px] py-[40px]">
      <h1 className="text-[#021526] text-[32px] font-[500]">
        ლისტინგის დამატება
      </h1>
      {/* <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[790px] h-[1211px] flex flex-col gap-[80px]"
      >
        <div className="relative">
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
              />
              ქირავდება
            </label>
            {errors.is_rental && (
              <span className="absolute -bottom-[24px] text-[#F93B1D] text-[14px]">
                სავალდებულოა
              </span>
            )}
          </div>
        </div>


        <div>
          <p className="text-[#1A1A1F] font-[500]">ბინის დეტალები</p>
          <div className="grid grid-cols-2 gap-y-[40px] gap-[22px] mt-[22px]">
            <div className="flex flex-col gap-[3px] relative">
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
                onChange={handleInputChange}
                className="border border-[#808A93] rounded-[6px] p-[10px] focus:outline-none w-[384px] h-[42px]"
              />
              {errors.price && (
                <span className="absolute -bottom-[24px] text-[#F93B1D] text-[14px]">
                  {errors.price.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-[3px] relative">
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
                onChange={handleInputChange}
                className="border border-[#808A93] rounded-[6px] p-[10px] focus:outline-none w-[384px] h-[42px]"
              />
              {errors.area && (
                <span className="absolute -bottom-[24px] text-[#F93B1D] text-[14px]">
                  {errors.area.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-[3px] relative">
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
                onChange={handleInputChange}
                className="border border-[#808A93] rounded-[6px] p-[10px] focus:outline-none w-[384px] h-[42px]"
              />
              {errors.bedrooms && (
                <span className="absolute -bottom-[24px] text-[#F93B1D] text-[14px]">
                  {errors.bedrooms.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-[3px] mt-[40px] relative">
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
              onChange={handleInputChange}
              className="border border-[#808A93] rounded-[6px] p-[10px] focus:outline-none w-[788px] h-[135px]"
            ></textarea>
            {errors.description && (
              <span className="absolute -bottom-[24px] text-[#F93B1D] text-[14px]">
                {errors.description.message}
              </span>
            )}
          </div>

          <div className="mt-[40px]">
            <CustomImageInput
              setValue={setValue}
              clearErrors={clearErrors}
              errors={errors}
              register={register}
              onChange={handleInputChange}
              saveToLocalStorage={true}
            />
          </div>
        </div>

        <div className="flex flex-col gap-[3px] relative">
          <label className="text-[#021526] text-[14px] font-[500]">
            აგენტი*
          </label>
          <select
            {...register("agent_id", { required: "სავალდებულოა" })}
            onChange={handleInputChange}
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
            <span className="absolute -bottom-[24px] text-[#F93B1D] text-[14px]">
              {errors.agent_id.message}
            </span>
          )}
        </div>

        <div className="flex gap-[20px] self-end">
          <Link to={"/"}>
            <button
              onClick={() => {
                localStorage.removeItem("listingFormData");
                localStorage.removeItem("avatar");
              }}
              className="h-[47px] text-[#F93B1D] hover:text-[#fff] hover:bg-[#F93B1D] border border-[#F93B1D] font-[500] rounded-[10px] px-[16px] py-[10px]"
            >
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
      </form> */}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[790px] flex flex-col gap-[80px]"
      >
        <DealTypeSelection
          register={register}
          errors={errors}
          handleInputChange={handleInputChange}
        />
        <Location
          register={register}
          errors={errors}
          handleInputChange={handleInputChange}
          clearErrors={clearErrors}
          reset={reset}
        />
        <HouseDetails
          register={register}
          errors={errors}
          handleInputChange={handleInputChange}
          setValue={setValue}
          clearErrors={clearErrors}
        />
        <AgentSelection
          register={register}
          errors={errors}
          handleInputChange={handleInputChange}
        />
        <div className="flex gap-[20px] self-end">
          <Link to={"/"}>
            <button
              onClick={() => {
                localStorage.removeItem("listingFormData");
                localStorage.removeItem("avatar");
              }}
              className="h-[47px] text-[#F93B1D] hover:text-[#fff] hover:bg-[#F93B1D] border border-[#F93B1D] font-[500] rounded-[10px] px-[16px] py-[10px]"
            >
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
