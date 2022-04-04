import { useState } from "react";
import { useEffect } from "react";
import { useHttp } from "./../../../utils/http";
import { useAsync } from "./../../../utils/use-async";

import { Param, User } from "@src/types";
import { cleanObject } from "@src/utils";

interface TableData extends User {
  key: number;
}

export const useUser = (param: Param) => {
  const { run, data, isSuccess, isLoading, ...otherProps } = useAsync<User[]>();
  const [tableData, setTableData] = useState<TableData[]>([]);
  const client = useHttp();

  useEffect(() => {
    const result = data?.map((d) => {
      return {
        ...d,
        key: d.id,
      };
    });

    setTableData(result || []);
  }, [data]);

  useEffect(() => {
    const data = cleanObject({ ...param });
    const fetchUsers = () => client("users", { data });
    run(fetchUsers(), { retry: fetchUsers });
  }, [param]);

  return { tableData, isLoading, isSuccess, ...otherProps };
};

export const useAddUser = (user: User) => {
  const { run, isLoading, ...others } = useAsync<User>();
  const client = useHttp();

  useEffect(() => {}, []);
};
