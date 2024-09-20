import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRealEstateByID } from "../api/getData";
import { deleteRealEstateByID } from "../api/deleteRealEstate";
import SimilarHouses from "../components/singlePageComponents/SimilarHouses";

export default function SingleListing() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [houseInfo, setHouseInfo] = useState({});

  useEffect(() => {
    const fetchRealEstateByID = async () => {
      const data = await getRealEstateByID(id);
      setHouseInfo(data);
    };
    fetchRealEstateByID();
  }, [id]);
  console.log(houseInfo);

  const handleDelete = async (id) => {
    try {
      await deleteRealEstateByID(id);
      navigate("/");
    } catch (error) {
      console.error("Failed to delete real estate", error);
    }
  };

  const formattedPrice = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(houseInfo?.price)
    .replace(/,/g, ", ");

  return (
    <div className="pl-[100px]">
      {/* <img src="/images/arrowLeft.svg" alt="arrow" /> */}
      <div className="w-[1596px] flex gap-[68px] mt-[120px]">
        <div className="relative w-[839px] h-[670px] rounded-t-lg overflow-hidden">
          <div className="absolute top-[20px] left-[20px] bg-[#02152680] rounded-[20px] p-[6px] w-[142px] h-[41px] flex justify-center">
            <span className="text-[#fff] text-[20px] font-[500] tracking-[0.04em]">
              {houseInfo?.is_rental === 1 ? "ქირავდება" : "იყიდება"}
            </span>
          </div>
          <img
            src={houseInfo?.image}
            alt="image"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-[40px] w-[503px] text-[#808A93]">
          <p className="font-[700] text-[48px] text-[#021526]">
            {formattedPrice} ₾
          </p>

          <div>
            <div className="flex gap-[4px] items-center">
              <img src="/images/locationIcon.svg" alt="location" />
              <span className="text-[24px] ">
                {houseInfo?.city?.name}, {houseInfo.address}
              </span>
            </div>

            <div className="flex gap-[5px] items-center">
              <img src="/images/areaIcon.svg" alt="area" />
              <span className="text-[24px] ">{houseInfo?.area} მ²</span>
            </div>

            <div className="flex gap-[5px] items-center">
              <img src="/images/bedIcon.svg" alt="bed" />
              <span className="text-[24px] ">{houseInfo?.bedrooms}</span>
            </div>

            <div className="flex gap-[5px] items-center">
              <img src="/images/postalIcon.svg" alt="post" />
              <span className="text-[24px] ">{houseInfo?.zip_code}</span>
            </div>
          </div>

          <div>
            <p>{houseInfo?.description}</p>
          </div>

          <div className="rounded-[8px] border border-[#DBDBDB]  h-[174px] flex flex-col gap-[10px] p-[20px]">
            <div className="flex h-[74px] items-center gap-[10px]">
              <div className="w-[72px] h-[72px] rounded-[100px] overflow-hidden">
                <img src={houseInfo?.agent?.avatar} alt="agent" />
              </div>
              <div>
                <p className="text-[#021526]">
                  {houseInfo?.agent?.name} {houseInfo?.agent?.surname}
                </p>
                <span className="text-[#676E76] text-[14px]">აგენტი</span>
              </div>
            </div>

            <div className="space-y-[4px]">
              <div className="flex gap-[6px]">
                <img src="/images/emailIcon.svg" alt="email" />
                <p className="text-[14px]">{houseInfo?.agent?.email}</p>
              </div>

              <div className="flex gap-[6px]">
                <img src="/images/telephoneIcon.svg" alt="phone" />
                <p className="text-[14px]">{houseInfo?.agent?.phone}</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => handleDelete(id)}
            className="self-start border border-[#676E76] text-[#676E76] rounded-[8px] flex items-center px-[10px] text-[12px] font-[500] h-[34px]"
          >
            ლისტინგის წაშლა
          </button>
        </div>
      </div>

      <SimilarHouses />

      {/* <div className="flex justify-center ">
        <div className="grid grid-cols-4 gap-[20px] w-[1596px] ">
          <div className="w-[384px] h-[307px] bg-red-500"></div>
          <div className="w-[384px] h-[307px] bg-red-500"></div>
          <div className="w-[384px] h-[307px] bg-red-500"></div>
          <div className="w-[384px] h-[307px] bg-red-500"></div>
        </div>
      </div> */}
    </div>
  );
}
