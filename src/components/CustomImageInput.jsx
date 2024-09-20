import { useRef, useState } from "react";

export default function CustomImageInput({
  setValue,
  clearErrors,
  errors,
  register,
  setError,
}) {
  const fileInputRef = useRef();
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      if (file.size > 1024 * 1024) {
        setError("avatar", {
          type: "manual",
          message: "სურათის ზომა უნდა იყოს 1MB-ზე ნაკლები",
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      setValue("avatar", event.target.files);
      clearErrors("avatar");
    }
  };

  const handleImageRemove = () => {
    setImagePreview(null);
    fileInputRef.current.value = null;
    setValue("avatar", null);
  };

  return (
    <div className="flex flex-col">
      <label className="text-[#021526] text-[14px] font-[500]">
        ატვირთეთ ფოტო*
      </label>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        {...register("avatar", { required: "სავალდებულოა" })}
        ref={fileInputRef}
        onChange={handleImageUpload}
      />
      <div className="border border-dashed border-[#2D3648] w-[788px] h-[120px] rounded-[8px] flex justify-center items-center">
        {imagePreview ? (
          <div className="relative">
            <img
              src={imagePreview}
              alt="Selected"
              className="object-cover w-[92px] h-[82px] rounded-[4px]"
            />
            <img
              onClick={handleImageRemove}
              src="/images/trashIcon.svg"
              alt="remove"
              className="absolute -right-[6px] -bottom-[6px] cursor-pointer"
            />
          </div>
        ) : (
          <img
            src="/images/plusIcon.svg"
            alt="add"
            className="cursor-pointer"
            onClick={() => fileInputRef.current.click()}
          />
        )}
      </div>
      {errors.avatar && (
        <p className="text-[#F93B1D]">{errors.avatar.message}</p>
      )}
    </div>
  );
}
