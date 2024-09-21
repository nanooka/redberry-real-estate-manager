import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import CustomImageInput from "./CustomImageInput";
import { addAgent } from "../services/api/postData";

export default function AgentModal({ onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm({
    defaultValues: {
      avatar: null,
    },
  });

  const modalRef = useRef(null);

  const onSubmit = async (data) => {
    try {
      await addAgent(data);
      onClose();
    } catch (error) {
      console.error("Failed to add agent:", error);
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
          <div className="flex gap-[28px] relative">
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
                <span className="absolute -bottom-[24px] text-[#F93B1D] text-[14px]">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div className="flex flex-col relative">
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
                <span className="absolute -bottom-[24px] text-[#F93B1D] text-[14px]">
                  {errors.surname.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-[28px]">
            <div className="flex flex-col relative">
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
                <span className="absolute -bottom-[24px] text-[#F93B1D] text-[14px]">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="flex flex-col relative">
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
                <span className="absolute -bottom-[24px] text-[#F93B1D] text-[14px]">
                  {errors.phone.message}
                </span>
              )}
            </div>
          </div>

          <CustomImageInput
            setValue={setValue}
            clearErrors={clearErrors}
            errors={errors}
            register={register}
          />

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
