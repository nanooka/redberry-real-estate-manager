export default function AreaContainer() {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex flex-col gap-[24px] justify-between bg-[#fff] absolute top-[50px] left-0 w-[382px] h-[372px] rounded-[10px] p-[24px] border border-[#DBDBDB] cursor-context-menu"
    >
      AreaContainer
    </div>
  );
}
