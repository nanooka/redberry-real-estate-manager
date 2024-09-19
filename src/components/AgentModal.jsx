import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

const token = "9cfe3731-3b40-4381-a6ac-3be97386a45c";
const URL = "https://api.real-estate-manager.redberryinternship.ge/api/agents";

export default function AgentModal({ onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm();

  const modalRef = useRef(null);
  const fileInputRef = useRef();
  const [imagePreview, setImagePreview] = useState(null);

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("surname", data.surname);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("avatar", data.avatar[0]);

    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          accept: "application/json",
        },
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${response.status} - ${errorText}`);
      }

      onClose();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  //   for custom image input
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
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
    setValue("avatar", []);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div
        ref={modalRef}
        className="bg-[#fff] rounded-[10px] w-[1009px] h-[784px] shadow-[5px_5px_4px_0px_rgba(2,21,38,0.08)] flex flex-col items-center justify-center"
      >
        <h2
          className="text-[#021526] text-[32px]  const handleImageRemove = () => {
            setImagePreview(null);
            fileInputRef.current.value = null; // Reset the file input
          }; font-[500] mb-[60px] -mt-[60px]"
        >
          აგენტის დამატება
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-[28px]"
        >
          <div className="flex gap-[28px]">
            <div className="flex flex-col">
              <label className="text-[#021526] text-[14px] font-[500]">
                სახელი*
              </label>
              <input
                type="text"
                {...register("name", {
                  required: "სახელი სავალდებულოა",
                  minLength: {
                    value: 2,
                    message: "მინიმუმ ორი სიმბოლო",
                  },
                })}
                className="border border-[#808A93] w-[384px] rounded-[6px] p-[10px] focus:outline-none"
              />
              {errors.name && (
                <p className="text-[#F93B1D]">{errors.name.message}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-[#021526] text-[14px] font-[500]">
                გვარი*
              </label>
              <input
                type="text"
                {...register("surname", {
                  required: "გვარი სავალდებულოა",
                  minLength: {
                    value: 2,
                    message: "მინიმუმ ორი სიმბოლო",
                  },
                })}
                className="border border-[#808A93] w-[384px] rounded-[6px] p-[10px] focus:outline-none"
              />
              {errors.surname && (
                <p className="text-[#F93B1D]">{errors.surname.message}</p>
              )}
            </div>
          </div>

          <div className="flex gap-[28px]">
            <div className="flex flex-col">
              <label className="text-[#021526] text-[14px] font-[500]">
                ელ-ფოსტა*
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "ელ-ფოსტა სავალდებულოა",
                  pattern: {
                    value: /^[^\s@]+@redberry\.ge$/,
                    message: "გამოიყენეთ @redberry.ge ფოსტა",
                  },
                })}
                className="border border-[#808A93] w-[384px] rounded-[6px] p-[10px] focus:outline-none"
              />
              {errors.email && (
                <p className="text-[#F93B1D]">{errors.email.message}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-[#021526] text-[14px] font-[500]">
                ტელეფონის ნომერი*
              </label>
              <input
                type="text"
                {...register("phone", {
                  required: "ნომერი სავალდებულოა",
                  pattern: {
                    value: /^\d+$/,
                    message: "გამოიყენეთ ნუმერული სიმბოლოები",
                  },
                  validate: {
                    length: (value) =>
                      value.length === 9 ||
                      "ნომერი უნდა შედგებოდეს 9 ციფრისგან",
                    startsWith5: (value) =>
                      value.startsWith("5") ||
                      "ნომერი უნდა იყოს ფორმატის 5XXXXXXXX",
                  },
                })}
                className="border border-[#808A93] w-[384px] rounded-[6px] p-[10px] focus:outline-none"
              />
              {errors.phone && (
                <p className="text-[#F93B1D]">{errors.phone.message}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-[#021526] text-[14px] font-[500]">
              ატვირთეთ ფოტო*
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("avatar", { required: "ფოტო სავალდებულოა" })}
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageUpload}
            />
            {/* custom input for image */}
            <div className="border border-dashed border-[#2D3648] w-[799px] h-[120px] rounded-[8px] flex justify-center items-center">
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

          <div className="flex gap-[28px] self-end">
            <button
              onClick={onClose}
              className="h-[47px] text-[#F93B1D] hover:text-[#fff] hover:bg-[#F93B1D] border border-[#F93B1D] font-[500] rounded-[10px] px-[16px] py-[10px]"
            >
              გაუქმება
            </button>
            <button
              type="submit"
              className="h-[47px] bg-[#F93B1D] hover:bg-[#DF3014] text-[#fff] font-[500] rounded-[10px] px-[16px] py-[10px]"
            >
              დაამატე აგენტი
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
