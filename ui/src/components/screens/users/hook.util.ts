import { useMemo } from "react";
import { useHttp } from "./../../../utils/http";

import { Param, User } from "@src/types";
import { cleanObject } from "@src/utils";
import { useUrlQueryParam } from "@src/utils/url";
import { useQuery, useMutation, QueryKey, useQueryClient } from "react-query";

interface TableData extends User {
  key: number;
}

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
export const useUsers = (param: Param) => {
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

export const useAddUser = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (params: Partial<User>) => client("user", { data: params, method: "POST" }),
    {
      onSuccess: () => queryClient.invalidateQueries("users"),
    }
  );
};

export const useEditUser = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (params: Partial<User>) =>
      client(`user`, { data: params, method: "PATCH" }),
    {
      onSuccess: () => queryClient.invalidateQueries("users"),
    }
  );
};

export const useDeleteUser = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (id: number) => client(`user/${id}`, { method: "DELETE" }),
    {
      onSuccess: () => queryClient.invalidateQueries("users"),
    }
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
