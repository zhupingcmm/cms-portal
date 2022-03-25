import { useState } from "react";
import { useEffect } from "react";
import { useHttp } from "./../../../utils/http";
import { useAsync } from "./../../../utils/use-async";

import { Param, User } from "@src/types";
import { cleanObject } from "@src/utils";

interface TableData extends User {
  key: string;
}

export const useUser = (param: Param) => {
  const { run, data, isSuccess, isLoading } = useAsync<User[]>();
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
    const result = { [param.key]: param.value };
    const data = cleanObject(result);
    run(client("users", { data }));
  }, [param]);

  return { tableData, isLoading, isSuccess };
};
