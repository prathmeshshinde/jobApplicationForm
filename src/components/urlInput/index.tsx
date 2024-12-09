import { InputProps } from "@/models";
import React from "react";

const UrlInput: React.FC<InputProps> = ({ item, handleInputChange }) => {
  return (
    <>
      {item?.type === "url" && (
        <input
          id={item.type}
          type="url"
          name={item.type}
          placeholder="URL"
          onChange={handleInputChange}
          className="w-full border-2 py-[3px] px-[6px] text-base font-medium text-[#0D0D0D] border-[#E1E4E8] rounded-lg bg-[#F6F8FA] focus:outline-none placeholder:text-[#959DA5] placeholder:text-sm placeholder:font-normal"
        />
      )}
    </>
  );
};

export default UrlInput;
