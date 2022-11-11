import { gql } from "@apollo/client";

export const GET_GIT_COMMANDS = gql`
  query get_git_commands {
    git_commands(distinct_on: id) {
      id
      command
      description
    }
  }
`;
