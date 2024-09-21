import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getRealEstateByID } from "../services/api/getData";
import { deleteRealEstateByID } from "../services/api/deleteRealEstate";
import SimilarHouses from "../components/singlePageComponents/SimilarHouses";
import { formatDate } from "../services/utils/formatUtils";
import AgentDetails from "../components/singlePageComponents/agentDetails";
import HouseDetails from "../components/singlePageComponents/HouseDetails";

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

  return (
    <div className="pl-[176px]">
      <Link to={"/"} className="absolute top-[170px]">
        <img src="/images/arrowLeft.svg" alt="arrow" />
      </Link>
      <div className="w-[1596px] flex gap-[68px] mt-[120px]">
        <div className="relative">
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
          <span className="absolute -bottom-[28px] right-0 text-[#808A93]">
            გამოქვეყნების თარიღი {formatDate(houseInfo?.created_at)}
          </span>
        </div>

        <div className="flex flex-col gap-[20px] w-[503px] text-[#808A93] ">
          <HouseDetails houseInfo={houseInfo} />
          <AgentDetails agent={houseInfo?.agent} />

          <button
            onClick={() => handleDelete(id)}
            className="self-start border border-[#676E76] text-[#676E76] hover:bg-[#676E76] hover:text-[#fff] rounded-[8px] flex items-center px-[10px] text-[12px] font-[500] h-[34px]"
          >
            ლისტინგის წაშლა
          </button>
        </div>
      </div>
      <SimilarHouses region={houseInfo?.city?.region} />
    </div>
  );
}
