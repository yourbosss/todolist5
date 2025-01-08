import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { reorderTasks } from "../store/slices/tasksSlice";
import Task from "./Task";
import TaskInput from "./TaskInput";
import NoTask from "./NoTask";
import { useDrag, useDrop } from "react-dnd";
import { RootState } from "../store/store";

interface Task {
  id: number;
  title: string;
  about: string;
  isPinned: boolean;
}

const TodoList: React.FC = () => {
  const tasks = useSelector((state: RootState) =>
    [...state.tasks].sort((a, b) => Number(b.isPinned) - Number(a.isPinned))
  );

  const dispatch = useDispatch();

  const handleDragEnd = (
    sourceIndex: number,
    destinationIndex: number
  ): void => {
    if (destinationIndex === -1) return;

    dispatch(
      reorderTasks({
        sourceIndex,
        destinationIndex,
      })
    );
  };

  return (
    <div>
      <TaskInput />
      {tasks.length === 0 ? <NoTask /> : null}
      <div className="todo_container">
        {tasks.map((task, index) => (
          <DraggableTask
            key={task.id}
            task={task}
            index={index}
            handleDragEnd={handleDragEnd}
          />
        ))}
      </div>
    </div>
  );
};

interface DraggableTaskProps {
  task: Task;
  index: number;
  handleDragEnd: (sourceIndex: number, destinationIndex: number) => void;
}

const DraggableTask: React.FC<DraggableTaskProps> = ({
  task,
  index,
  handleDragEnd,
}) => {
  const [, drag] = useDrag(() => ({
    type: "TASK",
    item: { id: task.id, index },
  }));

  const [, drop] = useDrop(() => ({
    accept: "TASK",
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        handleDragEnd(item.index, index);
      }
    },
  }));

  return (
    <div ref={(node) => drag(drop(node))}>
      <Task title={task.title} about={task.about} id={task.id} />
    </div>
  );
};

export default TodoList;
