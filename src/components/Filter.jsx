import RegionContainer from "./filterComponents/RegionContainer";

export default function Filter() {
  return (
    <div className="w-[785px] h-[47px] rounded-[10px] border border-[#DBDBDB] p-[6px] flex gap-[24px] justify-around">
      <div className="flex items-center gap-[4px] relative">
        <span className="text-[16px] text-[#021526] font-[500]">რეგიონი</span>
        <img
          src="/images/ArrowDown.svg"
          alt="arrow"
          className="w-[14px] h-[14px]"
        />
        <RegionContainer />
      </div>
      <div className="flex items-center gap-[4px]">
        <span className="text-[16px] text-[#021526] font-[500]">
          საფასო კატეგორია
        </span>
        <img
          src="/images/ArrowDown.svg"
          alt="arrow"
          className="w-[14px] h-[14px]"
        />
      </div>
      <div className="flex items-center gap-[4px]">
        <span className="text-[16px] text-[#021526] font-[500]">ფართობი</span>
        <img
          src="/images/ArrowDown.svg"
          alt="arrow"
          className="w-[14px] h-[14px]"
        />
      </div>
      <div className="flex items-center gap-[4px]">
        <span className="text-[16px] text-[#021526] font-[500]">
          საძინებლების რაოდენობა
        </span>
        <img
          src="/images/ArrowDown.svg"
          alt="arrow"
          className="w-[14px] h-[14px]"
        />
      </div>
    </div>
  );
}
