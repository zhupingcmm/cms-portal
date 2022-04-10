import { Task } from "@src/types/task";
import React, { useCallback, useMemo } from "react";
import bugIcon from "@src/assets/bug.svg";
import featureIcon from "@src/assets/feature.svg";
import {
  useDeleteTask,
  useTaskModal,
  useTaskQueryKey,
  useTaskTypes,
} from "./hook.util";
import { Button, Card, Dropdown, Menu, Modal } from "antd";

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes();
  const name = useMemo(() => {
    return taskTypes?.find((taskType) => taskType.id === id)?.name;
  }, [taskTypes]);

  return <img alt="task-icon" src={name === "bug" ? bugIcon : featureIcon} />;
};

export const TaskScreen = ({ tasks }: { tasks?: Task[] }) => {
  const { startEdit } = useTaskModal();
  return (
    <>
      {tasks?.map((task, index) => {
        return (
          <Card key={index} onClick={() => startEdit(task.id)}>
            <div>
              <span>{task?.name}</span>
              <More id={task?.id} />
            </div>

            <TaskTypeIcon id={task?.id} />
          </Card>
        );
      })}
    </>
  );
};

const More = ({ id }: { id: number }) => {
  const { mutateAsync: deleteTask } = useDeleteTask(useTaskQueryKey());
  const handleDelete = useCallback(
    (id: number) => {
      Modal.confirm({
        okText: "确认",
        title: "确认删除",
        content: "确认删除任务吗？",
        onOk: () => deleteTask(id),
        cancelText: "取消",
      });
    },
    [deleteTask]
  );

  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item onClick={() => handleDelete(id)}>删除</Menu.Item>
        </Menu>
      }
    >
      <Button type="link">...</Button>
    </Dropdown>
  );
};
