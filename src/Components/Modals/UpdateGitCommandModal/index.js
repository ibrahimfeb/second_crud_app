import {
  Flex,
  Stack,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  SimpleGrid,
} from "@chakra-ui/react";
import { React, useState } from "react";
import { EditIcon } from "@chakra-ui/icons";
import { useMutation } from "@apollo/client";
import { GET_GIT_COMMANDS } from "../../../GraphQL/Queries";
import { UPDATE_GIT_COMMAND } from "../../../GraphQL/Mutations";

const UpdateGitCommandModal = (props) => {
  const [gitId, setGitId] = useState(props.id);
  const [gitCommand, setGitCommand] = useState(props.command);
  const [gitDescription, setGitDescription] = useState(props.description);
  const toast = useToast();

  const {
    isOpen: isUpdateOpen,
    onOpen: onUpdateOpen,
    onClose: onUpdateClose,
  } = useDisclosure();

  const [updateGitCommand, { loading, error, reset }] =
    useMutation(UPDATE_GIT_COMMAND);

  const onUpdateHandler = (e) => {
    e.preventDefault();
    updateGitCommand({
      variables: {
        id: gitId,
        command: gitCommand,
        description: gitDescription,
      },
      onCompleted(res) {
        console.log(res);
        toast({
          title: "Record Updated",
          description: "Record Uppdated Succefully",
          status: "success",
          duration: "9000",
          isClosable: true,
        });
      },
      refetchQueries: [{ query: GET_GIT_COMMANDS }],
    });
    if (loading) {
      console.log("Submitting");
    } else if (error) {
      toast({
        title: `${error.message}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      reset();
      onUpdateClose();
      toast({
        title: `${props.command} Updated`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  return (
    <>
      <Button
        onClick={onUpdateOpen}
        // bg="#294652"
        // color="white"
        size="md"
        p={1}
        w="fit-content"
        variant={"ghost"}
      >
        <EditIcon />
      </Button>

      <Modal isOpen={isUpdateOpen} onClose={onUpdateClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Git Command</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid width="full" columns={1} columnGap={3} rowGap={6}>
              <Stack>
                <form onSubmit={onUpdateHandler}>
                  <FormControl>
                    <FormLabel>Command</FormLabel>
                    <Input
                      value={gitCommand}
                      onChange={(e) => setGitCommand(e.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Description</FormLabel>
                    <Input
                      value={gitDescription}
                      onChange={(e) => setGitDescription(e.target.value)}
                    />
                  </FormControl>
                  <Flex mt={3} ml="auto">
                    <Button
                      mr={2}
                      colorScheme="blue"
                      isLoading={loading}
                      type="submit"
                    >
                      Update
                    </Button>
                    <Button variant="ghost" onClick={onUpdateClose}>
                      Cancel
                    </Button>
                  </Flex>
                </form>
              </Stack>
            </SimpleGrid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateGitCommandModal;
