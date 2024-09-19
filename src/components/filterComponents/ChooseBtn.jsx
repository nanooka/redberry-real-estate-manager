export default function ChooseBtn({ setActiveFilter, error, onConfirm }) {
  const handleClick = () => {
    if (!error) {
      onConfirm();
      setActiveFilter(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="bg-[#f93b1d] rounded-[8px] px-[14px] py-[8px] text-[#fff] font-[500] text-[14px] hover:bg-[#DF3014] self-end"
    >
      არჩევა
    </button>
  );
}
