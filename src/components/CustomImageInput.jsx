import { useEffect, useRef, useState } from "react";

export default function CustomImageInput({
  setValue,
  clearErrors,
  errors,
  register,
  setError,
  onChange,
  saveToLocalStorage = false,
}) {
  const fileInputRef = useRef();
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const storedImage = localStorage.getItem("avatar");
    if (storedImage) {
      setImagePreview(storedImage);

      // Convert Base64 string back to File object
      const byteString = atob(storedImage.split(",")[1]);
      const mimeString = storedImage.split(",")[0].split(":")[1].split(";")[0];
      const arrayBuffer = new Uint8Array(byteString.length);

      for (let i = 0; i < byteString.length; i++) {
        arrayBuffer[i] = byteString.charCodeAt(i);
      }

      const blob = new Blob([arrayBuffer], { type: mimeString });
      const file = new File([blob], "uploadedImage.jpg", { type: mimeString });

      setValue("avatar", file); // Ensure this is set correctly
    }
  }, [setValue]);

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
        if (saveToLocalStorage) {
          localStorage.setItem("avatar", reader.result);
        }
      };
      reader.readAsDataURL(file);

      setValue("avatar", file); // Set the actual file
      clearErrors("avatar");

      if (saveToLocalStorage) {
        localStorage.setItem("avatar", reader.result);
      }

      if (onChange) {
        onChange(event);
      }
    }
  };

  const handleImageRemove = () => {
    setImagePreview(null);
    fileInputRef.current.value = null;
    setValue("avatar", null);

    if (saveToLocalStorage) {
      localStorage.removeItem("avatar");
    }

    if (onChange) {
      onChange({ target: { name: "avatar", value: null } });
    }
  };

  return (
    <div className="flex flex-col relative">
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
        <span className="absolute -bottom-[24px] text-[#F93B1D] text-[14px]">
          {errors.avatar.message}
        </span>
      )}
    </div>
  );
}
