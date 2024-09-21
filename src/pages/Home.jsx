import { useEffect, useState } from "react";
import Filter from "../components/Filter";
import HouseCard from "../components/HouseCard";
import AgentModal from "../components/AgentModal";
import { Link } from "react-router-dom";
import { getRealEstates } from "../services/api/getData";
import { filterRealEstates } from "../services/utils/filteredRealEstates";

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [realEstates, setRealEstates] = useState([]);
  const [filterState, setFilterState] = useState(null);

  useEffect(() => {
    const fetchRealEstates = async () => {
      const data = await getRealEstates();
      setRealEstates(data);
    };
    fetchRealEstates();
  }, []);

  const handleFilterUpdate = (updatedFilterState) => {
    setFilterState(updatedFilterState);
  };

  const filteredRealEstates = filterRealEstates(realEstates, filterState);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="py-[80px] w-[1596px] ml-[120px] mx-auto ">
      <div className="flex justify-between">
        <Filter onUpdateFilters={handleFilterUpdate} />
        <div className="flex gap-[14px]">
          <Link to={"/listing"}>
            <button className="h-[47px] bg-[#F93B1D] text-[#fff] rounded-[10px] flex items-center gap-[2px] py-[10px] px-[16px] cursor-pointer hover:bg-[#DF3014]">
              <img src="/images/plusIconWhite.svg" alt="plus-icon" />
              <span className="font-[500] text-[16px]">ლისტინგის დამატება</span>
            </button>
          </Link>
          <button
            onClick={handleModalOpen}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="h-[47px] text-[#F93B1D] bg-[#fff] rounded-[10px] flex items-center gap-[2px] py-[10px] px-[16px] cursor-pointer border border-[#F93B1D] hover:bg-[#F93B1D] hover:text-[#fff]"
          >
            {isHovered ? (
              <img src="/images/plusIconWhite.svg" alt="plus-icon" />
            ) : (
              <img src="/images/plusIconRed.svg" alt="plus-icon" />
            )}

            <span className="font-[500] text-[16px]">აგენტის დამატება</span>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-[20px] mt-[28px]">
        {filteredRealEstates?.map((house) => (
          <HouseCard
            key={house.id}
            image={house.image}
            condition={house.is_rental == 1 ? "ქირავდება" : "იყიდება"}
            price={house.price}
            address={house.address}
            city={house.city}
            rooms={house.bedrooms}
            area={house.area}
            zip={house.zip_code}
            id={house.id}
          />
        ))}
      </div>
      {filteredRealEstates.length == 0 && (
        <p className="text-[#021526CC] text-[20px]">
          აღნიშნული მონაცემებით განცხადება არ იძებნება
        </p>
      )}

      {isModalOpen && <AgentModal onClose={handleModalClose} />}
    </div>
  );
}
