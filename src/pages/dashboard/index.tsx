import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Dropdown from "@/components/dropdown";
import InputTypes from "@/components/inputTypes";
import { Question } from "@/models";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { handleToast } from "@/utils";

const NewForm = () => {
  const [title, setTitle] = useState<string>("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [openQuestionsDropdown, setOpenQuestionDropdown] =
    useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [emptyFields, setEmptyFields] = useState<Record<string, boolean>>({});
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenQuestionDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (title === "" || title.trim() === "")
      return toast.error("Please add the title for form!");

    const errors: Record<number, boolean> = {};
    let hasErrors = false;
    let optionErrors = false;
    questions.forEach((question, index) => {
      if (!question.question || question.question.trim() === "") {
        errors[index] = true;
        hasErrors = true;
      }
      if (question.type === "singleSelect") {
        if (
          !question.options ||
          question.options.length <= 1 ||
          question.options.some(
            (option) => !option?.value || option.value.trim() === ""
          )
        ) {
          errors[index] = true;
          hasErrors = true;
          optionErrors = true;
        }
      }
    });

    if (hasErrors) {
      setEmptyFields(errors);
      if (optionErrors) {
        handleToast(
          "Hey, Don't you like multiple options with right choices!",
          "error"
        );
      } else {
        handleToast("Please enter valid question!", "error");
      }
    } else {
      handleToast("Form submitted successfully", "success");
      setTimeout(() => {
        router.push({
          pathname: "/formSubmission",
          query: { questions: JSON.stringify(questions), title: title },
        });
      }, 2500);
    }
  };

  return (
    <form onSubmit={submitForm} className="w-3/5 max-sm:w-full md:w-3/6">
      <div className="min-h-dvh  flex flex-col">
        <div className="bg-white flex-grow w-full border-2 border-[#E1E4E8] flex flex-col">
          <div className="p-6 border-b border-gray-200 flex justify-between">
            <input
              placeholder="Untitled form"
              className="px-2 py-1 text-base max-[320px]:w-6/12 max-[375px]:w-8/12 placeholder:text-[#959DA5] border-2 border-[#fff] rounded-md font-semibold outline-none focus:border-[#959DA5] focus:border-2"
              onChange={(e) => setTitle(e.target.value)}
            />
            <button
              className={`flex items-center gap-[6px] text-[#0D0D0D] font-semibold text-sm border-2 border-[#E1E4E8] pl-3 pr-4 py-[6px] rounded-xl ${
                questions.length === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              type="button"
            >
              Preview
              <Image src="/arrow.svg" alt="arrow" width={10} height={10} />
            </button>
          </div>
          <div className="relative">
            {questions.length !== 0 && (
              <InputTypes
                questions={questions}
                setQuestions={setQuestions}
                emptyFields={emptyFields}
                setEmptyFields={setEmptyFields}
              />
            )}
          </div>

          <div
            className={`flex justify-center ${
              questions.length === 0 ? "p-6" : "pb-6 px-6"
            }`}
          >
            <div
              className="inline-flex flex-col items-center"
              ref={dropdownRef}
            >
              <button
                onClick={() => setOpenQuestionDropdown(!openQuestionsDropdown)}
                type="button"
                className="w-36 text-center py-[6px] flex items-center gap-1 border-2 border-[#E1E4E8] rounded-xl pl-[14px] pr-4 font-semibold text-[14px] bg-white hover:drop-shadow-md transition-all ease-out duration-200 "
              >
                <Image src="/plus.svg" alt="plus" width={12} height={12} />
                Add Question
              </button>
              {openQuestionsDropdown && (
                <Dropdown
                  setQuestions={setQuestions}
                  setOpenQuestionDropdown={setOpenQuestionDropdown}
                />
              )}
            </div>
          </div>
          <div className="p-4 border-t border-gray-200 bg-[#F6F8FAE5] flex justify-between items-end mt-auto">
            <button
              type="button"
              className={`flex gap-1 py-[6px] pl-3 pr-4 justify-center items-center border-2 border-[#E1E4E8] rounded-xl text-[#0D0D0D] font-semibold text-[14px] bg-white hover:drop-shadow-md transition-all ease-in duration-200 ${
                questions.length === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <Image src="/draft.svg" alt="draft" width={16} height={16} /> Save
              as Draft
            </button>
            <button
              className={`flex gap-1 py-[6px] pl-3 pr-4 justify-center items-center border-2 border-[#1E874B] rounded-xl text-white font-semibold text-[14px] bg-[#00AA45] hover:bg-green-500 transition-all ease-in hover:border-green-600 duration-200 hover:drop-shadow-md ${
                questions.length === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              type="submit"
              disabled={questions.length === 0 && true}
            >
              <Image src="/check.svg" alt="publish" width={16} height={16} />
              Publish form
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default NewForm;
