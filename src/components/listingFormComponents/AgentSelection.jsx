import { useEffect, useRef, useState } from "react";
import { getAgents } from "../../services/api/getData";
import AgentModal from "../AgentModal";

export default function AgentSelection({
  errors,
  setError,
  clearErrors,
  setValue,
}) {
  const [agents, setAgents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchAgents = async () => {
      const data = await getAgents();
      setAgents(data);
    };
    fetchAgents();

    const savedData = JSON.parse(localStorage.getItem("listingFormData"));
    if (savedData && savedData.agent_id) {
      setSelectedAgent(savedData.agent_id);
      setValue("agent_id", savedData.agent_id);
    }
  }, [setValue]);

  useEffect(() => {
    if (selectedAgent) {
      saveToLocalStorage("agent_id", selectedAgent);
    }
  }, [selectedAgent]);

  // useEffect(() => {
  //   saveToLocalStorage("agent_id", selectedAgent);
  // }, [selectedAgent]);

  const saveToLocalStorage = (key, value) => {
    const existingData =
      JSON.parse(localStorage.getItem("listingFormData")) || {};
    localStorage.setItem(
      "listingFormData",
      JSON.stringify({ ...existingData, [key]: value })
    );
  };

  const handleChange = (value) => {
    clearErrors("agent_id");
    setSelectedAgent(value);
    console.log(value);

    if (!value) {
      setError("agent_id", { type: "manual", message: "სავალდებულოა" });
      setSelectedAgent(null);
    } else if (value === "add") {
      setIsModalOpen(true);
    } else {
      // setSelectedAgent(value);
      setValue("agent_id", value);
      saveToLocalStorage("agent_id", value);
    }

    // Close dropdown after selection
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col gap-[3px] relative" ref={dropdownRef}>
      <label className="text-[#021526] text-[14px] font-[500]">აგენტი*</label>
      <div
        className="border border-[#808A93] rounded-[6px] p-[10px] cursor-pointer w-[384px] h-[42px] flex items-center justify-between"
        onClick={() => setIsDropdownOpen((prev) => !prev)}
      >
        <span>
          {selectedAgent === "add" || !selectedAgent
            ? "აირჩიე აგენტი"
            : agents.find((agent) => agent.id === selectedAgent)?.name +
              " " +
              agents.find((agent) => agent.id === selectedAgent)?.surname}
        </span>
        <img src="/images/ArrowDown.svg" alt="open" />
      </div>
      {isDropdownOpen && (
        <ul className="absolute absolute top-[65px] z-10 bg-white border border-[#808A93] rounded-[6px] w-[384px] max-h-[300px] overflow-auto">
          <li
            onClick={() => handleChange("")}
            className="py-2 px-3 hover:bg-gray-100 cursor-pointer border-b border-[#808A93]"
          >
            აირჩიე აგენტი
          </li>
          <li
            onClick={() => handleChange("add")}
            className="py-2 px-3 hover:bg-gray-100 cursor-pointer flex gap-[8px]"
          >
            <img src="/images/plusIcon.svg" alt="add" />
            <span>დაამატე აგენტი</span>
          </li>
          <div className="border-t border-[#808A93]" />
          {agents.map((agent) => (
            <li
              key={agent.id}
              onClick={() => handleChange(agent.id)}
              className="py-2 px-3 hover:bg-gray-100 cursor-pointer border-b border-[#808A93]"
            >
              {agent.name} {agent.surname}
            </li>
          ))}
        </ul>
      )}
      {errors.agent_id && (
        <span className="text-[#F93B1D]">{errors.agent_id.message}</span>
      )}
      {isModalOpen && <AgentModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
