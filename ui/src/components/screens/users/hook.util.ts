import { useMemo } from "react";
import { useHttp } from "./../../../utils/http";

import { Param, User } from "@src/types";
import { cleanObject } from "@src/utils";
import { useUrlQueryParam } from "@src/utils/url";
import { useQuery, useMutation, useQueryClient, QueryKey } from "react-query";
import { useSearchParams } from "react-router-dom";

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

export const useEditUser = (queryKey: QueryKey) => {
  const client = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (params: Partial<User>) =>
      client(`user`, { data: params, method: "PATCH" }),
    {
      onSuccess: () => queryClient.invalidateQueries(queryKey),
      onMutate: (target) => {
        const previousItems = queryClient.getQueryData(queryKey);
        queryClient.setQueryData(queryKey, (old?: User[]) => {
          return (
            old?.map((o) => {
              if (o.id === target.id) {
                return { ...o, ...target };
              }
              return o;
            }) || []
          );
        });
        return { previousItems };
      },
      onError: (error, variables, context) => {
        queryClient.setQueryData(
          queryKey,
          (context as { previousItems: User[] }).previousItems
        );
      },
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

export const useUserSearchParam = () => {
  const [param, setParam] = useUrlQueryParam(["username"]);
  return [param, setParam] as const;
};

export const useUserQueryKey = () => {
  const [queryKey] = useUserSearchParam();
  return ["users", queryKey];
};
