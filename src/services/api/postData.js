const token = "9cfe3731-3b40-4381-a6ac-3be97386a45c";
// const token = "9d0eba29-1281-4c0d-b431-e0620399b660";
const URL = "https://api.real-estate-manager.redberryinternship.ge/api";

export const addAgent = async (data) => {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("surname", data.surname);
  formData.append("email", data.email);
  formData.append("phone", data.phone);
  formData.append("avatar", data.avatar[0]);

  try {
    const response = await fetch(`${URL}/agents`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "application/json",
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error: ${response.status} - ${errorText}`);
    }

    return response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const addRealEstate = async (data) => {
  const formData = new FormData();

  formData.append("address", data.address);
  formData.append("agent_id", parseInt(data.agent_id));
  formData.append("area", parseFloat(data.area));
  formData.append("image", data.avatar[0]);
  formData.append("city_id", parseInt(data.city_id));
  formData.append("region_id", parseInt(data.region));
  formData.append("description", data.description);
  formData.append("zip_code", data.zip_code);
  formData.append("price", parseFloat(data.price));
  formData.append("bedrooms", parseInt(data.bedrooms));
  formData.append("is_rental", data.is_rental === "rent" ? "1" : "0");
  formData.append("created_at", new Date().toISOString());

  try {
    const response = await fetch(`${URL}/real-estates`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "application/json",
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error: ${response.status} - ${errorText}`);
    }

    return response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
