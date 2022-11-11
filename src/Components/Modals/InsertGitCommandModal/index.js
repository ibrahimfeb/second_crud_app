import {
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  Flex,
  SimpleGrid,
  Input,
  useToast,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { React, useState } from "react";
import { useForm } from "react-hook-form";

import { INSERT_GIT_COMMAND } from "../../../GraphQL/Mutations";
import { GET_GIT_COMMANDS } from "../../../GraphQL/Queries";
import { useMutation, useQuery } from "@apollo/client";

const InsertGitCommandModal = () => {
  const [gitCommand, setGitCommand] = useState("");
  const [gitDescription, setGitDescription] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { loading, error, data, refetch } = useQuery(GET_GIT_COMMANDS);
  const toast = useToast();

  // Insert
  const [addGit, { loading: insertLoading }] = useMutation(INSERT_GIT_COMMAND, {
    variables: {
      command: gitCommand,
      description: gitDescription,
    },
    onCompleted(res) {
      console.log(res);
      toast({
        title: "Record Added",
        description: "Record Added Succefully.",
        status: "success",
        duration: 9000,
        inClosable: true,
      });
      refetch();
      setGitCommand("");
      setGitDescription("");
    },

    onError(error) {
      console.log(error);
      toast({
        title: "Something Went Wrong.",
        description: "Fail to add.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    },
  });

  // for checking purpose
  const addNewData = () => {
    console.log({ gitCommand });
    console.log({ gitDescription });
    addGit();
  };

  return (
    <>
      <Button
        onClick={onOpen}
        size={{ base: "xs", md: "md" }}
        p={1}
        w="fit-content"
        variant={"outline"}
      >
        Add New Command
      </Button>

      {/* Insert Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Command</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid width="full" columns={1} columnGap={3} rowGap={6}>
              <Flex justifyContent={"center"} mt={"20px"} alignItems={"center"}>
                <FormControl w={"300px"}>
                  {/* Fields */}
                  <FormLabel>
                    Command
                    <Input
                      value={gitCommand}
                      onChange={(e) => setGitCommand(e.target.value)}
                    />
                  </FormLabel>
                  <FormLabel>
                    Description
                    <Input
                      value={gitDescription}
                      onChange={(e) => setGitDescription(e.target.value)}
                    />
                  </FormLabel>
                  {/* End Fields */}

                  <Flex mt={3} ml="auto">
                    <Button
                      onClick={addNewData}
                      bg={"blue.300"}
                      color={"white"}
                      insertLoading={loading}
                    >
                      Submit
                    </Button>
                    <Button variant="ghost" onClick={onClose}>
                      Cancel
                    </Button>
                  </Flex>
                </FormControl>
              </Flex>
            </SimpleGrid>
          </ModalBody>
        </ModalContent>
      </Modal>
      {/* End Insert Modal */}
    </>
  );
};

export default InsertGitCommandModal;
