export default function Description({ register, errors, handleInputChange }) {
  return (
    <div className="flex flex-col gap-[3px] mt-[40px] relative">
      <label className="text-[#021526] text-[14px] font-[500]">აღწერა*</label>
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
  );
}
