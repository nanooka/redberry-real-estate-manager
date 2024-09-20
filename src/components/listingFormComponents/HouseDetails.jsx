import CustomImageInput from "../CustomImageInput";
import Description from "./Description";

export default function HouseDetails({
  register,
  errors,
  handleInputChange,
  setValue,
  clearErrors,
}) {
  return (
    <div>
      <p className="text-[#1A1A1F] font-[500]">ბინის დეტალები</p>
      <div className="grid grid-cols-2 gap-y-[40px] gap-[22px] mt-[22px]">
        <div className="flex flex-col gap-[3px] relative">
          <label className="text-[#021526] text-[14px] font-[500]">ფასი*</label>
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
                message: "მხოლოდ მთელი რიცხვები",
              },
              // validate: {
              //   wholeNumber: (value) => {
              //     return (
              //       Number.isInteger(Number(value)) || "მხოლოდ მთელი რიცხვი"
              //     );
              //   },
              // },
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

      <Description
        register={register}
        errors={errors}
        handleInputChange={handleInputChange}
      />

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
  );
}
