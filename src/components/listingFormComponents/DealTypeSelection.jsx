import { useEffect } from "react";

export default function DealTypeSelection({
  register,
  errors,
  setError,
  clearErrors,
  setValue,
}) {
  const handleChange = (e) => {
    const value = e.target.value;
    clearErrors("is_rental");
    if (!value) {
      setError("is_rental", { type: "manual", message: "სავალდებულოა" });
    }

    const savedData = localStorage.getItem("listingFormData");
    const parsedData = savedData ? JSON.parse(savedData) : {};
    parsedData.is_rental = value;
    localStorage.setItem("listingFormData", JSON.stringify(parsedData));
  };

  useEffect(() => {
    clearErrors("is_rental");
  }, [clearErrors]);

  useEffect(() => {
    const savedData = localStorage.getItem("listingFormData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      if (parsedData.is_rental) {
        setValue("is_rental", parsedData.is_rental);
      }
    }
  }, [setValue]);

  return (
    <div>
      <p className="text-[#1A1A1F] font-[500]">გარიგების ტიპი</p>
      <div className="flex gap-[32px] mt-[8px] relative">
        <label className="cursor-pointer text-[#021526] text-[14px] flex gap-[6px]">
          <input
            type="radio"
            id="sale"
            name="is_rental"
            {...register("is_rental", { required: true })}
            value="sale"
            className="accent-[#000] cursor-pointer"
            onChange={handleChange}
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
            onChange={handleChange}
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
