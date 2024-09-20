import { useEffect, useState } from "react";
import { getAgents } from "../../api/getData";

export default function AgentSelection({
  register,
  handleInputChange,
  errors,
}) {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const fetchAgents = async () => {
      const data = await getAgents();
      setAgents(data);
    };
    fetchAgents();
  }, []);

  return (
    <div className="flex flex-col gap-[3px] relative">
      <label className="text-[#021526] text-[14px] font-[500]">აგენტი*</label>
      <select
        {...register("agent_id", { required: "სავალდებულოა" })}
        onChange={handleInputChange}
        className="border border-[#808A93] rounded-[6px] p-[10px] focus:outline-none w-[384px] h-[42px]"
      >
        <option value="" defaultValue>
          აირჩიე აგენტი
        </option>
        {agents?.map((agent) => (
          <option key={agent.id} value={agent.id}>
            {agent.name} {agent.surname}
          </option>
        ))}
      </select>
      {errors.agent_id && (
        <span className="absolute -bottom-[24px] text-[#F93B1D] text-[14px]">
          {errors.agent_id.message}
        </span>
      )}
    </div>
  );
}
