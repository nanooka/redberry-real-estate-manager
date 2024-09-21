import { useEffect, useRef, useState } from "react";
import HouseCard from "../HouseCard";
import { getRealEstates } from "../../services/api/getData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function SimilarHouses({ region, isOpen }) {
  const [realEstates, setRealEstates] = useState([]);
  const [filteredRealEstates, setFilteredRealEstates] = useState([]);
  const swiperRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    const fetchRealEstates = async () => {
      const data = await getRealEstates();
      setRealEstates(data);
    };
    fetchRealEstates();
  }, []);

  useEffect(() => {
    if (region) {
      const filtered = realEstates.filter(
        (house) => house.city.region.id === region.id
      );
      setFilteredRealEstates(filtered);
    }
  }, [region, realEstates]);

  return (
    <div className={`max-w-[1596px] mt-[80px] ${isOpen && "opacity-50"}`}>
      <h2 className="text-[#021526] text-[32px] font-[500] mb-[40px]">
        ბინები მსგავს ლოკაციაზე
      </h2>

      <div className="relative">
        <Swiper
          spaceBetween={20}
          slidesPerView={4}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          modules={[Navigation]}
        >
          {filteredRealEstates?.map((house) => (
            <SwiperSlide key={house.id}>
              <HouseCard
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
            </SwiperSlide>
          ))}
        </Swiper>
        <div
          ref={prevRef}
          className=" absolute top-1/2 -translate-y-1/2 -left-[60px]"
        >
          <div className="swiper-button-prev opacity-0"></div>
          <div className="">
            <img
              src="/images/arrowLeft.svg"
              alt="left"
              onClick={() => swiperRef.current.swiper.slidePrev()}
            />
          </div>
        </div>

        <div
          ref={nextRef}
          className=" absolute top-1/2 -translate-y-1/2 -right-[60px]"
        >
          <div className="swiper-button-next opacity-0"></div>
          <div className="">
            <img
              src="/images/arrowRight.svg"
              alt="right"
              onClick={() => swiperRef.current.swiper.slideNext()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
