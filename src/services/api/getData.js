const token = "9d0eba29-1281-4c0d-b431-e0620399b660";
const URL = "https://api.real-estate-manager.redberryinternship.ge/api";

export const getRegions = async () => {
  try {
    const res = await fetch(`${URL}/regions`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getCities = async () => {
  try {
    const res = await fetch(`${URL}/cities`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAgents = async () => {
  try {
    const res = await fetch(`${URL}/agents`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Error: ${res.status} - ${errorText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getRealEstates = async () => {
  try {
    const res = await fetch(`${URL}/real-estates`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Error: ${res.status} - ${errorText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getRealEstateByID = async (id) => {
  try {
    const res = await fetch(`${URL}/real-estates/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Error: ${res.status} - ${errorText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
