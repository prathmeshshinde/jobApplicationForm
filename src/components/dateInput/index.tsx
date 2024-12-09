import { InputProps } from "@/models";
import Image from "next/image";
import React, { useRef } from "react";

const DateInput: React.FC<InputProps> = ({ item, handleInputChange, name }) => {
  const dateInputRef = useRef<HTMLInputElement>(null);

  const handleIconClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker();
    }
  };
  return (
    <>
      {item?.type === "date" && (
        <div className="relative">
          <input
            id={item.type}
            type="date"
            name={name ? name : item.type}
            ref={dateInputRef}
            onChange={handleInputChange}
            className="w-full border-2 py-[3px] px-[6px] text-base font-medium text-[#959DA5] border-[#E1E4E8] rounded-lg bg-[#F6F8FA] focus:outline-none placeholder:text-[#959DA5] placeholder:text-sm placeholder:font-normal"
          />
          <div
            onClick={handleIconClick}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            <Image src="/date.svg" alt="Short Answer" width={16} height={16} />
          </div>
        </div>
      )}
    </>
  );
};

export default DateInput;
