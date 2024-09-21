import { Link } from "react-router-dom";
import { formatPrice } from "../services/utils/formatUtils";

export default function HouseCard({
  image,
  condition,
  price,
  address,
  rooms,
  area,
  zip,
  id,
  city,
}) {
  return (
    <Link to={`/${id}`}>
      <div className="relative w-[384px] border border-[#DBDBDB] rounded-[14px] overflow-hidden shadow-[5px_5px_12px_0px_rgba(2,21,38,0.08)]">
        <div className="absolute top-[20px] left-[20px] bg-[#02152680] rounded-[15px] p-[6px] w-[90px] flex justify-center">
          <span className="text-[#fff] text-[12px] font-[500] tracking-[0.04em]">
            {condition}
          </span>
        </div>
        <img src={image} alt="house" className="h-[307px] object-cover" />
        <div className="flex flex-col gap-[20px] px-[25px] py-[22px]">
          <p className="font-[700] text-[28px] text-[#021526]">
            {formatPrice(price)} ₾
          </p>
          <div className="flex gap-[4px] items-center">
            <img src="/images/locationIcon.svg" alt="location" />
            <span className="text-[16px] text-[#021526B2]">
              {city.name}, {address}
            </span>
          </div>

          <div className="flex gap-[32px]">
            <div className="flex gap-[5px] items-center">
              <img src="/images/bedIcon.svg" alt="bed" />
              <span className="text-[16px] text-[#021526B2]">{rooms}</span>
            </div>
            <div className="flex gap-[5px] items-center">
              <img src="/images/areaIcon.svg" alt="area" />
              <span className="text-[16px] text-[#021526B2]">{area} მ²</span>
            </div>
            <div className="flex gap-[5px] items-center">
              <img src="/images/postalIcon.svg" alt="post" />
              <span className="text-[16px] text-[#021526B2]">{zip}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
