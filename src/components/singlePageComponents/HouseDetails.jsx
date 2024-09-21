import { formatPriceWithComma } from "../../services/utils/formatUtils";

export default function HouseDetails({ houseInfo }) {
  return (
    <div className="flex flex-col gap-[40px] w-[503px] text-[#808A93] ">
      <p className="font-[700] text-[48px] text-[#021526]">
        {formatPriceWithComma(houseInfo?.price)} ₾
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
    </div>
  );
}
