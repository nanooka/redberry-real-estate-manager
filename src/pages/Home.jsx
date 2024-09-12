import { useEffect, useState } from "react";
import Filter from "../components/Filter";

const token = "9cfe3731-3b40-4381-a6ac-3be97386a45c";

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const getCities = async () => {
      try {
        const res = await fetch(
          "https://api.real-estate-manager.redberryinternship.ge/api/cities"
        );
        const data = await res.json();
        // console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getCities();
  }, []);
  return (
    <div className="py-[80px] w-[1596px] ml-[120px] mx-auto ">
      <div className="flex justify-between">
        <Filter />
        <div className="flex gap-[14px]">
          <button className="bg-[#F93B1D] text-[#fff] rounded-[10px] flex items-center gap-[2px] py-[10px] px-[16px] cursor-pointer hover:bg-[#DF3014]">
            <img src="/images/plusIconWhite.svg" alt="plus-icon" />
            <span className="font-[500] text-[16px]">ლისტინგის დამატება</span>
          </button>
          <button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="text-[#F93B1D] bg-[#fff] rounded-[10px] flex items-center gap-[2px] py-[10px] px-[16px] cursor-pointer border border-[#F93B1D] hover:bg-[#F93B1D] hover:text-[#fff]"
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
      <div className="grid grid-cols-4 gap-[20px] mt-[76px]">
        <div className="w-[384px] h-[307px] bg-red-300"></div>
        <div className="w-[384px] h-[307px] bg-red-300"></div>
        <div className="w-[384px] h-[307px] bg-red-300"></div>
        <div className="w-[384px] h-[307px] bg-red-300"></div>
        <div className="w-[384px] h-[307px] bg-red-300"></div>
      </div>
    </div>
  );
}
