import { useEffect } from 'react';
import { useHttp } from './../../../utils/http';
import { useAsync } from './../../../utils/use-async';

import { Param, User } from '@src/types';
import { cleanObject } from '@src/utils';

export const useUser = (param: Param) => {
    const { run, data, isSuccess, isLoading } = useAsync<User[]>();
    const client = useHttp();
    useEffect(() => {
        console.log("param::",param);
        const result = {[param.key]: param.value};
        const data = cleanObject(result);
        console.log('data:::', data)
        run(client("users",{data}));
    }, [param]);

    return {data, isLoading, isSuccess};
}