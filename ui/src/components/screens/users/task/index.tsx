import { Card } from "antd";
import React, { useMemo } from "react";
import { useTasks, useTaskTypes } from "./hook.util";
import { useUserIdInUrl } from "../hook.util";
import bugIcon from "@src/assets/bug.svg";
import featureIcon from "@src/assets/feature.svg";
import { CreateTask } from "./create-task";
import { TaskScreen } from "./task-screen";

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes();
  const name = useMemo(() => {
    return taskTypes?.find((taskType) => taskType.id === id)?.name;
  }, [taskTypes]);

  return <img alt="task-icon" src={name === "bug" ? bugIcon : featureIcon} />;
};

export const Task = ({ boardId }: { boardId: number }) => {
  const { data, isLoading } = useTasks(useUserIdInUrl());
  const tasks = useMemo(
    () => data?.filter((d) => d.boardId === boardId),
    [data, boardId]
  );

  return (
    <div>
      <TaskScreen tasks={tasks} />
      <CreateTask boardId={boardId} />
    </div>
  );
};
