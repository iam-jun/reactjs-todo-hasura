import React from "react";
import { useSubscription } from "@apollo/client";
import { GET_TASKS_SUBSCRIPTION } from "../graphql/subscriptions";
import TaskButton from "./TaskButton";
import { ITask } from "../interfaces/Task";

const TaskList: React.FC = () => {
  const { data, loading, error } = useSubscription(GET_TASKS_SUBSCRIPTION);

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>Error loading tasks: {error.message}</p>;

  return (
    <div>
      <h1>Task List</h1>
      <TaskButton type="create" />
      <ul>
        {data.task.map((task: ITask) => (
          <li key={task.id}>
            <TaskButton type="update" task={task} />

            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <p>
              <small>
                Created at: {new Date(task.created_at).toLocaleString()}
              </small>
            </p>
            <p>
              <small>
                Updated at: {new Date(task.updated_at).toLocaleString()}
              </small>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
