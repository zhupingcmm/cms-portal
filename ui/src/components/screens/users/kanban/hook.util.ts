import {
  useAddConfig,
  useDeleteConfig,
} from "./../../../../utils/optimistic-options";
import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./../../../../utils/http";
import { Board } from "@src/types/board";
import { useUserIdInUrl } from "../hook.util";

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
