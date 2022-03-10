import React, { useEffect, useState } from "react";
import { useAsync } from "@src/utils/use-async";
import { Param, User } from "@src/types";
import { useHttp } from "@src/utils/http";
import { Input, Select, Table } from "antd";
import { SearchPanel } from "./search-panel";
import { useDebounce } from "@src/utils/hook.uitl";
import { useUser } from "./hook.util";
const SELECT_OPTIONS = [
    {
        value: 'id',
        label: 'Id',
    },
    {
        value: 'username',
        label: 'Username',
    },
    {
        value: 'email',
        label: 'Email',
    },
    {
        value: 'department',
        label: 'Department',
    }
]

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Department',
        dataIndex: 'department',
        key: 'department',
    },
];


export const UsersPage = () => {
    const [param, setParam] = useState<Param>({key: 'username', value: ''});
    const {data, isLoading} = useUser(useDebounce(param, 500));
    return <div className="users-page">
        <SearchPanel param={param} setParam={setParam}/>
        <Table dataSource={data || []} columns={columns} loading={isLoading}/>
    </div>
}