export default function AgentDetails({ agent }) {
  return (
    <div className="mb-0 mt-auto rounded-[8px] border border-[#DBDBDB]  h-[174px] flex flex-col gap-[10px] p-[20px]">
      <div className="flex h-[74px] items-center gap-[10px]">
        <div className="w-[72px] h-[72px] rounded-[100px] overflow-hidden">
          <img src={agent?.avatar} alt="agent" />
        </div>
        <div>
          <p className="text-[#021526]">
            {agent?.name} {agent?.surname}
          </p>
          <span className="text-[#676E76] text-[14px]">აგენტი</span>
        </div>
      </div>

      <div className="space-y-[4px]">
        <div className="flex gap-[6px]">
          <img src="/images/emailIcon.svg" alt="email" />
          <p className="text-[14px]">{agent?.email}</p>
        </div>

        <div className="flex gap-[6px]">
          <img src="/images/telephoneIcon.svg" alt="phone" />
          <p className="text-[14px]">{agent?.phone}</p>
        </div>
      </div>
    </div>
  );
}
