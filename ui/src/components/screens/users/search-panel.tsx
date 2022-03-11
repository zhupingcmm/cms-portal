import { Param, User } from "@src/types";
import { Form, Input, Select } from "antd";
import React from "react";


const { Option } = Select;
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
interface SearchPanelProps {
    param: Param,
    setParam: (param: SearchPanelProps['param']) => void;
}
export const SearchPanel = ({param, setParam}: SearchPanelProps) => {

    return <Form layout="inline">
        <Form.Item>
            <Input placeholder="input string" onChange={(e) => {
                setParam({
                    ...param,
                    value: e.target.value
                })
            }}/>
        </Form.Item>
        <Form.Item>
        <Select defaultValue={'username'} style={{width: 120}} onChange={(val) => {
            setParam({
                ...param,
                key: val
            })
        }}>
                {
                    SELECT_OPTIONS.map(o => <Option value={o.value} key={o.value}>{o.label}</Option>)
                }
            </Select>
        </Form.Item>

    </Form>

}