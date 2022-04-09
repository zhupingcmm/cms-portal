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

export const useTaskTypes = () => {
  const client = useHttp();

  return useQuery<TaskType[]>("taskTypes", () => client("tasktypes", {}));
};
