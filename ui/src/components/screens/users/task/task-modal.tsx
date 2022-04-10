import { Form, Input, Modal, Popover } from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { useEffect } from "react";
import { useEditTask, useTaskModal, useTaskQueryKey } from "./hook.util";

export const TaskModal = () => {
  const { editingTask, editingTaskId, close } = useTaskModal();
  const { mutateAsync, isLoading } = useEditTask(useTaskQueryKey());
  const [form] = useForm();

  const onCancel = () => {
    close();
    form.resetFields();
  };

  const onOk = async () => {
    await mutateAsync({ ...editingTask, ...form.getFieldsValue() });
    close();
  };

  useEffect(() => {
    form.setFieldsValue(editingTask);
  }, [form, editingTask]);

  console.log;

  return (
    <Modal
      forceRender={true}
      onCancel={onCancel}
      onOk={onOk}
      okText={"确认"}
      cancelText={"取消"}
      confirmLoading={isLoading}
      title={"编辑任务"}
      visible={!!editingTaskId}
    >
      <Form initialValues={editingTask} form={form}>
        <Form.Item name={"id"} label="ID">
          <Input />
        </Form.Item>
        <Form.Item
          name={"name"}
          label="用户名"
          rules={[{ required: true, message: "请输入用户名" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"userId"}
          label="用户ID"
          rules={[{ required: true, message: "请输入用户ID" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"note"}
          label="描述"
          rules={[{ required: true, message: "请输入描述" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"typeId"}
          label="任务类型"
          rules={[{ required: true, message: "请输入任务类型" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
