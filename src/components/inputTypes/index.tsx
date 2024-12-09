import { Question } from "@/models";
import React from "react";
import QuestionCard from "../questionCard";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  TouchSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

interface InputTypeProps {
  questions: Question[];
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
  setEmptyFields: React.Dispatch<React.SetStateAction<Record<number, boolean>>>;
  emptyFields: Record<number, boolean>;
}

const InputTypes: React.FC<InputTypeProps> = ({
  questions,
  setQuestions,
  setEmptyFields,
  emptyFields,
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id === over?.id) return;
    if (active.id !== over?.id) {
      setQuestions((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };
  return (
    <div className="w-full px-6 relative">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={questions}
          strategy={verticalListSortingStrategy}
        >
          {questions?.map((item, index) => (
            <QuestionCard
              item={item}
              index={index}
              setEmptyFields={setEmptyFields}
              emptyFields={emptyFields}
              setQuestions={setQuestions}
              id={item.id}
              key={item.id}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default InputTypes;
