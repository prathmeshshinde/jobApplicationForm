import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { Question } from "@/models";
import { Progress } from "@radix-ui/themes";
import { toast } from "react-hot-toast";
import NumberInput from "@/components/numberInput";
import DateInput from "@/components/dateInput";
import UrlInput from "@/components/urlInput";
import LongAnswerInput from "@/components/longAnswerInput";
import ShortAnswersInput from "@/components/shortAnswerInput";

const FormSubmission = () => {
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [completenessPercentage, setCompletenessPercentage] =
    useState<number>(0);
  const router = useRouter();

  const questions: Question[] = useMemo(() => {
    return router.query.questions
      ? JSON.parse(router?.query?.questions as string)
      : [];
  }, [router.query.questions]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const totalFields = questions.length;
    const filledFields = Object.values(formValues).filter(
      (value) => value.trim() !== ""
    ).length;
    const percentage = totalFields
      ? Math.round((filledFields / totalFields) * 100)
      : 0;
    setCompletenessPercentage(percentage);
  }, [formValues, questions]);

  const { title } = router.query;

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (completenessPercentage !== 100)
      return toast.error("Please complete the form!");

    toast.success("Form submitted successfully");
    router.push("/");
  };

  return (
    <main className="flex justify-center">
      <form onSubmit={submitForm} className="w-3/5 max-sm:w-full md:w-3/6">
        <div className="min-h-dvh  flex flex-col">
          <div className="bg-white flex-grow w-full border-2 border-[#E1E4E8] flex flex-col">
            <div className="p-3 border-b border-gray-200 flex justify-between">
              <p className=" flex-1 px-2 py-1 text-base max-[375px]:w-8/12 placeholder:text-[#959DA5] border-2 border-[#fff] rounded-md font-semibold outline-none focus:border-[#959DA5] focus:border-2">
                {title ? title : "Submit form"}
              </p>
              <div className="flex-1 flex flex-col gap-2">
                <p className="text-sm font-normal text-[#0D0D0D] text-end max-[375px]:text-xs">
                  Form completeness {completenessPercentage}%
                </p>
                <Progress
                  value={completenessPercentage}
                  size="2"
                  variant="classic"
                  color="green"
                />
              </div>
            </div>
            <div className="w-full p-6 relative">
              {questions?.map((item) => (
                <div key={item.id} className="rounded-2xl mb-8">
                  <div className="flex justify-between items-center mb-2">
                    <label
                      className="text-[#0D0D0D] text-sm font-semibold"
                      htmlFor={item.type}
                    >
                      {item.question}
                    </label>
                  </div>
                  <ShortAnswersInput
                    item={item}
                    handleInputChange={handleInputChange}
                    name={`shortAnswer-${item.id}`}
                  />
                  <LongAnswerInput
                    item={item}
                    handleInputChange={handleInputChange}
                    name={`longAnswer-${item.id}`}
                  />
                  <UrlInput
                    item={item}
                    handleInputChange={handleInputChange}
                    name={`url-${item.id}`}
                  />
                  <DateInput
                    item={item}
                    handleInputChange={handleInputChange}
                    name={`date-${item.id}`}
                  />
                  <NumberInput
                    item={item}
                    handleInputChange={handleInputChange}
                    name={`number-${item.id}`}
                  />
                  {item?.type === "singleSelect" && (
                    <div className="flex flex-col gap-2">
                      {item?.options?.map((option, index) => (
                        <div
                          key={option.id}
                          className="flex gap-2 text-sm text-[#0D0D0D]"
                        >
                          <label className="w-full flex gap-2">
                            <input
                              type="radio"
                              name={`option-${item.id}`}
                              value={`option${index + 1}`}
                              onChange={handleInputChange}
                            />
                            {option.value}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-end px-6 mb-10">
              <button
                type="submit"
                className="border-2 border-[#1E874B] bg-[#00AA45] rounded-xl py-[6px] px-4 text-white text-sm font-semibold shadow-sm hover:bg-green-500 transition-all ease-in hover:border-green-600 duration-200 hover:drop-shadow-md "
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
};

export default FormSubmission;
