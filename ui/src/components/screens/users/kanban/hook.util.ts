import { TaskType } from "./../../../../types/task-type";
import { useQuery } from "react-query";
import { useHttp } from "./../../../../utils/http";
import { useLocation } from "react-router-dom";
import { Board } from "@src/types/board";
import { Task } from "@src/types/task";

export const useUserIdInUrl = () => {
  const { pathname } = useLocation();
  const id = pathname.match(/users\/(\d+)/)?.[1];
  return Number(id);
};

export const useTaskTypes = () => {
  const client = useHttp();

  return useQuery<TaskType[]>("taskTypes", () => client("tasktypes", {}));
};

export const useBoards = (uerId: number) => {
  const client = useHttp();
  return useQuery<Board[]>([`boards/${uerId}`, uerId], () =>
    client(`boards/${uerId}`, {})
  );
};

export const useTasks = (userId: number) => {
  const client = useHttp();
  return useQuery<Task[]>([`tasks/${userId}`, userId], () =>
    client(`tasks/${userId}`, {})
  );
};
