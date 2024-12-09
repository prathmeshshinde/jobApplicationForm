import { InputProps } from "@/models";
import React from "react";

const UrlInput: React.FC<InputProps> = ({ item, handleInputChange, name }) => {
  return (
    <>
      {item?.type === "url" && (
        <input
          id={item.type}
          type="url"
          name={name ? name : item.type}
          placeholder="URL"
          disabled={!handleInputChange && true}
          onChange={handleInputChange}
          className={`w-full border-2 py-[3px] px-[6px] text-base font-medium text-[#0D0D0D] border-[#E1E4E8] rounded-lg focus:outline-none placeholder:text-[#959DA5] placeholder:text-sm placeholder:font-normal ${
            !handleInputChange
              ? "opacity-50 cursor-not-allowed bg-[#F6F8FA]"
              : "focus:border-[#c3c5c8] hover:bg-[#F6F8FA]"
          }`}
        />
      )}
    </>
  );
};

export default UrlInput;
