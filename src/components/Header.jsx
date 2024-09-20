import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  return (
    <div className="py-[38px] px-[162px] border border-[#DBDBDB]">
      <img
        onClick={() => {
          localStorage.removeItem("listingFormData");
          localStorage.removeItem("avatar");
          navigate("/");
        }}
        src="/images/Logo.svg"
        alt="logo"
        className="cursor-pointer"
      />
    </div>
  );
}
