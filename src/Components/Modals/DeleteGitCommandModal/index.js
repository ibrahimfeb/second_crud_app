import {
  Box,
  Button,
  useToast,
  useDisclosure,
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { React, useRef } from "react";
import { useMutation } from "@apollo/client";
import { DeleteIcon } from "@chakra-ui/icons";
import { GET_GIT_COMMANDS } from "../../../GraphQL/Queries";
import { DELETE_GIT_COMMAND } from "../../../GraphQL/Mutations";

const DeleteGitCommand = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteCommand] = useMutation(DELETE_GIT_COMMAND);
  const toast = useToast();

  const cancelRef = useRef(null);

  const onDeleteHandler = () => {
    deleteCommand({
      variables: {
        id: props.id,
      },
      refetchQueries: [{ query: GET_GIT_COMMANDS }],
    });

    onClose();
    toast({
      title: `${props.command} Deleted.`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <>
      <Button
        // colorScheme="red"
        onClick={onOpen}
        size="md"
        p={1}
        mb={0.5}
        w="fit-content"
        variant={'ghost'}
      >
        <DeleteIcon />
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Command
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure? You want to Delete {" "}
              <Box
                textTransform="capitalize"
                display="inline"
                fontWeight="bolder"
              >
                {props.command}
              </Box>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onDeleteHandler} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteGitCommand;
