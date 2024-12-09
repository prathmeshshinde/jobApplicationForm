export interface Question {
  type: "shortAns" | "longAns" | "singleSelect" | "url" | "date" | "number";
  label: string;
  id: string;
  question?: string;
  options?: { id: number; value: string }[];
}

export interface InputProps {
  item: Question;
  handleInputChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  name?: string;
}

interface Option {
  id: number;
  value: string;
}

export interface QuestionOptionsState {
  [key: string]: Option[];
}
