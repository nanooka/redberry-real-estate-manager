const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
      <div className="relative flex justify-center flex-col items-center gap-[20px] bg-white p-6 rounded shadow-lg w-[623px] h-[222px] rounded-[24px]">
        <img
          src="/images/exitIcon.svg"
          alt="exit"
          onClick={onClose}
          className="absolute top-[14px] right-[14px] w-[20px] h-[20px] cursor-pointer"
        />
        <h2 className="text-[#2D3648] text-[20px]">გსურთ წაშალოთ ლისტინგი?</h2>
        <div className="flex gap-[20px]">
          <button
            onClick={onClose}
            className="h-[47px] text-[#F93B1D] hover:text-[#fff] hover:bg-[#F93B1D] border border-[#F93B1D] font-[500] rounded-[10px] px-[16px] py-[10px]"
          >
            გაუქმება
          </button>
          <button
            onClick={onConfirm}
            className="h-[47px] bg-[#F93B1D] text-[#fff] rounded-[10px] flex items-center gap-[2px] py-[10px] px-[16px] cursor-pointer hover:bg-[#DF3014]"
          >
            დადასტურება
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
