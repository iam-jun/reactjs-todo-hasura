import { gql } from "@apollo/client";

export const CREATE_TASK = gql`
  mutation insertTask($title: String!, $description: String!) {
    insert_task(title: $title, description: $description) {
      title
      description
    }
  }
`;
