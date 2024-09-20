import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="py-[38px] px-[162px] border border-[#DBDBDB]">
      <Link to={"/"}>
        <img
          onClick={() => {
            localStorage.removeItem("listingFormData");
            localStorage.removeItem("avatar");
          }}
          src="/images/Logo.svg"
          alt="logo"
        />
      </Link>
    </div>
  );
}
