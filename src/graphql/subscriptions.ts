import { gql } from "@apollo/client";

export const GET_TASKS_SUBSCRIPTION = gql`
  subscription GetTaskStreamingSubscription {
    task {
      id
      title
      description
      created_at
      updated_at
    }
  }
`;
