import { useState } from "react";
import Filter from "../components/Filter";
import HouseCard from "../components/HouseCard";
import AgentModal from "../components/AgentModal";

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="py-[80px] w-[1596px] ml-[120px] mx-auto ">
      <div className="flex justify-between">
        <Filter />
        <div className="flex gap-[14px]">
          <button className="h-[47px] bg-[#F93B1D] text-[#fff] rounded-[10px] flex items-center gap-[2px] py-[10px] px-[16px] cursor-pointer hover:bg-[#DF3014]">
            <img src="/images/plusIconWhite.svg" alt="plus-icon" />
            <span className="font-[500] text-[16px]">ლისტინგის დამატება</span>
          </button>
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
        <HouseCard
          image="/images/random-image.jpeg"
          condition="ქირავდება"
          price={80000}
          adress="თბილისი, ი. ჭავჭავაძის 53"
          rooms={2}
          area={60}
          zip={1010}
        />
        <HouseCard
          image="/images/random-image.jpeg"
          condition="იყიდება"
          price={8000}
          adress="თბილისი, ი. ჭავჭავაძის 53"
          rooms={2}
          area={60}
          zip={1010}
        />
      </div>

      {isModalOpen && <AgentModal onClose={handleModalClose} />}
    </div>
  );
}
