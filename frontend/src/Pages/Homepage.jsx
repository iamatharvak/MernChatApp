import React from "react";
import { Box, Container, Text, Tabs, Link } from "@chakra-ui/react";
// import { DecorativeBox } from "compositions/lib/decorative-box";

import Login from "../UIComponents/Authentication/Login";
import Signup from "../UIComponents/Authentication/Signup";

const Homepage = () => {
  return (
    <Container maxW="xl" centerContent>
      <Box
        display="flex"
        justifyContent="center"
        padding="3"
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize="4xl" fontFamily="Work sans" d="flex">
          Talk-A-Tive
        </Text>
      </Box>
      <Box
        bg="white"
        w="100%"
        padding="4"
        borderRadius="lg"
        borderWidth="1px"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Tabs.Root defaultValue="members" style={{ width: "100%" }}>
          <Tabs.List display="flex" justifyContent="center" gap="2" mb="1em">
            <Tabs.Trigger value="members" asChild>
              <Link
                unstyled
                style={{ display: "flex", justifyContent: "center", flex: 1 }}
              >
                Login
              </Link>
            </Tabs.Trigger>

            <Tabs.Trigger value="projects" asChild>
              <Link
                unstyled
                style={{ display: "flex", justifyContent: "center", flex: 1 }}
              >
                Signup
              </Link>
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="members">
            <Login />
          </Tabs.Content>

          <Tabs.Content value="projects">
            <Signup />
          </Tabs.Content>
        </Tabs.Root>
      </Box>
    </Container>
  );
};
export default Homepage;
