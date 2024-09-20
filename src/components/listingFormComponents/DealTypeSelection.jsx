export default function DealTypeSelection({
  register,
  errors,
  handleInputChange,
}) {
  return (
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
  );
}
