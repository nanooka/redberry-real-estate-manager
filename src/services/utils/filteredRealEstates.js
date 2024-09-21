export const filterRealEstates = (realEstates, filterState) => {
  if (!filterState) return realEstates;

  const { region, price, area, rooms } = filterState;

  // Check if filters are applied
  const isRegionApplied = region.length > 0;
  const isPriceApplied = price.min || price.max;
  const isAreaApplied = area.min || area.max;
  const isRoomsApplied = rooms;

  // If no filters are applied, show all houses
  if (
    !isRegionApplied &&
    !isPriceApplied &&
    !isAreaApplied &&
    !isRoomsApplied
  ) {
    return realEstates;
  }

  return realEstates.filter((house) => {
    const filterResults = [];

    if (isRegionApplied) {
      filterResults.push(region.includes(house.city.region.name));
    }

    if (isPriceApplied) {
      const matchesPrice =
        (!price.min || house.price >= price.min) &&
        (!price.max || house.price <= price.max);
      filterResults.push(matchesPrice);
    }

    if (isAreaApplied) {
      const matchesArea =
        (!area.min || house.area >= area.min) &&
        (!area.max || house.area <= area.max);
      filterResults.push(matchesArea);
    }

    if (isRoomsApplied) {
      filterResults.push(house.bedrooms == rooms);
    }

    return filterResults.some(Boolean);
  });
};
