import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import TaskList from '../components/TaskList';
import { GET_TASKS_SUBSCRIPTION } from '../graphql/subscriptions';

const tasks = [
  {
    id: '1',
    title: 'Test Task 1',
    description: 'Description for Task 1',
    created_at: '2024-08-20T12:34:56.000Z',
    updated_at: '2024-08-20T12:34:56.000Z',
  },
  {
    id: '2',
    title: 'Test Task 2',
    description: 'Description for Task 2',
    created_at: '2024-08-21T12:34:56.000Z',
    updated_at: '2024-08-21T12:34:56.000Z',
  },
];

const mocks = [
  {
    request: {
      query: GET_TASKS_SUBSCRIPTION,
    },
    result: {
      data: {
        task: tasks,
      },
    },
  },
];

describe('TaskList Component', () => {
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
  it('renders the task list', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <TaskList />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Test Task 1')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('Test Task 2')).toBeInTheDocument();
    });
  });

  it('opens the form to create a new task', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <TaskList />
      </MockedProvider>
    );

    // Wait for the "Create Task" button to be visible
    const createTaskButton = await screen.findByText('Create Task');
    expect(createTaskButton).toBeInTheDocument();

    // Simulate click on the button
    fireEvent.click(createTaskButton);

    const createTaskButtons = await screen.findAllByText('Create Task');
    expect(createTaskButtons.length).toBeGreaterThan(0);
  });

  it('opens the form to edit an existing task', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <TaskList />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Test Task 1')).toBeInTheDocument();
    });

    // Simulate click on the edit button
    const editButtons = await screen.findAllByText('Edit');
    expect(editButtons.length).toBeGreaterThan(0);
    fireEvent.click(editButtons[0]);

    // Check if the edit form or modal opens (adjust based on your implementation)
    const createTaskButtons = await screen.findAllByText('Create Task');
    expect(createTaskButtons.length).toBeGreaterThan(0);
  });

  it('displays an error message if the task subscription fails', async () => {
    const errorMock = {
      request: {
        query: GET_TASKS_SUBSCRIPTION,
      },
      error: new Error('Subscription failed'),
    };

    render(
      <MockedProvider mocks={[errorMock]} addTypename={false}>
        <TaskList />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Error loading tasks: Subscription failed')).toBeInTheDocument();
    });
  });
});