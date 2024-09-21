export default function PropertyDetails({
  register,
  errors,
  clearErrors,
  setError,
}) {
  const handlePriceBlur = (e) => {
    const value = e.target.value;
    clearErrors("price");
    if (!value) {
      setError("price", { type: "manual", message: "სავალდებულოა" });
    } else if (!/^\d+$/.test(value)) {
      setError("price", { type: "manual", message: "მხოლოდ რიცხვები" });
    }
  };

  const handleAreaBlur = (e) => {
    const value = e.target.value;
    clearErrors("area");
    if (!value) {
      setError("area", { type: "manual", message: "სავალდებულოა" });
    } else if (!/^\d+$/.test(value)) {
      setError("area", { type: "manual", message: "მხოლოდ რიცხვები" });
    }
  };

  const handleBedroomsBlur = (e) => {
    const value = e.target.value;
    clearErrors("bedrooms");
    if (!value) {
      setError("bedrooms", { type: "manual", message: "სავალდებულოა" });
    } else if (!Number.isInteger(Number(value))) {
      setError("bedrooms", { type: "manual", message: "მხოლოდ მთელი რიცხვი" });
    }
  };

  const handleDescriptionBlur = (e) => {
    const value = e.target.value;
    clearErrors("description");
    if (!value) {
      setError("description", { type: "manual", message: "სავალდებულოა" });
    } else {
      const wordCount = value.trim().split(/\s+/).length;
      if (wordCount < 5) {
        setError("description", {
          type: "manual",
          message: "მინიმუმ 5 სიტყვა",
        });
      }
    }
  };

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
            onBlur={handlePriceBlur}
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
            onBlur={handleAreaBlur}
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
              validate: {
                wholeNumber: (value) => {
                  return (
                    Number.isInteger(Number(value)) || "მხოლოდ მთელი რიცხვი"
                  );
                },
              },
            })}
            onBlur={handleBedroomsBlur}
            className="border border-[#808A93] rounded-[6px] p-[10px] focus:outline-none w-[384px] h-[42px]"
          />
          {errors.bedrooms && (
            <span className="absolute -bottom-[24px] text-[#F93B1D] text-[14px]">
              {errors.bedrooms.message}
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-[3px] mt-[22px] relative">
        <label className="text-[#021526] text-[14px] font-[500] mt-[10px]">
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
          onBlur={handleDescriptionBlur}
          className="border border-[#808A93] rounded-[6px] p-[10px] focus:outline-none w-[788px] h-[135px]"
        ></textarea>
        {errors.description && (
          <span className="absolute -bottom-[24px] text-[#F93B1D] text-[14px]">
            {errors.description.message}
          </span>
        )}
      </div>
    </div>
  );
}
