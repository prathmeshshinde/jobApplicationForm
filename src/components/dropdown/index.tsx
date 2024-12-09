import React, { useEffect, useRef, useState } from "react";
import { Question } from "@/models";

interface DropdownProps {
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
  setOpenQuestionDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}

export const INPUT_TYPES = [
  {
    type: "shortAns" as const,
    label: "Short answer",
    icon: "/shortAns.svg",
    defaultLabel: "Write a question",
  },
  {
    type: "longAns" as const,
    label: "Long answer",
    icon: "/longAns.svg",
    defaultLabel: "Write a question",
  },
  {
    type: "singleSelect" as const,
    label: "Single select",
    icon: "/singleSelect.svg",
    defaultLabel: "Write a question",
  },
  {
    type: "url" as const,
    label: "URL",
    icon: "/url.svg",
    defaultLabel: "Link to your best work",
  },
  {
    type: "date" as const,
    label: "Date",
    icon: "/date.svg",
    defaultLabel: "Write a question",
  },
  {
    type: "number" as const,
    label: "Number",
    icon: "/number.svg",
    defaultLabel: "Write a question",
  },
] as const;

const Dropdown: React.FC<DropdownProps> = ({
  setQuestions,
  setOpenQuestionDropdown,
}) => {
  const [dropdownPosition, setDropdownPosition] = useState<"top" | "bottom">(
    "bottom"
  );
  const [isPositioned, setIsPositioned] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleAddQuestion = (type: Question["type"], defaultLabel: string) => {
    setQuestions((prev) => [
      ...prev,
      { type, label: defaultLabel, id: `${type}-${Date.now()}` },
    ]);
    setOpenQuestionDropdown(false);
  };

  useEffect(() => {
    const handlePosition = () => {
      if (dropdownRef.current) {
        const rect = dropdownRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const spaceBelow = windowHeight - rect.bottom;
        const dropdownHeight = 300;
        setDropdownPosition(spaceBelow < dropdownHeight ? "top" : "bottom");
        setIsPositioned(true);
      }
    };

    handlePosition();
    window.addEventListener("resize", handlePosition);

    return () => window.removeEventListener("resize", handlePosition);
  }, []);
  return (
    <div className="relative" ref={dropdownRef}>
      {isPositioned && (
        <div
          className={`absolute w-72 border-2 border-[#E1E4E8] bg-white rounded-2xl shadow transition-all duration-200 ${
            dropdownPosition === "top" ? "bottom-full mb-10" : "mt-2"
          }`}
          style={{
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <ul className="p-2">
            <li className="bg-[#FAFBFC] text-xs text-[#6A737D] font-semibold p-3 rounded-lg">
              INPUT TYPES
            </li>
            {INPUT_TYPES.map((inputType) => (
              <li
                key={inputType.type}
                onClick={() =>
                  handleAddQuestion(inputType.type, inputType.defaultLabel)
                }
                className="flex items-center gap-2 text-sm text-gray-900 p-3 font-medium 
                       hover:bg-gray-100 cursor-pointer rounded-lg transition-colors duration-200"
                role="button"
                aria-label={`Add ${inputType.label} question`}
              >
                <img
                  src={inputType?.icon}
                  alt={inputType.label}
                  width={20}
                  height={20}
                  className="shrink-0"
                />
                <span>{inputType.label}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
