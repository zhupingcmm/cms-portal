import {
  useAddConfig,
  useDeleteConfig,
} from "./../../../../utils/optimistic-options";
import { TaskType } from "./../../../../types/task-type";
import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./../../../../utils/http";
import { useLocation } from "react-router-dom";
import { Board } from "@src/types/board";
import { Task } from "@src/types/task";

export const useUserIdInUrl = () => {
  const { pathname } = useLocation();
  const id = pathname.match(/users\/(\d+)/)?.[1];
  return Number(id);
};

export const useBoardQueryKey = () => {
  const id = useUserIdInUrl();
  return [`boards/${id}`, id];
};

export const useBoards = (uerId: number) => {
  const client = useHttp();
  return useQuery<Board[]>([`boards/${uerId}`, uerId], () =>
    client(`boards/${uerId}`, {})
  );
};

export const useAddBoard = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (data: Partial<Board>) => client("board", { method: "POST", data }),
    useAddConfig(queryKey)
  );
};

export const useDeleteBoard = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) => client(`board/${id}`, { method: "DELETE" }),
    useDeleteConfig(queryKey)
  );
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

export const useTaskQueryKey = () => {
  const id = useUserIdInUrl();
  return [`tasks/${id}`, id];
};

export const useTaskTypes = () => {
  const client = useHttp();

  return useQuery<TaskType[]>("taskTypes", () => client("tasktypes", {}));
};
