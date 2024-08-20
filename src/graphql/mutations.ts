
import { gql } from '@apollo/client';

export const CREATE_TASK_MUTATION = gql`
  mutation CreateTask($title: String!, $description: String!) {
    insert_task(objects: { title: $title, description: $description }) {
      returning {
        id
        title
        description
        created_at
        updated_at
      }
    }
  }
`;

export const UPDATE_TASK_MUTATION = gql`
  mutation UpdateTask($id: uuid!, $title: String!, $description: String!) {
    update_task(where: { id: { _eq: $id } }, _set: { title: $title, description: $description }) {
      returning {
        id
        title
        description
        created_at
        updated_at
      }
    }
  }
`;