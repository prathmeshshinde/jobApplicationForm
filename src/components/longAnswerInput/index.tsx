import { InputProps } from "@/models";
import React from "react";

const LongAnswerInput: React.FC<InputProps> = ({ item, handleInputChange }) => {
  return (
    <>
      {item?.type === "longAns" && (
        <textarea
          id={item.type}
          name={item.type}
          onChange={handleInputChange}
          placeholder="We Would love to hear more."
          disabled={!handleInputChange && true}
          className="w-full border-2 py-[3px] px-[6px] text-base font-medium text-[#0D0D0D] border-[#E1E4E8] rounded-lg bg-[#F6F8FA] focus:outline-none placeholder:text-[#959DA5] placeholder:text-sm placeholder:font-normal min-h-24"
        />
      )}
    </>
  );
};

export default LongAnswerInput;
