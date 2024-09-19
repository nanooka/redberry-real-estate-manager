export const getRegions = async () => {
  try {
    const res = await fetch(
      "https://api.real-estate-manager.redberryinternship.ge/api/regions"
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getCities = async () => {
  try {
    const res = await fetch(
      "https://api.real-estate-manager.redberryinternship.ge/api/cities"
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
