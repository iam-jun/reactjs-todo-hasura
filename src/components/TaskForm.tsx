import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Input, Spin, notification } from 'antd';
import { useMutation } from '@apollo/client';
import { CREATE_TASK_MUTATION, UPDATE_TASK_MUTATION } from '../graphql/mutations';
import { Task } from '../types';

interface TaskFormProps {
  open: boolean;
  onClose: () => void;
  task?: Omit<Task, 'created_at' | 'updated_at'> | null;
}

const LoadingIndicator: React.FC = () => (
  <div>
    <Spin tip="Saving..." />
  </div>
);

const TaskForm: React.FC<TaskFormProps> = ({ open, onClose, task }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);

  const [createTask] = useMutation(CREATE_TASK_MUTATION);
  const [updateTask] = useMutation(UPDATE_TASK_MUTATION);

  useEffect(() => {
    if (task) {
      form.setFieldsValue({
        title: task.title,
        description: task.description,
      });
    } else {
      form.resetFields();
    }
  }, [task, form]);

  const handleSave = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();

      if (task) {
        // Update existing task
        await updateTask({
          variables: {
            id: task.id,
            title: values.title,
            description: values.description,
          },
        });
        notification.success({ message: 'Task updated successfully!' });
      } else {
        // Create new task
        await createTask({
          variables: {
            title: values.title,
            description: values.description,
          },
        });
        notification.success({ message: 'Task created successfully!' });
      }
      onClose();
    } catch (err: any) {
      notification.error({ message: `Error: ${err.message}` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      title={task ? 'Edit Task' : 'Create Task'}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={handleSave}>
          Save
        </Button>,
      ]}
    >
      {loading ? (
        <LoadingIndicator />
      ) : (
        <Form form={form} layout="vertical" name="task_form">
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please enter the task title' }]}
          >
            <Input placeholder="Enter task title" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter the task description' }]}
          >
            <Input.TextArea rows={4} placeholder="Enter task description" />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};

export default TaskForm;