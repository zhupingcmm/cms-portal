import { useLocation } from "react-router-dom";
import {
  useAddConfig,
  useDeleteConfig,
} from "./../../../utils/optimistic-options";
import { useMemo } from "react";
import { useHttp } from "./../../../utils/http";

import { Param, User } from "@src/types";
import { cleanObject } from "@src/utils";
import { useUrlQueryParam } from "@src/utils/url";
import { useQuery, useMutation, useQueryClient, QueryKey } from "react-query";
import { useEditConfig } from "@src/utils/optimistic-options";

export const useTableData = (data: User[]) => {
  return useMemo(() => {
    return data?.map((d) => {
      return {
        ...d,
        key: d.id,
      };
    });
  }, [data]);
};
export const useUsers = (param: Partial<Param>) => {
  const client = useHttp();
  const { isLoading, isSuccess, data, ...otherProps } = useQuery<User[]>(
    ["users", param],
    () => client("users", { data: cleanObject({ ...param }) })
  );
  const tableData = useTableData(data || []);
  return { tableData, isLoading, isSuccess, ...otherProps };
};

export const useUser = (id: string) => {
  const client = useHttp();
  return useQuery<User>([`user/${id}`, id], () => client(`user/${id}`, {}), {
    enabled: !!id,
  });
};

export const useAddUser = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<User>) => client("user", { data: params, method: "POST" }),
    useAddConfig(queryKey)
  );
};

export const useEditUser = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<User>) =>
      client(`user`, { data: params, method: "PATCH" }),
    useEditConfig(queryKey)
  );
};

export const useDeleteUser = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) => client(`user/${id}`, { method: "DELETE" }),
    useDeleteConfig(queryKey)
  );
};

export const useUserModel = () => {
  const [{ userCreate }, setUserCreate] = useUrlQueryParam(["userCreate"]);
  const [{ userEditId }, setUserEditId] = useUrlQueryParam(["userEditId"]);
  const { data: editUser, isLoading } = useUser(userEditId);

  const open = () => setUserCreate({ userCreate: true });
  const close = () => {
    if (userCreate) setUserCreate({ userCreate: false });
    if (userEditId) setUserEditId({ userEditId: undefined });
  };
  const openUserModel = userCreate === "true" || userEditId !== "";
  const startEdit = (id: number) => setUserEditId({ userEditId: id });

  return {
    openUserModel,
    open,
    close,
    startEdit,
    editUser,
    isLoading,
  };
};

export const useUserSearchParam = () => {
  const [param, setParam] = useUrlQueryParam(["username"]);
  return [param, setParam] as const;
};

export const useUserQueryKey = () => {
  const [queryKey] = useUserSearchParam();
  return ["users", queryKey];
};

export const useUserIdInUrl = () => {
  const { pathname } = useLocation();
  const id = pathname.match(/users\/(\d+)/)?.[1];
  return Number(id);
};
