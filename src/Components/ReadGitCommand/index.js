import {
  Stack,
  Text,
  Box,
  Flex,
  Heading,
  Button,
  useColorMode,
  Center,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { React, useState } from "react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { GET_GIT_COMMANDS } from "../../GraphQL/Queries";
import { useQuery } from "@apollo/client";
import Loader from "../Loader";
import InsertGitCommandModal from "../Modals/InsertGitCommandModal";
import UpdateGitCommandModal from "../Modals/UpdateGitCommandModal";
import DeleteGitCommand from "../Modals/DeleteGitCommandModal";

const ReadGitCommand = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const RenderedReadGitCommand = () => {
    const { loading, error, data } = useQuery(GET_GIT_COMMANDS);

    if (loading)
      return (
        <Text>
          <Loader />
        </Text>
      );
    if (error) return <Text>Error :(</Text>;
    return (
      <Stack>
        <Center>
          <Heading size={"sm"}>Important Git Commands</Heading>
        </Center>
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th>Git Command</Th>
                <Th>Description</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data
                ? data.git_commands.map(({ id, command, description }) => (
                    <Tr>
                      <Td>{command}</Td>
                      <Td>{description}</Td>
                      <Flex>
                        <Td>
                          {
                            <UpdateGitCommandModal
                              id={id}
                              command={command}
                              description={description}
                            />
                          }
                        </Td>
                        <Td>
                          {<DeleteGitCommand id={id} command={command} />}
                        </Td>
                      </Flex>
                    </Tr>
                  ))
                : ""}
            </Tbody>
          </Table>
        </TableContainer>
      </Stack>
    );
  };

  return (
    <Box w="90%" m="auto" maxW="1200">
      <Flex
        w="full"
        my={5}
        alignItems="center"
        justifyContent="flex-start"
        as="header"
      >
        <Heading mr="auto" size={{ base: "sm", md: "md" }}>
          Git Commands
        </Heading>
        <Button
          size={{ base: "xs", md: "md" }}
          mr={2}
          onClick={toggleColorMode}
          variant={"outline"}
        >
          {colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
        </Button>
        <InsertGitCommandModal />
      </Flex>
      {<RenderedReadGitCommand />}
    </Box>
  );
};

export default ReadGitCommand;
