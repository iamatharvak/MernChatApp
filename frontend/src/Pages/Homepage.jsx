import React from "react";
import { Box, Container, Text, Tabs } from "@chakra-ui/react";
import Login from "../UIComponents/Authentication/Login";
import Signup from "../UIComponents/Authentication/Signup";

const Homepage = () => {
  const items = [
    {
      title: "Login",
      content: <Login />,
    },
    {
      title: "Sign Up",
      content: <Signup />,
    },
  ];

  return (
    <Container maxW="xl" centerContent>
      <Box
        display="flex"
        justifyContent="center"
        p={3}
        bg={"white"}
        w="100%"
        m="40px 0px 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize="4xl" fontFamily="Work Sans">
          Talk-A-Tive
        </Text>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
        <Tabs.Root defaultValue="1" width="full">
          <Tabs.List mb="1rem">
            {items.map((item, index) => (
              <Tabs.Trigger key={index} value={item.title} width="50%">
                Tab {item.title}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
          <Box width="100%" color="black">
            {items.map((item, index) => (
              <Tabs.Content key={index} value={item.title}>
                {item.content}
              </Tabs.Content>
            ))}
          </Box>
        </Tabs.Root>
      </Box>
    </Container>
  );
};
export default Homepage;
