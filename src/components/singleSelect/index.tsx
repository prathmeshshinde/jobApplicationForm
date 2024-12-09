import { Question } from "@/models";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface SingleSelectProps {
  data: Question;
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
}
const SingleSelect: React.FC<SingleSelectProps> = ({ data, setQuestions }) => {
  const [questionOptions, setQuestionOptions] = useState<{
    [key: string]: string[];
  }>({});

  const handleAddOption = (
    questionType: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setQuestionOptions((prev: any) => {
      const currentOptions = prev[questionType] || [];
      const newOptionId =
        currentOptions.length > 0
          ? Math.max(...currentOptions?.map((opt: any) => opt?.id)) + 1
          : 1;

      return {
        ...prev,
        [questionType]: [...currentOptions, { id: newOptionId, value: "" }],
      };
    });
  };

  const ensureInitialOption = (questionType: string) => {
    setQuestionOptions((prev: any) => {
      if (!prev[questionType] || prev[questionType].length === 0) {
        return {
          ...prev,
          [questionType]: [{ id: 1, value: "" }],
        };
      }
      return prev;
    });
  };

  const handleOptionChange = (
    questionType: string,
    optionId: number,
    newValue: string,
    index: number
  ) => {
    setQuestionOptions((prev) => {
      const currentOptions = prev[questionType] || [];
      return {
        ...prev,
        [questionType]: currentOptions.map((opt: any) =>
          opt.id === optionId ? { ...opt, value: newValue } : opt
        ),
      };
    });
    const updatedOptions = questionOptions.singleSelect.map((opt: any) =>
      opt.id === optionId ? { ...opt, value: newValue } : opt
    );
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === data.id
          ? { ...question, options: updatedOptions }
          : { ...question, options: [{ id: 1, value: "hel" }] }
      )
    );
  };

  useEffect(() => {
    ensureInitialOption(data?.type);
  }, []);

  // if (data?.type !== "singleSelect") return <></>;

  return (
    <div>
      <div className="mt-2">
        <div className="flex flex-col gap-2">
          {questionOptions[data.type]?.map((option: any, index) => (
            <div key={option.id} className="flex gap-2">
              <label className="w-full flex gap-2">
                <input
                  type="radio"
                  name={`option-${data.id}`}
                  value={`option${index + 1}`}
                />
                <input
                  type="text"
                  placeholder={`Option ${index + 1}`}
                  value={option.value}
                  onChange={(e) =>
                    handleOptionChange(
                      data.type,
                      option.id,
                      e.target.value,
                      index
                    )
                  }
                  className="w-full border-2 py-[3px] px-[6px] text-base font-medium text-[#0D0D0D] placeholder:text-[#959DA5] placeholder:text-sm placeholder:font-normal border-[#E1E4E8] rounded-lg focus:outline-none bg-[#F6F8FA] group-hover:bg-[#FAFBFC] transition-all duration-300 "
                />
              </label>
              {index === questionOptions[data.type].length - 1 && (
                <button onClick={(e) => handleAddOption(data.type, e)}>
                  <Image src="/plus.svg" alt="plus" width={14} height={14} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleSelect;
