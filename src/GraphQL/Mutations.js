import { gql } from "@apollo/client";

export const INSERT_GIT_COMMAND = gql`
  mutation insert_git_command($command: String!, $description: String!) {
    insert_git_commands_one(
      object: { command: $command, description: $description }
    ) {
      id
    }
  }
`;

export const UPDATE_GIT_COMMAND = gql`
  mutation update_git_command(
    $id: Int!
    $command: String!
    $description: String!
  ) {
    update_git_commands_by_pk(
      pk_columns: { id: $id }
      _set: { id: $id, command: $command, description: $description }
    ) {
      id
    }
  }
`;

export const DELETE_GIT_COMMAND = gql`
  mutation delete_git_command($id: Int!) {
    delete_git_commands_by_pk(id: $id) {
      id
    }
  }
`;
