import Image from "next/image";
import React from "react";
import SingleSelect from "../singleSelect";
import { INPUT_TYPES } from "../dropdown";
import { Question } from "@/models";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ShortAnswersInput from "../shortAnswerInput";
import LongAnswerInput from "../longAnswerInput";
import UrlInput from "../urlInput";
import DateInput from "../dateInput";
import NumberInput from "../numberInput";
import { DropdownMenu } from "@radix-ui/themes";

interface QuestionCardProps {
  item: Question;
  index: number;
  setEmptyFields: React.Dispatch<React.SetStateAction<Record<number, boolean>>>;
  emptyFields: Record<string, boolean>;
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
  id: string;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  item,
  index,
  emptyFields,
  setEmptyFields,
  setQuestions,
  id,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const updateInputType = (
    index: number,
    inputType: Question["type"],
    defaultLabel: string
  ) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question, idx) =>
        idx === index
          ? { ...question, type: inputType, label: defaultLabel }
          : question
      )
    );
  };

  const handleInputBlur = (id: string, value: string) => {
    setEmptyFields((prev) => ({ ...prev, [id]: value.trim() === "" }));
  };

  return (
    <div
      style={style}
      ref={setNodeRef}
      className="border-2 border-[#E1E4E8] rounded-2xl p-3 my-4 hover:bg-[#FAFBFC] transition-all duration-300 group"
    >
      <div className="flex justify-between items-center mb-2">
        <input
          placeholder={item.label}
          className={`px-2 py-1 text-base max-[375px]:w-8/12 max-[375px]:text-sm placeholder:text-[#959DA5] border-2 border-[#fff] rounded-md font-semibold outline-none focus:border-[#959DA5] focus:border-2 group-hover:bg-[#FAFBFC] group-hover:border-[#FAFBFC] transition-all duration-300 ${
            emptyFields[item.id]
              ? "placeholder:text-[#EB5757]"
              : " placeholder:text-[#959DA5]"
          }`}
          onChange={(e) => {
            setQuestions((prevQuestions) =>
              prevQuestions.map((question, idx) =>
                idx === index
                  ? { ...question, question: e.target.value }
                  : question
              )
            );
            handleInputBlur(item.id, e.target.value);
          }}
          onBlur={(e) => handleInputBlur(item.id, e.target.value)}
        />
        <div className="flex gap-2">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <div className="flex gap-[2px] cursor-pointer">
                <Image
                  src={`/${item?.type}.svg`}
                  alt="changeType"
                  width={20}
                  height={20}
                />
                <Image
                  src="/dropdown.svg"
                  alt="dropdown"
                  width={16}
                  height={16}
                />
              </div>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content variant="soft" color="indigo">
              {INPUT_TYPES.map((inputType) => (
                <>
                  {inputType.type !== item.type && (
                    <DropdownMenu.Item>
                      <div
                        className="flex gap-2 p-2 cursor-pointer"
                        onClick={() => {
                          updateInputType(
                            index,
                            inputType?.type,
                            inputType?.defaultLabel
                          );
                        }}
                      >
                        <Image
                          src={inputType.icon}
                          alt="Short Answer"
                          width={20}
                          height={20}
                        />
                        {inputType.label}
                      </div>
                    </DropdownMenu.Item>
                  )}
                </>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Root>
          <Image
            src="/dragIcon.svg"
            alt="Short Answer"
            width={24}
            height={24}
            {...attributes}
            {...listeners}
          />
        </div>
      </div>
      <ShortAnswersInput item={item} />
      <LongAnswerInput item={item} />
      {item.type === "singleSelect" && (
        <SingleSelect data={item} setQuestions={setQuestions} />
      )}
      <UrlInput item={item} />
      <DateInput item={item} />
      <NumberInput item={item} />
    </div>
  );
};

export default QuestionCard;
