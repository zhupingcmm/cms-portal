import { useCallback } from "react";
import { useUrlQueryParam } from "@src/utils/url";
import { useEditConfig } from "./../../../../utils/optimistic-options";
import { useMutation } from "react-query";
import { useQuery } from "react-query";
import { QueryKey } from "react-query";
import { Task } from "@src/types/task";
import { useHttp } from "./../../../../utils/http";
import { TaskType } from "@src/types/task-type";
import { useAddConfig } from "@src/utils/optimistic-options";
import { useUserIdInUrl } from "../hook.util";

export const useTaskQueryKey = () => {
  const id = useUserIdInUrl();
  return [`tasks/${id}`, id];
};

export const useTasks = (userId: number) => {
  const client = useHttp();
  return useQuery<Task[]>([`tasks/${userId}`, userId], () =>
    client(`tasks/${userId}`, {})
  );
};

export const useTask = (id: number) => {
  const client = useHttp();
  return useQuery<Task>(["task", { id }], () => client(`task/${id}`, {}), {
    enabled: !!id,
  });
};

export const useAddTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (data: Partial<Task>) => client("task", { method: "POST", data }),
    useAddConfig(queryKey)
  );
};

export const useDeleteTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) => client(`task/${id}`, { method: "DELETE" }),
    useAddConfig(queryKey)
  );
};
export const useEditTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (data: Partial<Task>) => client("task", { method: "PATCH", data }),
    useEditConfig(queryKey)
  );
};

export const useTaskModal = () => {
  const [{ editingTaskId }, setEditingTaskId] = useUrlQueryParam([
    "editingTaskId",
  ]);
  const { data: editingTask, isLoading } = useTask(Number(editingTaskId));
  const startEdit = useCallback(
    (id: number) => {
      setEditingTaskId({ editingTaskId: id });
    },
    [setEditingTaskId]
  );

  const close = useCallback(() => {
    setEditingTaskId({ editingTaskId: "" });
  }, [setEditingTaskId]);
  return {
    editingTaskId,
    editingTask,
    startEdit,
    close,
    isLoading,
  };
};

export const useTaskTypes = () => {
  const client = useHttp();

  return useQuery<TaskType[]>("taskTypes", () => client("tasktypes", {}));
};
