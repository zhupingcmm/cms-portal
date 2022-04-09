import { Card, Input } from "antd";
import React, { useState } from "react";
import { useAddTask, useTaskQueryKey } from "./hook.util";
import { useUserIdInUrl } from "../hook.util";

export const CreateTask = ({ boardId }: { boardId: number }) => {
  const [addMode, setAddMode] = useState(false);
  const [name, setName] = useState("");
  const { mutateAsync: addTask } = useAddTask(useTaskQueryKey());
  const userId = useUserIdInUrl();

  const toggle = () => setAddMode((mode) => !mode);

  const submit = async () => {
    await addTask({ name, userId, boardId, typeId: 1 });
    setName("");
  };

  if (!addMode) {
    return <div onClick={toggle}>+创建任务</div>;
  }

  return (
    <Card>
      <Input
        value={name}
        autoFocus={true}
        onPressEnter={submit}
        onChange={(e) => setName(e.target.value)}
      />
    </Card>
  );
};
