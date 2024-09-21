import { useEffect, useState } from "react";
import { getAgents } from "../../services/api/getData";
import AgentModal from "../AgentModal";

export default function AgentSelection({
  register,
  errors,
  setError,
  clearErrors,
}) {
  const [agents, setAgents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState("");

  useEffect(() => {
    const fetchAgents = async () => {
      const data = await getAgents();
      setAgents(data);
    };
    fetchAgents();

    const savedData = JSON.parse(localStorage.getItem("listingFormData"));
    if (savedData && savedData.agent_id) {
      setSelectedAgent(savedData.agent_id);
    }
  }, []);

  useEffect(() => {
    saveToLocalStorage("agent_id", selectedAgent);
  }, [selectedAgent]);

  const saveToLocalStorage = (key, value) => {
    const existingData =
      JSON.parse(localStorage.getItem("listingFormData")) || {};
    localStorage.setItem(
      "listingFormData",
      JSON.stringify({ ...existingData, [key]: value })
    );
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    clearErrors("agent_id");
    setSelectedAgent(value);

    if (!value) {
      setError("agent_id", { type: "manual", message: "სავალდებულოა" });
    } else if (value === "add") {
      handleModalOpen();
    }
  };

  return (
    <div className="flex flex-col gap-[3px]">
      <label className="text-[#021526] text-[14px] font-[500]">აგენტი*</label>
      <select
        {...register("agent_id", { required: "სავალდებულოა" })}
        value={selectedAgent}
        onChange={handleChange}
        className="border border-[#808A93] rounded-[6px] p-[10px] focus:outline-none w-[384px] h-[42px]"
      >
        <option value="" defaultValue>
          აირჩიე აგენტი
        </option>
        <option value="add" className="relative">
          დაამატე აგენტი
        </option>
        {agents?.map((agent) => (
          <option key={agent.id} value={agent.id}>
            {agent.name} {agent.surname}
          </option>
        ))}
      </select>
      {errors.agent_id && (
        <span className=" text-[#F93B1D]">{errors.agent_id.message}</span>
      )}
      {isModalOpen && <AgentModal onClose={handleModalClose} />}
    </div>
  );
}
