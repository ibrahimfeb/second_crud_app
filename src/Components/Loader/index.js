import { Stack, Spinner, Flex } from "@chakra-ui/react";

const Loader = () => {
  return (
    <Flex justify="center" align="center" minH="90vh" w="100%">
      <Stack spacing={4} p={8} borderRadius="lg">
        <Spinner size="xl" />
      </Stack>
    </Flex>
  );
};

export default Loader;
