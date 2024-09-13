export default function ChooseBtn({ setActiveFilter }) {
  return (
    <button
      onClick={() => setActiveFilter(null)}
      className="bg-[#f93b1d] rounded-[8px] px-[14px] py-[8px] text-[#fff] font-[500] text-[14px] hover:bg-[#DF3014] self-end"
    >
      არჩევა
    </button>
  );
}
