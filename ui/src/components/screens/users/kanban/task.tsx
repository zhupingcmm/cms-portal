import { Card } from "antd";
import React, { useMemo } from "react";
import { useTasks, useTaskTypes, useUserIdInUrl } from "./hook.util";
import bugIcon from "@src/assets/bug.svg";
import featureIcon from "@src/assets/feature.svg";

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
      {tasks?.map((task, index) => {
        return (
          <Card key={index}>
            <span>{task?.name}</span>
            <TaskTypeIcon id={task?.id} />
          </Card>
        );
      })}
    </div>
  );
};
