import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

export default function AgentModal({ onClose }) {
  const modalRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission (e.g., send data to an API)
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
        className="bg-[#fff] rounded-[10px] w-[1009px] h-[784px] shadow-[5px_5px_4px_0px_rgba(2,21,38,0.08)] flex flex-col items-center"
      >
        <h2 className="text-[#021526] text-[32px] font-[500]">
          აგენტის დამატება
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label>Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="border p-2"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label>Lastname</label>
            <input
              type="text"
              {...register("lastname", { required: "Lastname is required" })}
              className="border p-2"
            />
            {errors.lastname && (
              <p className="text-red-500">{errors.lastname.message}</p>
            )}
          </div>

          <div>
            <label>Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              className="border p-2"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label>Phone Number</label>
            <input
              type="tel"
              {...register("phone", { required: "Phone number is required" })}
              className="border p-2"
            />
            {errors.phone && (
              <p className="text-red-500">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label>Image</label>
            <input
              type="file"
              accept="image/*"
              {...register("image", { required: "Image is required" })}
              className="border p-2"
            />
            {errors.image && (
              <p className="text-red-500">{errors.image.message}</p>
            )}
          </div>

          <button type="submit" className="bg-blue-500 text-white px-4 py-2">
            Submit
          </button>
        </form>
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}
