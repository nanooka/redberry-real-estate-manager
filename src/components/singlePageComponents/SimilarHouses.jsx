import { useEffect, useState } from "react";
import HouseCard from "../HouseCard";
import { getRealEstates } from "../../api/getData";

export default function SimilarHouses() {
  const [realEstates, setRealEstates] = useState([]);

  useEffect(() => {
    const fetchRealEstates = async () => {
      const data = await getRealEstates();
      setRealEstates(data);
    };
    fetchRealEstates();
  }, []);

  return (
    <div>
      {realEstates?.map((house) => (
        <HouseCard
          key={house.id}
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
      ))}
    </div>
  );
}
