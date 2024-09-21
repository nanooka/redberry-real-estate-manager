const token = "9d0eba29-1281-4c0d-b431-e0620399b660";
const URL = "https://api.real-estate-manager.redberryinternship.ge/api";

export const deleteRealEstateByID = async (id) => {
  try {
    const res = await fetch(`${URL}/real-estates/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Response Status:", res.status);

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
