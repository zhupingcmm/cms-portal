import { Input } from "antd";
import React, { useState } from "react";
import { useAddBoard, useBoardQueryKey } from "./hook.util";
import { useUserIdInUrl } from "../hook.util";
export const CreateKanBan = () => {
  const [name, setName] = useState("");
  const { mutateAsync: addBoard } = useAddBoard(useBoardQueryKey());
  const userId = useUserIdInUrl();

  const submit = async () => {
    await addBoard({ name, type: "customer", userId });
    setName("");
  };

  return (
    <div className="kanban-colum">
      <Input
        placeholder="新建看板"
        value={name}
        onPressEnter={submit}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  );
};
