import React, { useState } from 'react';
import { Button } from 'antd';
import TaskForm from './TaskForm';
import { useSubscription } from '@apollo/client';
import { GET_TASKS_SUBSCRIPTION } from '../graphql/subscriptions';

interface Task {
  id: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
}

const TaskList: React.FC = () => {
  const { data, loading, error } = useSubscription<{ task: Task[] }>(GET_TASKS_SUBSCRIPTION);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleCreate = () => {
    setSelectedTask(null);
    setIsFormVisible(true);
  };

  const handleEdit = (task: Task) => {
    setSelectedTask(task);
    setIsFormVisible(true);
  };

  const handleCloseForm = () => {
    setIsFormVisible(false);
  };

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>Error loading tasks: {error.message}</p>;

  return (
    <div className="container wrapper">
      <div className="nav">
        <h1>Task List</h1>
        <Button type="primary" onClick={handleCreate}>
          Create Task
        </Button>
      </div>
      <ul className="body">
        {data?.task.map((task) => (
          <li key={task.id} className="task-item">
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <p>
              <small>Created at: {new Date(task.created_at).toLocaleString()}</small>
            </p>
            <p>
              <small>Updated at: {new Date(task.updated_at).toLocaleString()}</small>
            </p>
            <Button onClick={() => handleEdit(task)}>Edit</Button>
          </li>
        ))}
      </ul>
      <TaskForm open={isFormVisible} onClose={handleCloseForm} task={selectedTask} />
    </div>
  );
};

export default TaskList;
