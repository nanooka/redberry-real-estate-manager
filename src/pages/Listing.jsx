import { useForm } from "react-hook-form";
import CustomImageInput from "../components/CustomImageInput";
import { addRealEstate } from "../services/api/postData";
import { Link, useNavigate } from "react-router-dom";
import Location from "../components/listingFormComponents/Location";
import PropertyDetails from "../components/listingFormComponents/PropertyDetails";
import DealTypeSelection from "../components/listingFormComponents/DealTypeSelection";
import AgentSelection from "../components/listingFormComponents/AgentSelection";
import { useEffect } from "react";

export default function Listing() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    clearErrors,
    reset,
    watch,
  } = useForm();

  const navigate = useNavigate();

  useEffect(() => {
    const savedData = localStorage.getItem("listingFormData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      reset(parsedData);
    }
  }, [reset]);

  useEffect(() => {
    const subscription = watch((value) => {
      localStorage.setItem("listingFormData", JSON.stringify(value));
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      await addRealEstate(data);
      localStorage.removeItem("listingFormData");
      localStorage.removeItem("avatar");
      navigate("/");
    } catch (error) {
      console.error("Failed to add real estate", error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-[32px] py-[40px] pb-[80px]">
      <h1 className="text-[#021526] text-[32px] font-[500]">
        ლისტინგის დამატება
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[790px]  flex flex-col gap-[80px]"
      >
        <DealTypeSelection
          register={register}
          errors={errors}
          setError={setError}
          clearErrors={clearErrors}
          setValue={setValue}
        />

        <Location
          register={register}
          errors={errors}
          clearErrors={clearErrors}
          setError={setError}
          reset={reset}
          setValue={setValue}
        />

        <PropertyDetails
          register={register}
          errors={errors}
          clearErrors={clearErrors}
          setError={setError}
          reset={reset}
        />

        <div className="-mt-[40px]">
          <CustomImageInput
            setValue={setValue}
            clearErrors={clearErrors}
            errors={errors}
            register={register}
            setError={setError}
            saveToLocalStorage={true}
          />
        </div>

        <AgentSelection
          register={register}
          errors={errors}
          setError={setError}
          clearErrors={clearErrors}
          setValue={setValue}
        />

        <div className="flex gap-[20px] self-end">
          <Link to={"/"}>
            <button
              onClick={() => {
                localStorage.removeItem("listingFormData");
                localStorage.removeItem("avatar");
              }}
              className="h-[47px] text-[#F93B1D] hover:text-[#fff] hover:bg-[#F93B1D] border border-[#F93B1D] font-[500] rounded-[10px] px-[16px] py-[10px]"
            >
              გაუქმება
            </button>
          </Link>
          <button
            type="submit"
            className="h-[47px] bg-[#F93B1D] hover:bg-[#DF3014] text-[#fff] font-[500] rounded-[10px] px-[16px] py-[10px]"
          >
            დაამატე ლისტინგი
          </button>
        </div>
      </form>
    </div>
  );
}
