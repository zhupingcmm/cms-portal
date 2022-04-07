import { useQueryClient } from "react-query";
import { QueryKey } from "react-query";

export const useConfig = (
  queryKey: QueryKey,
  callback: (target: any, old?: any[]) => any[]
) => {
  const queryClient = useQueryClient();

  return {
    onSuccess: () => queryClient.invalidateQueries(queryKey),
    onMutate: (target: any) => {
      const previousItems = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, (old?: any[]) =>
        callback(target, old)
      );
      return { previousItems };
    },
    onError: (error: Error, variables: any, context: any) => {
      queryClient.setQueryData(queryKey, context.previousItems);
    },
  };
};

export const useEditConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => {
    return (
      old?.map((o) => {
        if (o.id === target.id) return { ...o, ...target };
        return o;
      }) || []
    );
  });

export const useAddConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => (old ? [...old, target] : []));

export const useDeleteConfig = (queryKey: QueryKey) =>
  useConfig(
    queryKey,
    (target, old) => old?.filter((item) => item.id !== target.id) || []
  );
