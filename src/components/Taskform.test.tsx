import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import userEvent from '@testing-library/user-event';
import TaskForm from '../components/TaskForm';
import { CREATE_TASK_MUTATION, UPDATE_TASK_MUTATION } from '../graphql/mutations';

const mockClose = jest.fn();

describe('TaskForm Component', () => {
  beforeAll(() => {
    window.matchMedia =
      window.matchMedia ||
      function () {
        return {
          matches: false,
          addListener: jest.fn(), // Deprecated method
          removeListener: jest.fn(), // Deprecated method
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        };
      };
  });
  it('renders the task creation form', () => {
    render(
      <MockedProvider>
        <TaskForm open={true} onClose={mockClose} />
      </MockedProvider>
    );

    expect(screen.getByText('Create Task')).toBeInTheDocument();
    expect(screen.getByLabelText('Title')).toBeInTheDocument();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
  });

  it('submits the form for creating a new task', async () => {
    const mockCreateTask = {
      request: {
        query: CREATE_TASK_MUTATION,
        variables: { title: 'New Task', description: 'New Task Description' },
      },
      result: {
        data: { insert_task: { returning: [{ id: '1', title: 'New Task', description: 'New Task Description' }] } },
      },
    };

    render(
      <MockedProvider mocks={[mockCreateTask]} addTypename={false}>
        <TaskForm open={true} onClose={mockClose} />
      </MockedProvider>
    );

    userEvent.type(screen.getByLabelText('Title'), 'New Task');
    userEvent.type(screen.getByLabelText('Description'), 'New Task Description');

    userEvent.click(screen.getByText('Save'));

    await waitFor(() => {
      expect(mockClose).toHaveBeenCalled();
    });
  });

  it('renders the task editing form', () => {
    const task = { id: '1', title: 'Existing Task', description: 'Existing Task Description' };

    render(
      <MockedProvider>
        <TaskForm open={true} onClose={mockClose} task={task} />
      </MockedProvider>
    );

    expect(screen.getByText('Edit Task')).toBeInTheDocument();
    expect(screen.getByLabelText('Title')).toHaveValue('Existing Task');
    expect(screen.getByLabelText('Description')).toHaveValue('Existing Task Description');
  });

  it('submits the form for updating an existing task', async () => {
    const task = { id: '1', title: 'Existing Task', description: 'Existing Task Description' };

    const mockUpdateTask = {
      request: {
        query: UPDATE_TASK_MUTATION,
        variables: { id: '1', title: 'Updated Task', description: 'Updated Task Description' },
      },
      result: {
        data: { update_task_by_pk: { id: '1', title: 'Updated Task', description: 'Updated Task Description' } },
      },
    };

    render(
      <MockedProvider mocks={[mockUpdateTask]} addTypename={false}>
        <TaskForm open={true} onClose={mockClose} task={task} />
      </MockedProvider>
    );

    userEvent.clear(screen.getByLabelText('Title'));
    userEvent.type(screen.getByLabelText('Title'), 'Updated Task');
    userEvent.clear(screen.getByLabelText('Description'));
    userEvent.type(screen.getByLabelText('Description'), 'Updated Task Description');

    userEvent.click(screen.getByText('Save'));

    await waitFor(() => {
      expect(mockClose).toHaveBeenCalled();
    });
  });

  it('displays an error message if the creation fails', async () => {
    const mockCreateTask = {
      request: {
        query: CREATE_TASK_MUTATION,
        variables: { title: 'New Task', description: 'New Task Description' },
      },
      error: new Error('Task creation failed'),
    };

    render(
      <MockedProvider mocks={[mockCreateTask]} addTypename={false}>
        <TaskForm open={true} onClose={mockClose} />
      </MockedProvider>
    );

    userEvent.type(screen.getByLabelText('Title'), 'New Task');
    userEvent.type(screen.getByLabelText('Description'), 'New Task Description');

    userEvent.click(screen.getByText('Save'));

    await waitFor(() => {
      expect(screen.getByText('Error: Task creation failed')).toBeInTheDocument();
    });
  });
});
